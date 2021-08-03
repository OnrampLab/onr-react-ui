import minimatch from 'minimatch';
import { useRouter } from 'next/router';
import { createContext } from 'react';
import { useApp } from '../hooks';

export interface IPageContext {
  isNotDashboard: boolean;
  currentPath: string;
  currentRoute: any;
}

export const RouteContext = createContext<IPageContext | null>(null);

export const RouteProvider = (props: any) => {
  const router = useRouter();
  const appConfig = useApp()?.getAppConfig();
  const routes = useApp()?.getRoutes();
  const fullPageRoutes = appConfig?.fullPageRoutes;

  const isNotDashboard =
    router && fullPageRoutes?.some((routeRule: string) => minimatch(router.pathname, routeRule));

  const currentRoute = routes.find((route: any) => {
    return minimatch(router.pathname, route.path);
  });

  return (
    <RouteContext.Provider
      value={{ isNotDashboard, currentPath: router.pathname, currentRoute }}
      {...props}
    />
  );
};
