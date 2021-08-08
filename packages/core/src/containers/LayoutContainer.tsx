import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

export const AdminLayoutContainer = (props: any) => {
  const { children, GlobalStyles, themePromise } = props;
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    themePromise && themePromise.then((t: any) => setTheme(t));
  }, [themePromise]);

  return (
    <>
      {GlobalStyles && <GlobalStyles />}

      {theme && <ThemeProvider theme={theme}>{children}</ThemeProvider>}
    </>
  );
};
