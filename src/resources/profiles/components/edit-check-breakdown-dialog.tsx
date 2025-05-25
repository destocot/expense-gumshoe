'use client'

import { Button } from '@/components/ui/button'
import defaultTheme from 'tailwindcss/defaultTheme'
import { PencilIcon } from 'lucide-react'
import { useMedia } from 'react-use'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@ui/dialog'
import { EditCheckBreakdownForm } from '@profiles/components/edit-check-breakdown-form'
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@ui/drawer'
import { Card, CardContent } from '@ui/card'
import { Profile } from '@profiles/types'

interface EditCheckBreakdownDialogProps {
  defaultValues: Profile['checkBreakdown']
}

export const EditCheckBreakdownDialog = ({ defaultValues }: EditCheckBreakdownDialogProps) => {
  const isDesktop = useMedia(`(min-width:${defaultTheme.screens.sm})`, true)

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant='outline' size='sm'>
            <PencilIcon />
            Edit
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle className='sr-only'>Modal Title</DialogTitle>
          <DialogDescription className='sr-only'>Modal Description</DialogDescription>

          <Card className='sm:bg-card border-0 bg-transparent shadow-none'>
            <CardContent>
              <EditCheckBreakdownForm defaultValues={defaultValues} />
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline' size='sm'>
          <PencilIcon />
          Edit
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerTitle className='sr-only'>Modal Title</DrawerTitle>
        <DrawerDescription className='sr-only'>Modal Description</DrawerDescription>

        <Card className='sm:bg-card border-0 bg-transparent shadow-none'>
          <CardContent>
            <EditCheckBreakdownForm defaultValues={defaultValues} />
          </CardContent>
        </Card>
      </DrawerContent>
    </Drawer>
  )
}
