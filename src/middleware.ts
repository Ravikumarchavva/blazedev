// middleware.ts
import authConfig from "@/auth.middleware.config";
import NextAuth from "next-auth";
import {
  DEFAULT_REDIRECT_PATH,
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  adminRoutes,
} from "@/routes";

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
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutes);

  // Allow access to admin routes only if the user is an admin
  if (isLoggedIn) {
    if (isAdminRoute && req.auth?.user.role == "ADMIN") {
      return;
    }
  }
  if (isPublicRoute) {
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
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.searchParams) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return Response.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl),
    );
  }

  return;
});

export const config = {
  matcher: ["/admin", "/contact", "/profile"],
};
