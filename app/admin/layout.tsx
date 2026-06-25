// Root admin layout — no auth check here.
// The (protected) sub-group handles its own auth.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
