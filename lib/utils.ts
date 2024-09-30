import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateObject = (values: unknown) => {
  if (typeof values !== 'object' || values === null || Array.isArray(values)) {
    throw new Error('Invalid JSON Object')
  }
  return values
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatMoney(amount: number) {
  return currencyFormatter.format(amount)
}
