/**these routes do not require authenthication**/
export const publicRoutes = ['/'];

/**these routes require authenthication**/
export const authRoutes = ['/auth/login','/auth/signUp'] ;

/**these routes dont require user authenthication**/

export const apiAuthPrefix = "/api/auth";

/**after login redirect */
export const DEFAULT_REDIRECT_PATH = '/profile';


/**these routes require admin authenthication**/

export const adminRoutes = '/api/admin';

