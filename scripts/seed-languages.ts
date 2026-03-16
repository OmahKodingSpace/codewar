import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { languages, categories } from '../src/lib/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const LANGUAGES = [
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'Python', slug: 'python' },
  { name: 'Go', slug: 'go' },
  { name: 'PHP', slug: 'php' }
];

const CATEGORIES = [
  { name: 'Arrays', slug: 'arrays' },
  { name: 'Strings', slug: 'strings' },
  { name: 'Trees', slug: 'trees' },
  { name: 'Graphs', slug: 'graphs' },
  { name: 'Dynamic Programming', slug: 'dynamic-programming' },
  { name: 'Stacks', slug: 'stacks' },
  { name: 'Linked Lists', slug: 'linked-lists' },
  { name: 'Design', slug: 'design' },
  { name: 'Sorting', slug: 'sorting' },
  { name: 'Recursion', slug: 'recursion' }
];

async function seed() {
  console.log('Seeding languages...');
  for (const lang of LANGUAGES) {
    await db
      .insert(languages)
      .values(lang)
      .onConflictDoNothing({ target: languages.slug });
  }
  console.log(`  ${LANGUAGES.length} languages seeded`);

  console.log('Seeding categories...');
  for (const cat of CATEGORIES) {
    await db
      .insert(categories)
      .values(cat)
      .onConflictDoNothing({ target: categories.slug });
  }
  console.log(`  ${CATEGORIES.length} categories seeded`);

  console.log('Done!');
}

seed().catch(console.error);
