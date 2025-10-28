import { Navbar } from '$components/organisms/navbar'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="px-2">
      <Navbar />
      <div className="mt-22"></div>
      {children}
    </div>
  )
}
