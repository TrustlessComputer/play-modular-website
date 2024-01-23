'use client'

import React, { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import { usePathname } from 'next/navigation'

export default function Layout({ children }: { children: ReactNode }) {
  const pathName = usePathname()
  console.log(pathName)

  const isWorkShopPage = pathName === '/workshop'
  return isWorkShopPage ? (
    children
  ) : (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
