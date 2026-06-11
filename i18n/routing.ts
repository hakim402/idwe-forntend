// i18n/routing.ts

import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'zh', 'ar', 'fa', 'ps'],
  defaultLocale: 'en',

  pathnames: {
    '/': '/',

    '/dashboard': {
      en: '/dashboard',
      zh: '/dashboard',
      ar: '/dashboard',
      fa: '/dashboard',
      ps: '/dashboard',
    },

    '/admin': '/admin',

    // Public pages
    '/products': {
      en: '/products',
      zh: '/products',
      ar: '/products',
      fa: '/products',
      ps: '/products',
    },

    '/services': {
      en: '/services',
      zh: '/services',
      ar: '/services',
      fa: '/services',
      ps: '/services',
    },

    '/blogs': {
      en: '/blogs',
      zh: '/blogs',
      ar: '/blogs',
      fa: '/blogs',
      ps: '/blogs',
    },

    '/about': {
      en: '/about',
      zh: '/about',
      ar: '/about',
      fa: '/about',
      ps: '/about',
    },

    '/contact': {
      en: '/contact',
      zh: '/contact',
      ar: '/contact',
      fa: '/contact',
      ps: '/contact',
    },

    // Authentication
    '/sign-in': {
      en: '/sign-in',
      zh: '/sign-in',
      ar: '/sign-in',
      fa: '/sign-in',
      ps: '/sign-in',
    },

    '/sign-up': {
      en: '/sign-up',
      zh: '/sign-up',
      ar: '/sign-up',
      fa: '/sign-up',
      ps: '/sign-up',
    },

    // Dashboard sub-routes
    '/dashboard/requests': {
      en: '/dashboard/requests',
      zh: '/dashboard/requests',
      ar: '/dashboard/requests',
      fa: '/dashboard/requests',
      ps: '/dashboard/requests',
    },

    '/dashboard/bookings': {
      en: '/dashboard/bookings',
      zh: '/dashboard/bookings',
      ar: '/dashboard/bookings',
      fa: '/dashboard/bookings',
      ps: '/dashboard/bookings',
    },

    '/dashboard/consulting': {
      en: '/dashboard/consulting',
      zh: '/dashboard/consulting',
      ar: '/dashboard/consulting',
      fa: '/dashboard/consulting',
      ps: '/dashboard/consulting',
    },

    '/dashboard/support': {
      en: '/dashboard/support',
      zh: '/dashboard/support',
      ar: '/dashboard/support',
      fa: '/dashboard/support',
      ps: '/dashboard/support',
    },

    '/dashboard/notifications': {
      en: '/dashboard/notifications',
      zh: '/dashboard/notifications',
      ar: '/dashboard/notifications',
      fa: '/dashboard/notifications',
      ps: '/dashboard/notifications',
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export const {
  Link,
  redirect,
  usePathname,
  useRouter
} = createNavigation(routing);