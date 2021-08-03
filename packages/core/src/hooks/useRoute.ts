import { useContext } from 'react';
import { IPageContext, RouteContext } from '../providers';

export function useRoute() {
  const context = useContext(RouteContext);
  if (context === undefined) {
    throw new Error(`usePage must be used within a AppProvider`);
  }
  return (context ?? {}) as IPageContext;
}
