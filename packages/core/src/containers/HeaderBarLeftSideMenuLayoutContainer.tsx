import { ThemeProvider } from 'styled-components';

export const HeaderBarLeftSideMenuLayoutContainer = (props: any) => {
  const { children, GlobalStyles, theme } = props;

  return (
    <>
      {GlobalStyles && <GlobalStyles />}

      {theme && <ThemeProvider theme={theme}>{children}</ThemeProvider>}
    </>
  );
};
