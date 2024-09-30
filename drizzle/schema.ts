import { relations, SQL, sql } from 'drizzle-orm'
import {
  type AnySQLiteColumn,
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from 'drizzle-orm/sqlite-core'

export function lower(username: AnySQLiteColumn): SQL {
  return sql`lower(${username})`
}

export const users = sqliteTable(
  'users',
  {
    userId: text('user_id')
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
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

export const expenses = sqliteTable('expense', {
  expenseId: text('expense_id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
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
})

/* relations */

export const usersRelations = relations(users, ({ many }) => ({
  expenses: many(expenses),
}))

/* types */

export type InferUser = typeof users.$inferInsert
export type SelectUser = typeof users.$inferSelect

export type InferExpense = typeof expenses.$inferInsert
export type SelectExpense = typeof expenses.$inferSelect
