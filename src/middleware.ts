// middleware.ts
import authConfig from "@/auth.config";
import NextAuth from "next-auth";
import { DEFAULT_REDIRECT_PATH, publicRoutes, authRoutes, apiAuthPrefix } from "@/routes";

// Use only one of the two middleware options below
// 1. Use middleware directly
// export const { auth: middleware } = NextAuth(authConfig);

// 2. Wrapped middleware option
const { auth } = NextAuth(authConfig);

export default auth(async function middleware(req) {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // Ensure req.auth is set by NextAuth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  if(isPublicRoute){
    return;
  }
  // Allow access to API routes without redirecting to login
  if (isApiAuthRoute) {
    return;
  }

  // Handle routes that require authentication
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_REDIRECT_PATH, nextUrl));
    }
    return;
  }

  // Redirect to login if the user is not logged in and the route is not public
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl));
  }

  return;
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)', // Match all routes except static files and Next.js internal routes
    '/',
    '/(api|trpc)(.*)', // Ensure API routes are included in the matcher
  ],
};
