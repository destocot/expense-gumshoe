import { ExpenseType } from '@/generated/prisma'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const EXPENSE_TYPES: ReadonlyArray<ExpenseType> = [
  ExpenseType.EXPENSE,
  ExpenseType.INCOME,
  ExpenseType.OTHER,
  ExpenseType.SAVINGS,
] as const

export function formatDate(date: Date) {
  const formatted = new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
  }).format(date)

  return formatted
}

export function formatCurrency(amountInCents: number, currency = 'USD') {
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amountInCents / 100)

  return format
}
