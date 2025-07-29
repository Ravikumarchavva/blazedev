/**these routes do not require authenthication**/
export const publicRoutes = ["/", "/new-verification"];

export const apiAuthPrefix = "/api";

/**these routes require authenthication**/
export const authRoutes = [
  "/login",
  "/signUp",
  "/error",
  "/reset",
  "/new-password",
];

/**after login redirect */
export const DEFAULT_REDIRECT_PATH = "/";

/**these routes require admin authenthication**/

export const adminRoutes = "/admin";
