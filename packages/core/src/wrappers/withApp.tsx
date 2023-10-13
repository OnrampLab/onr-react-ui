import { ComponentType, FC } from 'react';
import { OnrApp } from '../types';

export const withApp = (AppComponent: ComponentType, app: OnrApp) => {
  const WrappedComponent: FC = (props: any) => {
    return <AppComponent {...props} app={app} />;
  };

  return WrappedComponent;
};
