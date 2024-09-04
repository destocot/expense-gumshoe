'use client'

import { CircuitBoardIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='secondary'
          size='sm'
          className='cobalt:px-100 h-full rounded-none'
        >
          <SunIcon
            size={16}
            className='cobalt:-rotate-90 cobalt:scale-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
          />
          <MoonIcon
            size={16}
            className='cobalt:-rotate-90 cobalt:scale-0 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
          />
          <CircuitBoardIcon
            size={16}
            className='cobalt:rotate-0 cobalt:scale-100 absolute rotate-90 scale-0 stroke-black transition-all dark:-rotate-90 dark:scale-0'
          />

          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('cobalt')}>
          Cobalt
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
