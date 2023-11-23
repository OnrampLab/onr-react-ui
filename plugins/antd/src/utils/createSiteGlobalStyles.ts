import { generate } from '@ant-design/colors';
import { ThemeConfig } from '@onr/core';
import { createGlobalStyle } from 'styled-components';

const hexToRgb = (hex: string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}`
    : '';
};

export const createSiteGlobalStyles = (theme: ThemeConfig) => {
  const colors = generate(theme.primaryColor);
  const settings = Object.keys(theme).map(key => `--brand-${key}: ${theme[key]};`);
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
  --brand-100-rgb: ${hexToRgb(colors[0])};
  --brand-200-rgb: ${hexToRgb(colors[1])};
  --brand-300-rgb: ${hexToRgb(colors[2])};
  --brand-400-rgb: ${hexToRgb(colors[3])};
  --brand-500-rgb: ${hexToRgb(colors[4])};
  --brand-600-rgb: ${hexToRgb(colors[5])};
  --brand-700-rgb: ${hexToRgb(colors[6])};
  --brand-800-rgb: ${hexToRgb(colors[7])};
  --brand-900-rgb: ${hexToRgb(colors[8])};
  ${settings.join('')}
}
`;

  return {
    GlobalStyles,
  };
};
