import minimatch from 'minimatch';
import { useRouter } from 'next/router';
import { createContext } from 'react';
import { useApp } from '../hooks';

export interface IPageContext {
  isNotDashboard: boolean;
}

export const PageContext = createContext<IPageContext | null>(null);

export const PageProvider = (props: any) => {
  const router = useRouter();
  const appConfig = useApp()?.getAppConfig();
  const fullPageRoutes = appConfig?.fullPageRoutes;

  const isNotDashboard =
    router && fullPageRoutes?.some((routeRule: string) => minimatch(router.pathname, routeRule));

  return <PageContext.Provider value={{ isNotDashboard }} {...props} />;
};
