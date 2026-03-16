import { db } from '@/lib/db';
import { userStats } from '@/lib/db/schema';
import { getAuthFromCookie } from '@/lib/auth';
import { eq, desc } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function GET() {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [stats] = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, auth.userId))
      .limit(1);

    if (!stats) {
      return NextResponse.json({
        stats: {
          totalXp: 0,
          level: 1,
          challengesSolved: 0,
          streak: 0,
          rank: 0
        }
      });
    }

    // Calculate level (every 500 XP = 1 level)
    const level = Math.floor(stats.totalXp / 500) + 1;

    // Calculate rank (count users with more XP + 1)
    const allStats = await db
      .select({ totalXp: userStats.totalXp, userId: userStats.userId })
      .from(userStats)
      .orderBy(desc(userStats.totalXp));

    const rank =
      allStats.findIndex((s) => s.userId === auth.userId) + 1 ||
      allStats.length + 1;

    return NextResponse.json({
      stats: {
        totalXp: stats.totalXp,
        level,
        challengesSolved: stats.challengesSolved,
        streak: stats.streak,
        rank
      }
    });
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
