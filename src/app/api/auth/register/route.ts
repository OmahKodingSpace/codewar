import { db } from '@/lib/db';
import { users, userStats } from '@/lib/db/schema';
import { createToken, setAuthCookie } from '@/lib/auth';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // console.log('Register request received');
    const { username, password } = await request.json();

    if (!username || !password) {
      // console.log('Username and password are required');
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    const existing = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (existing.length > 0) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 409 }
      );
    }

    const passwordHash = await hash(password, 12);

    const [user] = await db
      .insert(users)
      .values({ username, passwordHash })
      .returning({ id: users.id, username: users.username, role: users.role });

    // Every user starts as a warrior with a stats row so they appear on the
    // leaderboard and hero from day one.
    await db.insert(userStats).values({ userId: user.id });

    const token = await createToken({
      userId: user.id,
      username: user.username,
      role: user.role
    });
    await setAuthCookie(token);

    return NextResponse.json({
      user: { id: user.id, username: user.username, role: user.role }
    });
  } catch (error) {
    console.error('Register error:', error);

    const pgCode =
      error instanceof Error && 'cause' in error
        ? (error.cause as { code?: string })?.code
        : undefined;

    if (pgCode === '23505') {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
