import { App } from '@onr/core';
import React from 'react';

export const HomeMainPage: React.FC = () => {
  const logger = App.getInstance().logger;

  logger.debug('Page loaded', {
    name: 'HomeMainPage',
  });

  return (
    <>
      <h1>Welcome to next-starter</h1>
    </>
  );
};
