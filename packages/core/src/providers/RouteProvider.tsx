import minimatch from 'minimatch';
import { useRouter } from 'next/router';
import { createContext } from 'react';
import { useApp } from '../hooks';

export interface IPageContext {
  currentPath: string;
  currentRoute: any;
}

export const RouteContext = createContext<IPageContext | null>(null);

export const RouteProvider = (props: any) => {
  const router = useRouter();
  const routes = useApp()?.getRoutes();

  const currentRoute = routes.find((route: any) => {
    return minimatch(router.pathname, route.path);
  });

  return (
    <RouteContext.Provider value={{ currentPath: router.pathname, currentRoute }} {...props} />
  );
};
