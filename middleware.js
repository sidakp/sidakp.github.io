import { get } from '@vercel/edge-config';
import { next, rewrite } from '@vercel/functions';

export const config = {
  matcher: [
    '/((?!api|maintenance\\.html|favicon\\.svg|.*\\.(?:css|js|mjs|map|json|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|otf|eot|txt|xml)$).*)'
  ]
};

export default async function middleware(request) {
  try {
    const isInMaintenanceMode = await get('isInMaintenanceMode');

    if (isInMaintenanceMode === true) {
      const maintenanceUrl = new URL('/maintenance.html', request.url);
      const response = rewrite(maintenanceUrl);
      response.headers.set('x-robots-tag', 'noindex, nofollow');
      response.headers.set('x-maintenance-mode', '1');
      return response;
    }
  } catch (error) {
    // Fail open so the site stays available if Edge Config is not connected.
  }

  return next();
}
