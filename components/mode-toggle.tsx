'use client'

import { DropletIcon, MoonIcon, SunIcon } from 'lucide-react'
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
          className='blue:px-100 h-full rounded-none'
        >
          <SunIcon
            size={16}
            className='blue:-rotate-90 blue:scale-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
          />
          <MoonIcon
            size={16}
            className='blue:-rotate-90 blue:scale-0 absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100'
          />
          <DropletIcon
            size={16}
            className='blue:rotate-0 blue:scale-100 absolute rotate-90 scale-0 transition-all dark:-rotate-90 dark:scale-0'
          />

          <span className='sr-only'>Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='min-w-[6rem]'>
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className='flex items-center justify-between'
        >
          Light
          <SunIcon size={16} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className='flex items-center justify-between'
        >
          Dark
          <MoonIcon size={16} />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('blue')}
          className='flex items-center justify-between'
        >
          Blue
          <DropletIcon size={16} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
