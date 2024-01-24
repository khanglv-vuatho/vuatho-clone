import { createLocalizedPathnamesNavigation, Pathnames } from 'next-intl/navigation'
import { locales } from './constants'

export const pathnames = {
  '/': '/',
  '/services': '/services',
  '/blog': '/blog',
  '/about-us': '/about-us',
}

export const { Link, redirect, usePathname, useRouter, getPathname } = createLocalizedPathnamesNavigation({
  locales,
  pathnames,
})
