import { ComponentType } from 'react';
import { ThemeProvider } from 'styled-components';

interface Props {
  theme?: { [key: string]: any };
  GlobalStyles: ComponentType<any>;
}

export const createLayoutContainer = (params: Props) => {
  const { GlobalStyles, theme } = params;

  const MyLayoutContainer: React.FC<Props> = ({ children }) => {
    return (
      <>
        {GlobalStyles && <GlobalStyles />}
        {theme && <ThemeProvider theme={theme}>{children}</ThemeProvider>}
      </>
    );
  };

  return MyLayoutContainer;
};
