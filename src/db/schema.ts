import {sql} from 'drizzle-orm';
import {integer, sqliteTable, text} from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
});

export const studySessionsTable = sqliteTable('study_sessions', {
  id: integer('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, {onDelete: 'cascade'}),
  subject: text('subject').notNull(),
  duration: integer('duration').notNull(), // in minutes
  date: text('date').notNull(),
  notes: text('notes'),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const classesTable = sqliteTable('classes', {
  id: integer('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => usersTable.id, {onDelete: 'cascade'}),
  name: text('name').notNull(),
  description: text('description'),
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type StudySession = typeof studySessionsTable.$inferSelect;
export type NewStudySession = typeof studySessionsTable.$inferInsert;

export type Class = typeof classesTable.$inferSelect;
export type NewClass = typeof classesTable.$inferInsert;
