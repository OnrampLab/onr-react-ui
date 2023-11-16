import { ConfigProvider } from 'antd';
import React from 'react';
import { themeConfig as defaultTheme } from '../configs/theme';
import { getAntdThemeConfig } from '../lib/getAntdThemeConfig';

interface Props {
  children: JSX.Element;
}

export const AntdThemeProvider: React.FC<Props> = ({ children }) => {
  const theme = defaultTheme;
  const themeConfig = getAntdThemeConfig({ theme });

  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};
