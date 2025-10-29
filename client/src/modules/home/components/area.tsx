import { cn } from '$lib/utils'
import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export const HomeArea: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'border-2 border-border rounded-xl p-4 flex flex-col justify-between gap-4',
        className,
      )}
    >
      {children}
    </div>
  )
}
