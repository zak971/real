"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/Header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  return (
    <div className="min-h-screen bg-gray-50">
      {!isLoginPage && <Header />}
      <main className={!isLoginPage ? "pt-16" : ""}>
        {children}
      </main>
    </div>
  )
} 