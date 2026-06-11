// proxy.ts

import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

export default intlMiddleware;

// =====================================================
// MATCHER CONFIG
// =====================================================
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes
     * - _next
     * - static files (favicon.ico, images, etc.)
     */
    "/((?!api|_next|.*\\..*).*)",
  ],
};