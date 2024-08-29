import { FC, PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';

interface Props {
  theme?: { [key: string]: any };
  GlobalStyles?: React.FC<any>;
}

export const StyleLayoutContainer: FC<PropsWithChildren<Props>> = props => {
  const { children, GlobalStyles, theme } = props;

  return (
    <>
      {GlobalStyles && <GlobalStyles />}
      {theme ? <ThemeProvider theme={theme}>{children}</ThemeProvider> : children}
    </>
  );
};
