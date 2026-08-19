'use client'

import { usePathname } from 'next/navigation'
import NextLink from 'next/link'
import React from "react";

type LinkStatedProps = {
  href: string
  exact?: boolean
  className?: string
  activeClassName?: string
  children: React.ReactNode
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

export default function LinkStated({href, exact = false, children, className, activeClassName = 'active', ...props}: LinkStatedProps) {
  const pathname = usePathname()
  const isActive = exact ? pathname === href : pathname.startsWith(href)
  const newClassName = isActive ? `${className} ${activeClassName}` : className

  return (
    <NextLink href={href} className={newClassName} {...props}>
      {children}
    </NextLink>
  )
}
