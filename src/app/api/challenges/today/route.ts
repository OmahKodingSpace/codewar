import { db } from '@/lib/db';
import {
  challengeAttempts,
  challenges,
  languages,
  questions
} from '@/lib/db/schema';
import { getAuthFromCookie } from '@/lib/auth';
import { eq, and, gte } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    // Get today's attempt (only one per day)
    const [attempt] = await db
      .select({
        id: challengeAttempts.id,
        challengeId: challengeAttempts.challengeId,
        answers: challengeAttempts.answers,
        correctCount: challengeAttempts.correctCount,
        totalQuestions: challengeAttempts.totalQuestions,
        xpEarned: challengeAttempts.xpEarned,
        completedAt: challengeAttempts.completedAt,
        language: languages.name,
        difficulty: challenges.difficulty,
        title: challenges.title,
        xpReward: challenges.xpReward
      })
      .from(challengeAttempts)
      .innerJoin(challenges, eq(challengeAttempts.challengeId, challenges.id))
      .innerJoin(languages, eq(challenges.languageId, languages.id))
      .where(
        and(
          eq(challengeAttempts.userId, auth.userId),
          gte(challengeAttempts.completedAt, todayStart)
        )
      )
      .limit(1);

    if (!attempt) {
      return NextResponse.json({ attempt: null });
    }

    // Get the questions for result display
    const challengeQuestions = await db
      .select({
        id: questions.id,
        question: questions.question,
        options: questions.options,
        correctIndex: questions.correctIndex,
        sortOrder: questions.sortOrder
      })
      .from(questions)
      .where(eq(questions.challengeId, attempt.challengeId))
      .orderBy(questions.sortOrder);

    return NextResponse.json({
      attempt: {
        ...attempt,
        questions: challengeQuestions
      }
    });
  } catch (error) {
    console.error('Today attempt error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
