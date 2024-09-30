'use client'

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { endOfWeek, format, isWithinInterval, startOfWeek } from 'date-fns'
import { SelectExpense } from '@/drizzle/schema'

const chartConfig = {
  createdAt: {
    label: 'createdAt',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig

type BarChartProps = {
  expenses: Array<SelectExpense>
}

export const ExpenseBarChart = ({ expenses }: BarChartProps) => {
  const startOfCurrentWeek = startOfWeek(new Date(), { weekStartsOn: 0 })
  const endOfCurrentWeek = endOfWeek(new Date(), { weekStartsOn: 0 })

  const currentWeekExpenses = expenses.filter((expense) =>
    isWithinInterval(new Date(expense.createdAt), {
      start: startOfCurrentWeek,
      end: endOfCurrentWeek,
    }),
  )

  return (
    <ChartContainer config={chartConfig} className='h-[200px] w-full'>
      <BarChart accessibilityLayer data={currentWeekExpenses} layout='vertical'>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis
          type='number'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => `$${value.toFixed(2)}`}
        />
        <YAxis
          dataKey='createdAt'
          tickFormatter={(value) => format(new Date(value), 'EEE')}
          type='category'
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey='amount' fill='var(--color-createdAt)' />
      </BarChart>
    </ChartContainer>
  )
}
