import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

/**
 * Locale-aware náhrady za next/link a next/navigation. `Link` si samo
 * doplní správný prefix podle aktuálního jazyka (nebo podle explicitního
 * `locale` propu), takže není potřeba ručně skládat `/${locale}/about`
 * po celém webu.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
