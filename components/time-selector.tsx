'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from './ui/button'

type TimeSelectorProps = {
  time?: 'day' | 'week' | 'month'
}

export const TimeSelector = ({ time }: TimeSelectorProps) => {
  time = time || 'week'
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleClick = (time: 'day' | 'week' | 'month') => {
    const params = new URLSearchParams(searchParams)
    params.set('t', time)
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div className='grid grid-cols-3 divide-x'>
      <Button
        size='sm'
        className='rounded-r-none uppercase'
        disabled={time === 'day'}
        onClick={() => handleClick('day')}
      >
        Day
      </Button>
      <Button
        size='sm'
        className='rounded-l-none rounded-r-none uppercase'
        disabled={time === 'week'}
        onClick={() => handleClick('week')}
      >
        Week
      </Button>
      <Button
        size='sm'
        className='rounded-l-none uppercase'
        disabled={time === 'month'}
        onClick={() => handleClick('month')}
      >
        Month
      </Button>
    </div>
  )
}
