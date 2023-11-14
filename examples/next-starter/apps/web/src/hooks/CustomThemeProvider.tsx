import { generate } from '@ant-design/colors';
import { ConfigProvider } from 'antd';
import React from 'react';
import { themeConfig as defaultTheme } from '../configs/theme';
import { getAntdThemeConfig } from '../lib/getAntdThemeConfig';

interface Props {
  children: JSX.Element;
}

export const CustomThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = defaultTheme;
  const themeConfig = getAntdThemeConfig({ theme });
  const colors = generate(theme.primaryColor);

  return (
    <ConfigProvider theme={themeConfig}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              --custom-primary: ${theme.primaryColor};
              --custom-infoColor: ${theme.infoColor};
              --custom-successColor: ${theme.successColor};
              --custom-errorColor: ${theme.errorColor};
              --custom-warningColor: ${theme.warningColor};
              --brand-100: ${colors[0]};
              --brand-200: ${colors[1]};
              --brand-300: ${colors[2]};
              --brand-400: ${colors[3]};
              --brand-500: ${colors[4]};
              --brand-600: ${colors[5]};
              --brand-700: ${colors[6]};
              --brand-800: ${colors[7]};
              --brand-900: ${colors[8]};
            }
          `,
        }}
      />
      {children}
    </ConfigProvider>
  );
};
