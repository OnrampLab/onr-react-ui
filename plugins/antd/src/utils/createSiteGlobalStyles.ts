import { ThemeConfig } from '@onr/core';
import { createGlobalStyle } from 'styled-components';

export function createSiteGlobalStyles(theme: ThemeConfig) {
  const GlobalStyles = createGlobalStyle`
`;

  return {
    GlobalStyles,
  };
}
