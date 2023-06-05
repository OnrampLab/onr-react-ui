import { createGlobalStyle } from 'styled-components';
import { Theme } from '../definitions';

export function createSiteGlobalStylesAndTheme(theme: Theme) {
  const GlobalStyles = createGlobalStyle`
  #nprogress .bar {
    background: ${theme.primaryColor};
  }
  #nprogress .peg {
    box-shadow: 0 0 10px ${theme.primaryColor}, 0 0 5px ${theme.primaryColor};
  }
  #nprogress .spinner-icon {
    border-top-color: ${theme.primaryColor};
    border-left-color: ${theme.primaryColor};
  }
`;

  return {
    GlobalStyles,
    theme,
  };
}
