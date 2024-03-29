import { MenuOutlined } from '@ant-design/icons';
import { coreActions, CoreStore, Logo, PageProps } from '@onr/core';
import { Layout } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { UserMenu } from '..';
import { DashHeader } from './styles';

interface Props extends PageProps {
  showLogoForDsk?: boolean;
}

export const Header: React.FC<Props> = props => {
  const {
    HeaderMainSection,
    headerMainSection,
    avatar,
    logo,
    showLogoForDsk = true,
    mobileMenuToggle,
  } = props;
  const { mobile } = useSelector((store: CoreStore) => store.coreStore);
  const dispatch = useDispatch();

  return (
    <DashHeader>
      <Layout.Header className="header">
        {mobile && (
          <div className="relative flex-grow">
            {logo && <Logo mobile={mobile ? 1 : 0}>{logo}</Logo>}
            <div className="absolute top-0 left-0 flex items-center h-full">
              <div onClick={() => dispatch(coreActions.setMobileDrawer())}>
                {mobileMenuToggle ?? (
                  <MenuOutlined
                    rev=""
                    style={{ padding: '10px', color: 'var(--brand-primaryColor)' }}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {!mobile && (
          <>
            <div className="flex-none">
              {logo && showLogoForDsk && <Logo mobile={mobile ? 1 : 0}>{logo}</Logo>}
            </div>
            <div className="flex-grow">
              {headerMainSection}
              {HeaderMainSection && <HeaderMainSection />}
            </div>
            <div className="flex-none">
              <UserMenu avatar={avatar} />
            </div>
          </>
        )}
      </Layout.Header>
    </DashHeader>
  );
};
