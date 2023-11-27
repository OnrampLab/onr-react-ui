import { coreActions, CoreStore, Logo, PageProps } from '@onr/core';
import { Layout } from 'antd';
import Link from 'next/link';
import { FiBarChart } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { UserMenu } from '..';
import { DashHeader } from './styles';

interface Props extends PageProps {
  showLogoForDsk?: boolean;
}

export const Header: React.FC<Props> = props => {
  const { HeaderMainSection, avatar, logo, showLogoForDsk = true } = props;
  const { mobile } = useSelector((store: CoreStore) => store.coreStore);
  const dispatch = useDispatch();

  return (
    <DashHeader>
      <Layout.Header className="header">
        {mobile && (
          <div className="relative flex-grow">
            {logo && (
              <Logo mobile={mobile}>
                <Link href="/">{logo}</Link>
              </Logo>
            )}
            <div className="absolute top-0 left-0 flex items-center h-full">
              <div onClick={() => dispatch(coreActions.setMobileDrawer())} className="trigger">
                <FiBarChart size={20} strokeWidth={1} />
              </div>
            </div>
          </div>
        )}

        {!mobile && (
          <>
            <div className="flex-none">
              {logo && showLogoForDsk && (
                <Logo mobile={mobile}>
                  <Link href="/">{logo}</Link>
                </Logo>
              )}
            </div>
            <div className="flex-grow">{HeaderMainSection && <HeaderMainSection />}</div>
            <div className="flex-none">
              <UserMenu avatar={avatar} />
            </div>
          </>
        )}
      </Layout.Header>
    </DashHeader>
  );
};
