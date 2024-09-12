'use client'

import { Button } from '@/components/ui/button'
import { Trash2Icon } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteCheck } from '@/actions/delete-check.action'
import { usePathname, useRouter } from 'next/navigation'
import { DialogDescription } from '@radix-ui/react-dialog'

type DeleteCheckButtonProps = { checkId: string }

export const DeleteCheckButton = ({ checkId }: DeleteCheckButtonProps) => {
  const p = usePathname()
  const r = useRouter()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' size='icon'>
          <Trash2Icon size={18} />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-xs'>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription className='sr-only'>
            This will permanently delete the check and all its expenses.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex gap-2 sm:flex-row-reverse'>
          <DialogClose className='flex-1' asChild>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
          <Button
            className='flex-1'
            variant='destructive'
            onClick={async () => {
              await deleteCheck(checkId)
              if (p.startsWith('/c/')) r.push('/')
            }}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
