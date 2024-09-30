import { relations, SQL, sql } from 'drizzle-orm'
import {
  type AnySQLiteColumn,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'
import { createId } from '@paralleldrive/cuid2'

export function lower(username: AnySQLiteColumn): SQL {
  return sql`lower(${username})`
}

export const users = sqliteTable(
  'users',
  {
    userId: text('user_id')
      .primaryKey()
      .$defaultFn(() => createId()),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(CURRENT_TIMESTAMP)`)
      .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
    username: text('username').notNull(),
    password: text('password').notNull(),
    checkDepositBreakdown: text('check_deposit_breakdown', {
      mode: 'json',
    })
      .notNull()
      .$type<{ income: number; savings: number; other: number }>()
      .default({ income: 60, savings: 10, other: 30 }),
  },
  (table) => ({
    usernameUniqueIndex: uniqueIndex('username_unique_index').on(
      lower(table.username),
    ),
  }),
)

export const expenses = sqliteTable('expenses', {
  expenseId: text('expense_id')
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  amount: integer('amount').notNull(),
  type: text('type', {
    enum: ['income', 'expense', 'savings', 'other'],
  }).notNull(),
  description: text('description').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade' }),
  checkId: text('check_id').references(() => checks.checkId, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
})

export const checks = sqliteTable('checks', {
  checkId: text('check_id')
    .primaryKey()
    .$defaultFn(() => createId()),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`),
  amount: integer('amount').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.userId, { onDelete: 'cascade' }),
})

/* relations */

export const usersRelations = relations(users, ({ many }) => ({
  expenses: many(expenses),
  checks: many(checks),
}))

export const expensesRelations = relations(expenses, ({ one }) => ({
  user: one(users),
  check: one(checks),
}))

export const checksRelations = relations(checks, ({ one }) => ({
  user: one(users),
}))

/* types */

export type InferUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InferExpense = typeof expenses.$inferInsert
export type SelectExpense = typeof expenses.$inferSelect

export type InferCheck = typeof checks.$inferInsert
export type SelectCheck = typeof checks.$inferSelect
