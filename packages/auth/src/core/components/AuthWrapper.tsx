import { Spin } from 'antd';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth, useAuthEffect } from '../hooks/useAuth';
import { getCurrentUser } from '../redux/actions';

interface Props {
  children: ReactNode;
}

export const AuthWrapper: React.FC<Props> = ({ children }: Props) => {
  const dispatch = useDispatch();
  const { isAuthroized, isResolved } = useAuth();

  useAuthEffect();

  useEffect(() => {
    if (isAuthroized) dispatch(getCurrentUser());
  }, [dispatch, isAuthroized]);

  if (!isResolved) {
    return (
      <Spin>
        <div style={{ height: '100vh', width: '100vw' }} />
      </Spin>
    );
  }
  return <>{children}</>;
};
