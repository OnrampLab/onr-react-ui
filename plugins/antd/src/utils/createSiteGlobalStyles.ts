import { generate } from '@ant-design/colors';
import { ThemeConfig } from '@onr/core';
import { createGlobalStyle } from 'styled-components';

export const createSiteGlobalStyles = (theme: ThemeConfig) => {
  const colors = generate(theme.primaryColor);
  const styleString = Object.keys(theme).reduce((prev, curr) => {
    return (
      prev +
      `
--brand-${curr}: ${theme[curr]};`
    );
  }, '');
  const GlobalStyles = createGlobalStyle`
:root {
  --brand-100: ${colors[0]};
  --brand-200: ${colors[1]};
  --brand-300: ${colors[2]};
  --brand-400: ${colors[3]};
  --brand-500: ${colors[4]};
  --brand-600: ${colors[5]};
  --brand-700: ${colors[6]};
  --brand-800: ${colors[7]};
  --brand-900: ${colors[8]};
  ${styleString}
}
`;

  return {
    GlobalStyles,
  };
};
