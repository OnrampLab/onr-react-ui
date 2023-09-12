import { Container, CoreStore, PageProps, useRoute } from '@onr/core';
import { ComponentType, FC } from 'react';
import { useSelector } from 'react-redux';
import { FullPageLayout } from './FullPageLayout';
import { HeaderBarLeftSideMenuLayout } from './HeaderBarLeftSideMenuLayout';

const layouts: Record<string, ComponentType<PageProps>> = {
  'full-page': FullPageLayout,
  'header-bar-left-side-menu': HeaderBarLeftSideMenuLayout,
};

export const Page: FC<PageProps> = props => {
  const { currentRoute } = useRoute();
  const LayoutComponent = layouts[currentRoute.layout];

  const { boxed, weakColor } = useSelector((store: CoreStore) => store.coreStore);

  return (
    <Container className={`${weakColor ? 'weakColor' : ''} ${boxed ? 'boxed shadow-sm' : ''}`}>
      <LayoutComponent {...props} />
    </Container>
  );
};
