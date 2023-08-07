import { App } from '@onr/core';
import Link from 'next/link';
import React from 'react';

export const HomeMainPage: React.FC = () => {
  const logger = App.getInstance().logger;

  logger.debug('Page loaded', {
    name: 'HomeMainPage',
  });

  return (
    <>
      <h1>Welcome to next-starter</h1>
      <div>
        You can check out <Link href="/todos">Todos</Link>
      </div>
    </>
  );
};
