/**these routes do not require authenthication**/
export const publicRoutes = ['/'];

export const apiAuthPrefix = "/api";

/**these routes require authenthication**/
export const authRoutes = ['/login','/signUp'] ;


/**after login redirect */
export const DEFAULT_REDIRECT_PATH = '/profile';


/**these routes require admin authenthication**/

export const adminRoutes = '/api/admin';

