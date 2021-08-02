import { useContext } from 'react';
import { IPageContext, PageContext } from '../providers';

export function usePage() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error(`usePage must be used within a AppProvider`);
  }
  return (context ?? {}) as IPageContext;
}
