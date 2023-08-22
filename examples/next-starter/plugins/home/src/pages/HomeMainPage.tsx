import { useGlobalModal, useLogger } from '@onr/core';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';

export const HomeMainPage: React.FC = () => {
  const { showModal } = useGlobalModal();
  const logger = useLogger();

  const openModal = () => {
    showModal({
      content: <div>This is a modal</div>,
    });
  };

  logger.debug('Page loaded', {
    name: 'HomeMainPage',
  });

  return (
    <>
      <h1>Welcome to next-starter</h1>
      <p>
        You can check out <Link href="/todos">Todos</Link>.
      </p>
      <p>
        Or go to <Link href="/admin">Admin page</Link>.
      </p>
      <p>
        Or test a{' '}
        <Button onClick={openModal} type="primary">
          global modal
        </Button>
        .
      </p>
    </>
  );
};
