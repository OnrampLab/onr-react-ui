import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useRoute } from '../../../providers';
import { CoreStore } from '../../../redux';
import { PageProps } from '../../../types';
import { App } from '../../App';
import { Container } from './styles';

/* eslint-disable complexity */
export const Page: FC<PageProps> = props => {
  const app = App.getInstance();
  const { currentRoute } = useRoute();
  const LayoutComponent = app.getLayouts()[currentRoute.layout];

  const { boxed, weakColor } = useSelector((store: CoreStore) => store.coreStore);

  return (
    <Container className={`${weakColor ? 'weakColor' : ''} ${boxed ? 'boxed shadow-sm' : ''}`}>
      <LayoutComponent {...props} />
    </Container>
  );
};
