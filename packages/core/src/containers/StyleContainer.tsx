import { ThemeProvider } from 'styled-components';

export const StyleLayoutContainer = (props: any) => {
  const { children, GlobalStyles, theme } = props;

  return (
    <>
      {GlobalStyles && <GlobalStyles />}

      {theme && <ThemeProvider theme={theme}>{children}</ThemeProvider>}
    </>
  );
};
