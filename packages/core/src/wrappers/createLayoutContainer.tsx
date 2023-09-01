import { StyleLayoutContainer } from '../containers';

export function createLayoutContainer(options: any) {
  const { theme } = options;

  return function MyLayoutContainer(props: any) {
    const { children } = props;

    return <StyleLayoutContainer theme={theme}>{children}</StyleLayoutContainer>;
  };
}
