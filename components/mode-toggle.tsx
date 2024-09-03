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
          className='cyberpunk:px-100 h-full rounded-none'
        >
          <SunIcon
            size={16}
            className='cyberpunk:-rotate-90 cyberpunk:scale-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
          />
          <MoonIcon
            size={16}
            className='cyberpunk:-rotate-90 cyberpunk:scale-0 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
          />
          <CircuitBoardIcon
            size={16}
            className='cyberpunk:rotate-0 cyberpunk:scale-100 absolute rotate-90 scale-0 transition-all dark:-rotate-90 dark:scale-0'
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
        <DropdownMenuItem onClick={() => setTheme('cyberpunk')}>
          Cyberpunk
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
