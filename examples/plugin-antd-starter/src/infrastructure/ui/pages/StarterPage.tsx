import { useLogger } from '@onr/core';
import React from 'react';

export const StarterPage: React.FC = () => {
  const logger = useLogger();

  logger.debug('Page loaded', {
    name: 'StarterPage',
  });

  return (
    <>
      <h1>Welcome to plugin-starter</h1>
    </>
  );
};
