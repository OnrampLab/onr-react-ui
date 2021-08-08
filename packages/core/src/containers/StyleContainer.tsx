import { useRoute } from '../hooks/useRoute';

interface Props {
  children: JSX.Element;
}

export const StyleContainer = (props: Props) => {
  const { children } = props;
  const { currentRoute } = useRoute();

  const { LayoutContainer } = currentRoute;

  if (LayoutContainer) {
    return <LayoutContainer>{children}</LayoutContainer>;
  }

  return children;
};
