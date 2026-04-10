import { getAuthFromCookie } from '@/lib/auth';
import { getLeaderboardFiltered } from '@/lib/db/queries';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const auth = await getAuthFromCookie();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const period = searchParams.get('period') ?? 'all';
  const difficulty = searchParams.get('difficulty') ?? 'all';
  const language = searchParams.get('language') ?? 'all';

  const validPeriods = ['all', 'month', 'week', 'today'];
  const validDifficulties = ['all', 'easy', 'medium', 'hard', 'expert'];

  if (language !== 'all' && !/^[a-zA-Z0-9+#. -]{1,50}$/.test(language)) {
    return NextResponse.json(
      { error: 'Invalid language parameter' },
      { status: 400 }
    );
  }

  if (
    !validPeriods.includes(period) ||
    !validDifficulties.includes(difficulty)
  ) {
    return NextResponse.json(
      { error: 'Invalid filter parameters' },
      { status: 400 }
    );
  }

  try {
    const entries = await getLeaderboardFiltered({
      period,
      difficulty,
      language
    });
    return NextResponse.json({ entries });
  } catch (error) {
    console.error('Leaderboard error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
