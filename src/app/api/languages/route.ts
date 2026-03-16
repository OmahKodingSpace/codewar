import { db } from '@/lib/db';
import { languages } from '@/lib/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const allLanguages = await db
      .select({ id: languages.id, name: languages.name, slug: languages.slug })
      .from(languages)
      .orderBy(languages.name);

    return NextResponse.json({ languages: allLanguages });
  } catch (error) {
    console.error('Languages error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
