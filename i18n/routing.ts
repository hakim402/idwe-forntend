// i18n/routing.ts

import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['en', 'es', 'de', 'fr', 'it', 'nl', 'zh', 'ar', 'fa', 'ps'],
  defaultLocale: 'en',

  pathnames: {
    '/': '/',

    '/dashboard': {
      en: '/dashboard',
      es: '/dashboard',
      de: '/dashboard',
      fr: '/dashboard',
      it: '/dashboard',    // or '/cruscotto'
      nl: '/dashboard',    // or '/dashboard' (usually same)
      zh: '/dashboard',
      ar: '/dashboard',
      fa: '/dashboard',
      ps: '/dashboard',
    },

    '/admin': '/admin',

    '/products': {
      en: '/products',
      es: '/products',     // or '/productos'
      de: '/products',     // or '/produkte'
      fr: '/products',     // or '/produits'
      it: '/products',     // or '/prodotti'
      nl: '/products',     // or '/producten'
      zh: '/products',
      ar: '/products',
      fa: '/products',
      ps: '/products',
    },

    '/services': {
      en: '/services',
      es: '/services',     // or '/servicios'
      de: '/services',     // or '/dienstleistungen'
      fr: '/services',     // or '/prestations'
      it: '/services',     // or '/servizi'
      nl: '/services',     // or '/diensten'
      zh: '/services',
      ar: '/services',
      fa: '/services',
      ps: '/services',
    },

    '/blogs': {
      en: '/blogs',
      es: '/blogs',
      de: '/blogs',
      fr: '/blogs',
      it: '/blogs',
      nl: '/blogs',
      zh: '/blogs',
      ar: '/blogs',
      fa: '/blogs',
      ps: '/blogs',
    },

    '/about': {
      en: '/about',
      es: '/about',       // or '/sobre-nosotros'
      de: '/about',       // or '/ueber-uns'
      fr: '/about',       // or '/a-propos'
      it: '/about',       // or '/chi-siamo'
      nl: '/about',       // or '/over-ons'
      zh: '/about',
      ar: '/about',
      fa: '/about',
      ps: '/about',
    },

    '/contact': {
      en: '/contact',
      es: '/contact',     // or '/contacto'
      de: '/contact',     // or '/kontakt'
      fr: '/contact',
      it: '/contact',     // or '/contatti'
      nl: '/contact',     // or '/contact'
      zh: '/contact',
      ar: '/contact',
      fa: '/contact',
      ps: '/contact',
    },

    '/sign-in': {
      en: '/sign-in',
      es: '/sign-in',     // or '/iniciar-sesion'
      de: '/sign-in',     // or '/anmelden'
      fr: '/sign-in',     // or '/connexion'
      it: '/sign-in',     // or '/accedi'
      nl: '/sign-in',     // or '/inloggen'
      zh: '/sign-in',
      ar: '/sign-in',
      fa: '/sign-in',
      ps: '/sign-in',
    },

    '/sign-up': {
      en: '/sign-up',
      es: '/sign-up',     // or '/registrarse'
      de: '/sign-up',     // or '/registrieren'
      fr: '/sign-up',     // or '/inscription'
      it: '/sign-up',     // or '/registrati'
      nl: '/sign-up',     // or '/registreren'
      zh: '/sign-up',
      ar: '/sign-up',
      fa: '/sign-up',
      ps: '/sign-up',
    },

    // Dashboard sub-routes
    '/dashboard/requests': {
      en: '/dashboard/requests',
      es: '/dashboard/requests',
      de: '/dashboard/requests',
      fr: '/dashboard/requests',
      it: '/dashboard/requests',
      nl: '/dashboard/requests',
      zh: '/dashboard/requests',
      ar: '/dashboard/requests',
      fa: '/dashboard/requests',
      ps: '/dashboard/requests',
    },

    '/dashboard/bookings': {
      en: '/dashboard/bookings',
      es: '/dashboard/bookings',
      de: '/dashboard/bookings',
      fr: '/dashboard/bookings',
      it: '/dashboard/bookings',
      nl: '/dashboard/bookings',
      zh: '/dashboard/bookings',
      ar: '/dashboard/bookings',
      fa: '/dashboard/bookings',
      ps: '/dashboard/bookings',
    },

    '/dashboard/consulting': {
      en: '/dashboard/consulting',
      es: '/dashboard/consulting',
      de: '/dashboard/consulting',
      fr: '/dashboard/consulting',
      it: '/dashboard/consulting',
      nl: '/dashboard/consulting',
      zh: '/dashboard/consulting',
      ar: '/dashboard/consulting',
      fa: '/dashboard/consulting',
      ps: '/dashboard/consulting',
    },

    '/dashboard/support': {
      en: '/dashboard/support',
      es: '/dashboard/support',
      de: '/dashboard/support',
      fr: '/dashboard/support',
      it: '/dashboard/support',
      nl: '/dashboard/support',
      zh: '/dashboard/support',
      ar: '/dashboard/support',
      fa: '/dashboard/support',
      ps: '/dashboard/support',
    },

    '/dashboard/notifications': {
      en: '/dashboard/notifications',
      es: '/dashboard/notifications',
      de: '/dashboard/notifications',
      fr: '/dashboard/notifications',
      it: '/dashboard/notifications',
      nl: '/dashboard/notifications',
      zh: '/dashboard/notifications',
      ar: '/dashboard/notifications',
      fa: '/dashboard/notifications',
      ps: '/dashboard/notifications',
    },
  },
});

export type Locale = (typeof routing.locales)[number];

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);