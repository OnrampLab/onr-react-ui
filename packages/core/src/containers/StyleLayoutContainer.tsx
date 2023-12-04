import { ThemeProvider } from 'styled-components';

interface Props {
  children?: React.ReactNode;
  theme?: { [key: string]: any };
  GlobalStyles?: React.FC<any>;
}

export const StyleLayoutContainer = (props: Props) => {
  const { children, GlobalStyles, theme } = props;

  return (
    <>
      {GlobalStyles && <GlobalStyles />}
      {theme ? <ThemeProvider theme={theme}>{children}</ThemeProvider> : <>{children}</>}
    </>
  );
};
