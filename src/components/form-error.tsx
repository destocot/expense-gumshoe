interface FormErrorProps {
  id: string
  message?: string
}

export const FormError = ({ id, message }: FormErrorProps) => {
  if (!message) return null

  return (
    <p id={id} className='text-destructive text-[0.8rem] font-medium'>
      {message}
    </p>
  )
}
