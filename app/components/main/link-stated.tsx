'use client'

import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import React from "react";

export default function LinkStated({href, exact = false, children, className, activeClassName = 'active', ...props}: {
  href: string
  exact?: boolean
  className?: string
  activeClassName?: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)
  const newClassName = isActive ? `${className} ${activeClassName}` : className

  return (
    <NextLink href={href} className={newClassName} {...props}>
      {children}
    </NextLink>
  )
}
