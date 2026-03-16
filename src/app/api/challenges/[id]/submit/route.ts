import { db } from '@/lib/db';
import {
  challenges,
  questions,
  challengeAttempts,
  userStats
} from '@/lib/db/schema';
import { getAuthFromCookie } from '@/lib/auth';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id: challengeId } = await params;
  const { answers } = (await request.json()) as {
    answers: (number | null)[];
  };

  if (!answers || !Array.isArray(answers)) {
    return NextResponse.json(
      { error: 'answers array is required' },
      { status: 400 }
    );
  }

  try {
    const [challenge] = await db
      .select()
      .from(challenges)
      .where(eq(challenges.id, challengeId))
      .limit(1);

    if (!challenge) {
      return NextResponse.json(
        { error: 'Challenge not found' },
        { status: 404 }
      );
    }

    const challengeQuestions = await db
      .select()
      .from(questions)
      .where(eq(questions.challengeId, challengeId))
      .orderBy(questions.sortOrder);

    const totalQuestions = challengeQuestions.length;
    let correctCount = 0;
    for (let i = 0; i < totalQuestions; i++) {
      if (answers[i] === challengeQuestions[i].correctIndex) {
        correctCount++;
      }
    }

    const xpPerQuestion = Math.floor(challenge.xpReward / totalQuestions);
    const xpEarned = correctCount * xpPerQuestion;

    const [attempt] = await db
      .insert(challengeAttempts)
      .values({
        userId: auth.userId,
        challengeId,
        answers,
        correctCount,
        totalQuestions,
        xpEarned
      })
      .returning();

    // Update user stats
    const today = new Date().toISOString().split('T')[0];

    const [existingStats] = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, auth.userId))
      .limit(1);

    if (existingStats) {
      let newStreak = existingStats.streak;
      if (existingStats.lastActiveDate) {
        const lastActive = new Date(existingStats.lastActiveDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor(
          (todayDate.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
        );
        if (diffDays === 1) {
          newStreak = existingStats.streak + 1;
        } else if (diffDays > 1) {
          newStreak = 1;
        }
      } else {
        newStreak = 1;
      }

      await db
        .update(userStats)
        .set({
          totalXp: existingStats.totalXp + xpEarned,
          challengesSolved: existingStats.challengesSolved + 1,
          streak: newStreak,
          lastActiveDate: today
        })
        .where(eq(userStats.userId, auth.userId));
    } else {
      await db.insert(userStats).values({
        userId: auth.userId,
        totalXp: xpEarned,
        challengesSolved: 1,
        streak: 1,
        lastActiveDate: today
      });
    }

    return NextResponse.json({
      attempt: {
        id: attempt.id,
        correctCount,
        totalQuestions,
        xpEarned,
        completedAt: attempt.completedAt
      }
    });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
