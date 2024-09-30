'use client'

import { Trash2Icon } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { SelectCheck } from '@/drizzle/schema'
import { deleteCheck } from '@/actions/delete-check.action'
import { usePathname, useRouter } from 'next/navigation'

export const DeleteCheckButton = ({
  checkId,
  className,
}: {
  checkId: SelectCheck['checkId']
  className?: string
}) => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='destructive' className={className}>
          <span className='hidden sm:block'>Delete Check</span>
          <Trash2Icon size={20} className='sm:ml-2' />
        </Button>
      </DialogTrigger>

      <DialogContent className='max-w-xs'>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription className='sr-only'>
            This will permanently delete the check.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className='flex flex-row-reverse gap-2'>
          <DialogClose className='flex-1' asChild>
            <Button variant='ghost'>Cancel</Button>
          </DialogClose>
          <Button
            className='flex-1'
            variant='destructive'
            onClick={async () => {
              await deleteCheck(checkId)
              if (pathname.startsWith('/c/')) {
                router.push('/')
              }
            }}
          >
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
