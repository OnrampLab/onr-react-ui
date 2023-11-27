import { coreActions, CoreStore, Logo } from '@onr/core';
import { Layout } from 'antd';
import Link from 'next/link';
import { ComponentType, FC, ReactNode } from 'react';
import { FiBarChart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { UserMenu } from '../../components';
import { DashHeader } from './styles';

interface Props {
  HeaderMainSection?: ComponentType;
  logo?: ReactNode;
  avatar?: string;
}

export const Header: FC<Props> = props => {
  const { HeaderMainSection, avatar, logo } = props;
  const { mobile } = useSelector((store: CoreStore) => store.coreStore);
  const dispatch = useDispatch();

  return (
    <DashHeader>
      <Layout.Header className="header">
        {mobile && (
          <div className="flex-none">
            <div onClick={() => dispatch(coreActions.setMobileDrawer())} className="trigger">
              <FiBarChart size={20} strokeWidth={1} />
            </div>
          </div>
        )}

        {logo && (
          <div className="flex-none">
            <Logo mobile={mobile}>
              <Link href="/">{logo}</Link>
            </Logo>
          </div>
        )}

        <div className="flex-grow">{HeaderMainSection && <HeaderMainSection />}</div>

        <div className="flex-none">
          <UserMenu avatar={avatar} />
        </div>
      </Layout.Header>
    </DashHeader>
  );
};
