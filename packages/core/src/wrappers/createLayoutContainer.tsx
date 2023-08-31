import { HeaderBarLeftSideMenuLayoutContainer } from '../containers';

export function createLayoutContainer(options: any) {
  const { theme } = options;

  return function MyLayoutContainer(props: any) {
    const { children } = props;

    return (
      <HeaderBarLeftSideMenuLayoutContainer theme={theme}>
        {children}
      </HeaderBarLeftSideMenuLayoutContainer>
    );
  };
}
