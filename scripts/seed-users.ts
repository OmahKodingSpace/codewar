import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import { users, userStats } from '../src/lib/db/schema';
import { hash } from 'bcryptjs';
import { eq } from 'drizzle-orm';

const sql = postgres(process.env.DATABASE_URL!);
const db = drizzle(sql);

const USERS = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'user1', password: 'password123', role: 'user' },
  { username: 'user2', password: 'password123', role: 'user' },
  { username: 'user3', password: 'password123', role: 'user' }
];

async function seed() {
  console.log('Seeding users...');

  for (const userData of USERS) {
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, userData.username));

    if (existingUser.length > 0) {
      console.log(`  Skipping ${userData.username} (already exists)`);
      continue;
    }

    const passwordHash = await hash(userData.password, 12);

    const [newUser] = await db
      .insert(users)
      .values({
        username: userData.username,
        passwordHash,
        role: userData.role
      })
      .returning();

    console.log(`  Created ${userData.role}: ${userData.username}`);

    // Create userStats entry for regular users
    if (userData.role === 'user') {
      await db.insert(userStats).values({
        userId: newUser.id,
        totalXp: 0,
        challengesSolved: 0,
        streak: 0
      });
    }
  }

  console.log(`  ${USERS.length} users processed`);
  console.log('Done!');
}

seed().catch(console.error);
