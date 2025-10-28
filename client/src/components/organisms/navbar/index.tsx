'use client'

import { useRouter } from 'next/navigation'
import { NavbarButton } from './button'

const siteName = 'EUPHORIUM'

export const Navbar = () => {
  const router = useRouter()
  return (
    <div className="h-16 bg-card/20 backdrop-blur-md border-2 border-border rounded-full fixed top-2 left-2 right-2 shadow-lg">
      <div className="flex items-center justify-between h-full text-foreground font-medium px-4 py-2">
        <div className="flex items-center gap-2">
          <div
            className="flex items-center gap-1 mr-4 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <div
              className="bg-linear-to-r from-secondary to-primary w-12 h-12"
              style={{
                WebkitMask: `url(/images/logo-transparent.png) center/contain no-repeat`,
                mask: `url(/images/logo-transparent.png) center/contain no-repeat`,
              }}
            ></div>

            <div className="text-2xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {siteName}
            </div>
          </div>
          <NavbarButton label="Shows" route="/shows" />
          <NavbarButton label="Library" route="/library" />
          <NavbarButton label="Profile" route="/profile" />
        </div>
        <div className="flex items-center gap-2">
          <NavbarButton label="Login" route="/login" isGhost={false} />
        </div>
      </div>
    </div>
  )
}
