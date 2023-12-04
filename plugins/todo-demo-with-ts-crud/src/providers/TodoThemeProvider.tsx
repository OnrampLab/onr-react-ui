import { PageProps, StyleLayoutContainer, ThemeConfig } from '@onr/core';
import { createSiteGlobalStyles } from '@onr/plugin-antd';
import { ThemeConfig as AntdThemeConfig, ConfigProvider } from 'antd';
import React from 'react';

export const TodoThemeProvider: React.FC<PageProps> = props => {
  const { children } = props;
  const themeConfig: ThemeConfig = {
    primaryColor: '#22B573',
    infoColor: '#22B573',
    successColor: '#52c41a',
    errorColor: '#ff4d4f',
    warningColor: '#faad14',
  };
  const antdTheme: AntdThemeConfig = {
    token: {
      colorPrimary: '#22B573',
      colorInfo: '#22B573',
      colorSuccess: '#52c41a',
      colorError: '#ff4d4f',
      colorWarning: '#faad14',
    },
  };
  const { GlobalStyles } = createSiteGlobalStyles(themeConfig);

  return (
    <StyleLayoutContainer GlobalStyles={GlobalStyles} theme={themeConfig}>
      <ConfigProvider theme={antdTheme}>
        <>{children}</>
      </ConfigProvider>
    </StyleLayoutContainer>
  );
};
