import React from 'react';
import { useSelector } from 'react-redux';
import { RouteDynamicInjectedProviders, useRoute } from '../../../providers';
import { CoreStore } from '../../../redux';
import { PageProps } from '../../../types';
import { App } from '../../App';
import { Container } from './styles';

export const Page: React.FC<PageProps> = props => {
  const app = App.getInstance();
  const { children, ...defaultPageProps } = props;
  const { currentRoute } = useRoute();
  const { boxed, weakColor } = useSelector((store: CoreStore) => store.coreStore);
  const LayoutComponent = app.getLayouts()[currentRoute.layout];
  const pageProps = { ...defaultPageProps, ...currentRoute.pageProps };

  return (
    <RouteDynamicInjectedProviders currentRoute={currentRoute} defaultPageProps={defaultPageProps}>
      <Container className={`${weakColor ? 'weakColor' : ''} ${boxed ? 'boxed shadow-sm' : ''}`}>
        <LayoutComponent {...pageProps}>{children}</LayoutComponent>
      </Container>
    </RouteDynamicInjectedProviders>
  );
};
