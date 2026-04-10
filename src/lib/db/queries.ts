import { and, count, desc, eq, gte, inArray, sql, sum } from 'drizzle-orm';
import { db } from '.';
import {
  challengeAttempts,
  challenges,
  languages,
  users,
  userStats
} from './schema';

// ── Homepage: current user with stats ──
export async function getUserWithStats(userId: string) {
  const result = await db
    .select({
      id: users.id,
      username: users.username,
      totalXp: userStats.totalXp,
      challengesSolved: userStats.challengesSolved,
      streak: userStats.streak,
      lastActiveDate: userStats.lastActiveDate
    })
    .from(users)
    .leftJoin(userStats, eq(userStats.userId, users.id))
    .where(eq(users.id, userId))
    .limit(1);

  if (!result[0]) return null;

  const row = result[0];

  // Compute rank (position among all users by XP)
  const rankResult = await db
    .select({ rank: count() })
    .from(userStats)
    .where(sql`${userStats.totalXp} > ${row.totalXp ?? 0}`);

  const rank = (rankResult[0]?.rank ?? 0) + 1;
  const totalXp = row.totalXp ?? 0;
  const level = Math.floor(totalXp / 500) + 1;

  return {
    id: row.id,
    username: row.username,
    totalXp,
    level,
    challengesSolved: row.challengesSolved ?? 0,
    streak: row.streak ?? 0,
    rank
  };
}

// ── Homepage: platform-wide stats ──
export async function getPlatformStats() {
  const [correctResult, usersResult, challengesResult] = await Promise.all([
    db
      .select({ total: sum(challengeAttempts.correctCount) })
      .from(challengeAttempts),
    db.select({ total: count() }).from(users),
    db.select({ total: count() }).from(challenges)
  ]);

  return {
    correctAnswers: Number(correctResult[0]?.total ?? 0),
    totalUsers: Number(usersResult[0]?.total ?? 0),
    totalChallenges: Number(challengesResult[0]?.total ?? 0)
  };
}

// ── Homepage: leaderboard top N ──
export async function getLeaderboard(limit = 5) {
  const rows = await db
    .select({
      userId: users.id,
      username: users.username,
      totalXp: userStats.totalXp,
      challengesSolved: userStats.challengesSolved
    })
    .from(userStats)
    .innerJoin(users, eq(users.id, userStats.userId))
    .orderBy(desc(userStats.totalXp))
    .limit(limit);

  return rows.map((row, i) => ({
    rank: i + 1,
    userId: row.userId,
    username: row.username,
    totalXp: row.totalXp,
    level: Math.floor(row.totalXp / 500) + 1,
    challengesSolved: row.challengesSolved
  }));
}

// ── Leaderboard with filters ──
export async function getLeaderboardFiltered({
  period = 'all',
  difficulty = 'all',
  language = 'all',
  limit = 50
}: {
  period?: string;
  difficulty?: string;
  language?: string;
  limit?: number;
} = {}) {
  // Compute start date for time period filter
  let startDate: Date | null = null;
  if (period === 'today') {
    startDate = new Date();
    startDate.setUTCHours(0, 0, 0, 0);
  } else if (period === 'week') {
    startDate = new Date();
    startDate.setUTCDate(startDate.getUTCDate() - 7);
    startDate.setUTCHours(0, 0, 0, 0);
  } else if (period === 'month') {
    startDate = new Date();
    startDate.setUTCDate(1);
    startDate.setUTCHours(0, 0, 0, 0);
  }

  const conditions = [
    startDate ? gte(challengeAttempts.completedAt, startDate) : undefined,
    difficulty !== 'all' ? eq(challenges.difficulty, difficulty) : undefined,
    language !== 'all' ? eq(languages.name, language) : undefined
  ].filter(Boolean) as Parameters<typeof and>;

  const rows = await db
    .select({
      userId: users.id,
      username: users.username,
      score: sum(challengeAttempts.xpEarned)
    })
    .from(challengeAttempts)
    .innerJoin(users, eq(users.id, challengeAttempts.userId))
    .innerJoin(challenges, eq(challenges.id, challengeAttempts.challengeId))
    .innerJoin(languages, eq(languages.id, challenges.languageId))
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .groupBy(users.id, users.username)
    .orderBy(desc(sum(challengeAttempts.xpEarned)))
    .limit(limit);

  if (rows.length === 0) return [];

  const userIds = rows.map((r) => r.userId);

  // Fetch primary language per user (most used across all attempts)
  const langRows = await db
    .select({
      userId: challengeAttempts.userId,
      languageName: languages.name,
      cnt: count()
    })
    .from(challengeAttempts)
    .innerJoin(challenges, eq(challenges.id, challengeAttempts.challengeId))
    .innerJoin(languages, eq(languages.id, challenges.languageId))
    .where(inArray(challengeAttempts.userId, userIds))
    .groupBy(challengeAttempts.userId, languages.name)
    .orderBy(desc(count()));

  // Build map: userId → primary language (first = highest count due to ORDER BY)
  const primaryLangMap = new Map<string, string>();
  for (const row of langRows) {
    if (!primaryLangMap.has(row.userId)) {
      primaryLangMap.set(row.userId, row.languageName);
    }
  }

  return rows.map((row, i) => {
    const score = Number(row.score ?? 0);
    return {
      rank: i + 1,
      userId: row.userId,
      username: row.username,
      score,
      level: Math.floor(score / 500) + 1,
      primaryLanguage: primaryLangMap.get(row.userId) ?? '—'
    };
  });
}

// ── Homepage: all languages ──
export async function getLanguages() {
  const rows = await db
    .select({ name: languages.name })
    .from(languages)
    .orderBy(languages.name);

  return rows.map((r) => r.name);
}
