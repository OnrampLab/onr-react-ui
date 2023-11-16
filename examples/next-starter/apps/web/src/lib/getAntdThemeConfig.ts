import { ThemeConfig } from '@onr/core';
import { ThemeConfig as AntdThemeConfig } from 'antd';
import { themeConfig as defaultTheme } from '../configs/theme';

interface Props {
  theme?: ThemeConfig;
}

export const getAntdThemeConfig = (props: Props) => {
  const { theme = defaultTheme } = props;

  // Default seed is https://github.com/ant-design/ant-design/blob/master/components/theme/themes/seed.ts
  const antdTheme: AntdThemeConfig = {
    token: {
      colorPrimary: theme.primaryColor,
      colorInfo: theme.infoColor,
      colorSuccess: theme.successColor,
      colorError: theme.errorColor,
      colorWarning: theme.warningColor,
    },
  };

  return antdTheme;
};
