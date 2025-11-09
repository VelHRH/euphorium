import { Button } from '$components/ui/button'
import { cn } from '$lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { FC } from 'react'

type NavbarButtonProps = {
  label: string
  // icon: ReactNode
  route: string
  isGhost?: boolean
}

export const NavbarButton: FC<NavbarButtonProps> = ({
  label,
  route,
  isGhost = true,
}) => {
  const pathname = usePathname()
  const router = useRouter()
  const isActive = pathname.includes(route)
  if (isGhost) {
    return (
      <Button
        className={cn(
          'text-foreground rounded-full',
          isActive && 'bg-primary/20 text-primary',
        )}
        variant="ghost"
        onClick={() => router.push(route)}
      >
        {label}
      </Button>
    )
  }
  return <Button className="text-background rounded-full">{label}</Button>
}
