import minimatch from 'minimatch';
import { useRouter } from 'next/router';
import { createContext, useContext } from 'react';
import { useApp } from '../hooks';
import { RouteType } from '../types';

export interface IPageContext {
  currentPath: string;
  currentRoute: RouteType;
}

export const RouteContext = createContext<IPageContext | null>(null);

export const useRoute = () => {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error(`useRoute must be used within a AppProvider`);
  }
  return (context ?? {}) as IPageContext;
};

export const RouteProvider = (props: any) => {
  const router = useRouter();
  const routes = useApp()?.getRoutes();

  const currentRoute = routes?.find((route: any) => {
    return minimatch(router.pathname, route.path);
  });

  return (
    <RouteContext.Provider value={{ currentPath: router.pathname, currentRoute }} {...props} />
  );
};
