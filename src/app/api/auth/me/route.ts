import { getAuthFromCookie } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const auth = await getAuthFromCookie();

  if (!auth) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({
    user: { id: auth.userId, username: auth.username, role: auth.role }
  });
}
