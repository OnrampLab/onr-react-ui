import React from 'react';
import { PageProps, RouteType } from '../types';

interface Props {
  children?: React.ReactNode;
  currentRoute: RouteType;
  defaultPageProps?: PageProps;
}

export const RouteDynamicInjectedProviders: React.FC<Props> = props => {
  const { currentRoute, children, defaultPageProps } = props;
  const { providers, pageProps: routePageProps } = currentRoute;
  const pageProps = { ...defaultPageProps, ...routePageProps };

  if (!providers) {
    return <>{children}</>;
  }

  // use [...providers] destruction to prevent providers props to be changed and will cause infinite loop
  return (
    <>
      {[...providers].reverse().reduce((prev, Curr) => {
        return <Curr {...pageProps}>{prev}</Curr>;
      }, children)}
    </>
  );
};
