import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@ui/carousel'
import { Check } from '@/generated/prisma'
import { CheckCard } from '@checks/components/check-card'

interface CheckCarouselProps {
  checks: Array<Check>
}

export const CheckCarousel = ({ checks }: CheckCarouselProps) => {
  return (
    <Carousel className='mx-auto w-full max-w-sm'>
      <CarouselContent>
        {checks.map((c) => (
          <CarouselItem key={c.id}>
            <CheckCard check={c} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
