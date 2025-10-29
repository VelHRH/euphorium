import { Navbar } from '$components/organisms/navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="px-2 min-h-screen flex flex-col">
      <Navbar />
      <div className="mt-22"></div>
      <div className="flex-1">{children}</div>
      <div className="py-4 mt-4">
        <p className="text-center">
          <span className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Euphorium family
          </span>
        </p>
      </div>
    </div>
  )
}
