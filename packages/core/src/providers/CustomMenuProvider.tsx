import React from 'react';
import { useRoute } from './RouteProvider';

const Empty: React.FC<any> = ({ children }) => {
  return <>{children}</>;
};

export const CustomMenuProvider: React.FC<any> = ({ children }) => {
  const { currentRoute } = useRoute();
  const MenuProvider = currentRoute.CustomMenuProvider ?? Empty;

  return <MenuProvider>{children}</MenuProvider>;
};
