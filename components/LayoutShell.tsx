'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  return (
    <div className="flex min-h-screen flex-col">
      {!isHome && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isHome && <Footer />}
    </div>
  )
}
