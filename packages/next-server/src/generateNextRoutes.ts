import nextRouteFactory from 'next-routes';
import { RouteItem } from './definitions';

export function generateNextRoutes(routes: RouteItem[]) {
  // @ts-ignore
  const nextRoutes = nextRouteFactory();

  routes.forEach(route => nextRoutes.add(route.from, route.to));

  return nextRoutes;
}
