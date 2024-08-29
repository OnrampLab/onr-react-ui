import { useAuth, useLogger } from '@onr/core';
import { OnrModalProps, useGlobalModal } from '@onr/plugin-antd';
import { Button } from 'antd';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useCallback, useEffect } from 'react';

export const HomeMainPage: React.FC = () => {
  const { showModal } = useGlobalModal();
  const logger = useLogger();
  const { user, cachedUser } = useAuth();
  const { update: updateSession } = useSession();

  const openModal = useCallback(
    (props?: Partial<OnrModalProps>) => {
      showModal({
        content: <div>This is a modal</div>,
        onOkClick() {
          console.log('Ok');
        },
        onCancelClick() {
          console.log('Cancel');
        },
        ...props,
      });
    },
    [showModal],
  );

  logger.debug('Page loaded', {
    name: 'HomeMainPage',
  });

  useEffect(() => {
    if (user && cachedUser && user.updated_at !== cachedUser.updated_at) {
      openModal({ content: <>Your Session Is Updated</> });
      updateSession({ user });
    }
  }, [user, cachedUser, openModal, updateSession]);

  return (
    <>
      <h1 className="text-blue-600">{user?.name ?? 'Guest'}, Welcome to next-starter</h1>
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
        Or test a <Button onClick={() => openModal()}>global modal</Button>
        <br />
        <Button onClick={() => openModal({ showFooter: true, width: 400 })}>
          custom modal with footer
        </Button>
        .
      </p>
    </>
  );
};
