import { OnrApp } from '@onr/core';
import React, { ComponentType, FC } from 'react';

export const withApp = (AppComponent: ComponentType, app: OnrApp) => {
  const WrappedComponent: FC = (props: any) => {
    return <AppComponent {...props} app={app} />;
  };

  return WrappedComponent;
};
