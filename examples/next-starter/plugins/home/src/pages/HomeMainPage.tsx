import { useLogger } from '@onr/core';
import { useGlobalModal } from '@onr/plugin-antd';
import { Button } from 'antd';
import Link from 'next/link';
import React from 'react';

export const HomeMainPage: React.FC = () => {
  const { showModal } = useGlobalModal();
  const logger = useLogger();

  const openModal = () => {
    showModal({
      content: <div>This is a modal</div>,
      onOkClick() {
        console.log('Ok');
      },
      onCancelClick() {
        console.log('Cancel');
      },
    });
  };

  logger.debug('Page loaded', {
    name: 'HomeMainPage',
  });

  return (
    <>
      <h1 className="text-blue-600">Welcome to next-starter</h1>
      <p>
        You can check out
        <br />
        <Link href="/todos">Todos (header-bar-left-side-menu layout)</Link>
        <br />
        <Link href="/todos-left-side-menu">Todos (left-side-menu-top-header layout)</Link>
        <br />
        <Link href="/todos-custom-menu">Todos (custom menu)</Link>.
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
