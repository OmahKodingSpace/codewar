import {
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core';

// ── Users ──
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('user'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

// ── Languages ──
export const languages = pgTable('languages', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export type Language = typeof languages.$inferSelect;

// ── Categories ──
export const categories = pgTable('categories', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export type Category = typeof categories.$inferSelect;

// ── Tags ──
export const tags = pgTable('tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export type Tag = typeof tags.$inferSelect;

// ── Challenges ──
export const challenges = pgTable('challenges', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  languageId: uuid('language_id')
    .notNull()
    .references(() => languages.id, { onDelete: 'cascade' }),
  difficulty: text('difficulty').notNull(), // easy | medium | hard | expert
  categoryId: uuid('category_id').references(() => categories.id, {
    onDelete: 'set null'
  }),
  xpReward: integer('xp_reward').notNull(),
  generatedDate: text('generated_date').notNull(), // YYYY-MM-DD — one per language+difficulty per day
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export type Challenge = typeof challenges.$inferSelect;

// ── Challenge Tags (many-to-many) ──
export const challengeTags = pgTable('challenge_tags', {
  id: uuid('id').defaultRandom().primaryKey(),
  challengeId: uuid('challenge_id')
    .notNull()
    .references(() => challenges.id, { onDelete: 'cascade' }),
  tagId: uuid('tag_id')
    .notNull()
    .references(() => tags.id, { onDelete: 'cascade' })
});

// ── Questions ──
export const questions = pgTable('questions', {
  id: uuid('id').defaultRandom().primaryKey(),
  challengeId: uuid('challenge_id')
    .notNull()
    .references(() => challenges.id, { onDelete: 'cascade' }),
  question: text('question').notNull(),
  options: jsonb('options').$type<string[]>().notNull(),
  correctIndex: integer('correct_index').notNull(),
  sortOrder: integer('sort_order').notNull().default(0)
});

export type Question = typeof questions.$inferSelect;

// ── Challenge Attempts ──
export const challengeAttempts = pgTable('challenge_attempts', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  challengeId: uuid('challenge_id')
    .notNull()
    .references(() => challenges.id, { onDelete: 'cascade' }),
  answers: jsonb('answers').$type<(number | null)[]>().notNull(),
  correctCount: integer('correct_count').notNull(),
  totalQuestions: integer('total_questions').notNull(),
  xpEarned: integer('xp_earned').notNull(),
  completedAt: timestamp('completed_at').defaultNow().notNull()
});

export type ChallengeAttempt = typeof challengeAttempts.$inferSelect;

// ── User Stats ──
export const userStats = pgTable('user_stats', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => users.id, { onDelete: 'cascade' }),
  totalXp: integer('total_xp').notNull().default(0),
  challengesSolved: integer('challenges_solved').notNull().default(0),
  streak: integer('streak').notNull().default(0),
  lastActiveDate: text('last_active_date'), // YYYY-MM-DD
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export type UserStat = typeof userStats.$inferSelect;
