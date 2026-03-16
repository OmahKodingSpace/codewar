import { db } from '@/lib/db';
import {
  challenges,
  questions,
  languages,
  categories,
  challengeTags,
  tags
} from '@/lib/db/schema';
import { getAuthFromCookie } from '@/lib/auth';
import { generateChallenge, getXpReward } from '@/lib/ai-challenge';
import { eq, and, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const languageName = searchParams.get('language');
  const difficulty = searchParams.get('difficulty');

  if (!languageName || !difficulty) {
    return NextResponse.json(
      { error: 'language and difficulty are required' },
      { status: 400 }
    );
  }

  try {
    // Find the language
    const [lang] = await db
      .select()
      .from(languages)
      .where(eq(languages.name, languageName))
      .limit(1);

    if (!lang) {
      return NextResponse.json(
        { error: 'Language not found' },
        { status: 404 }
      );
    }

    const today = new Date().toISOString().split('T')[0];

    // Check if today's challenge already exists for this language+difficulty
    const [existingChallenge] = await db
      .select()
      .from(challenges)
      .where(
        and(
          eq(challenges.languageId, lang.id),
          eq(challenges.difficulty, difficulty),
          eq(challenges.generatedDate, today)
        )
      )
      .limit(1);

    if (existingChallenge) {
      // Return cached challenge
      const challengeQuestions = await db
        .select({
          id: questions.id,
          question: questions.question,
          options: questions.options,
          correctIndex: questions.correctIndex,
          sortOrder: questions.sortOrder
        })
        .from(questions)
        .where(eq(questions.challengeId, existingChallenge.id))
        .orderBy(questions.sortOrder);

      return NextResponse.json({
        challenge: {
          id: existingChallenge.id,
          title: existingChallenge.title,
          description: existingChallenge.description,
          language: languageName,
          difficulty: existingChallenge.difficulty,
          xpReward: existingChallenge.xpReward
        },
        questions: challengeQuestions
      });
    }

    // Fetch last 10 challenges for this language to avoid repetition
    const recentChallenges = await db
      .select({ title: challenges.title })
      .from(challenges)
      .where(eq(challenges.languageId, lang.id))
      .orderBy(desc(challenges.createdAt))
      .limit(10);

    const recentTitles = recentChallenges.map((c) => c.title);

    // Generate new challenge via AI
    const generated = await generateChallenge(
      languageName,
      difficulty,
      recentTitles
    );

    // Find or create category
    let categoryId: string | null = null;
    if (generated.category) {
      const [existingCat] = await db
        .select()
        .from(categories)
        .where(eq(categories.name, generated.category))
        .limit(1);

      if (existingCat) {
        categoryId = existingCat.id;
      } else {
        const slug = generated.category.toLowerCase().replace(/\s+/g, '-');
        const [newCat] = await db
          .insert(categories)
          .values({ name: generated.category, slug })
          .onConflictDoNothing({ target: categories.slug })
          .returning();
        categoryId = newCat?.id ?? null;
      }
    }

    const xpReward = getXpReward(difficulty);

    // Insert challenge
    const [newChallenge] = await db
      .insert(challenges)
      .values({
        title: generated.title,
        description: generated.description,
        languageId: lang.id,
        difficulty,
        categoryId,
        xpReward,
        generatedDate: today
      })
      .returning();

    // Insert questions
    const insertedQuestions = [];
    for (let i = 0; i < generated.questions.length; i++) {
      const q = generated.questions[i];
      const [inserted] = await db
        .insert(questions)
        .values({
          challengeId: newChallenge.id,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
          sortOrder: i
        })
        .returning({
          id: questions.id,
          question: questions.question,
          options: questions.options,
          correctIndex: questions.correctIndex,
          sortOrder: questions.sortOrder
        });
      insertedQuestions.push(inserted);
    }

    // Insert tags
    if (generated.tags?.length) {
      for (const tagName of generated.tags) {
        const slug = tagName.toLowerCase().replace(/\s+/g, '-');
        let [existingTag] = await db
          .select()
          .from(tags)
          .where(eq(tags.slug, slug))
          .limit(1);

        if (!existingTag) {
          const [newTag] = await db
            .insert(tags)
            .values({ name: tagName, slug })
            .onConflictDoNothing({ target: tags.slug })
            .returning();
          existingTag = newTag ?? existingTag;
        }

        if (existingTag) {
          await db
            .insert(challengeTags)
            .values({ challengeId: newChallenge.id, tagId: existingTag.id });
        }
      }
    }

    return NextResponse.json({
      challenge: {
        id: newChallenge.id,
        title: newChallenge.title,
        description: newChallenge.description,
        language: languageName,
        difficulty: newChallenge.difficulty,
        xpReward: newChallenge.xpReward
      },
      questions: insertedQuestions
    });
  } catch (error) {
    console.error('Challenges error:', error);
    return NextResponse.json(
      { error: 'Failed to load challenge. Please try again.' },
      { status: 500 }
    );
  }
}
