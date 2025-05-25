import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { Label } from '@ui/label'
import { Profile } from '@profiles/types'
import { useActionState, useEffect } from 'react'
import { editCheckBreakdownAction } from '@profiles/actions/edit-check-breakdown.action'
import { Loader2Icon } from 'lucide-react'

interface EditCheckBreakdownFormProps {
  defaultValues: Profile['checkBreakdown']
}

export const EditCheckBreakdownForm = ({ defaultValues }: EditCheckBreakdownFormProps) => {
  const [state, formAction, isPending] = useActionState(editCheckBreakdownAction, undefined)

  useEffect(() => {
    console.log('state', state)
  }, [state])

  return (
    <form className='space-y-4' action={formAction}>
      <div className='grid grid-cols-3 gap-2'>
        <div className='space-y-2'>
          <Label htmlFor='income'>Income</Label>
          <Input type='number' id='income' name='income' defaultValue={defaultValues.income} />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='savings'>Savings</Label>
          <Input type='number' id='savings' name='savings' defaultValue={defaultValues.savings} />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='other'>Other</Label>
          <Input type='number' id='other' name='other' defaultValue={defaultValues.other} />
        </div>
      </div>

      <Button type='submit' className='float-right' disabled={isPending}>
        {isPending ? <Loader2Icon className='animate-spin' /> : 'Update'}
      </Button>
    </form>
  )
}
