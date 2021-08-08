import { AdminLayoutContainer } from '../containers';

export function createLayoutContainer(options: any) {
  const { GlobalStyles, themePromise } = options;

  return function MyLayoutContainer(props: any) {
    const { children } = props;

    return (
      <AdminLayoutContainer GlobalStyles={GlobalStyles} themePromise={themePromise}>
        {children}
      </AdminLayoutContainer>
    );
  };
}
