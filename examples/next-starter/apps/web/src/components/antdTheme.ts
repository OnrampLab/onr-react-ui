import { ThemeConfig } from 'antd';
import { themeConfig } from '../configs/theme';

// Default seed is https://github.com/ant-design/ant-design/blob/master/components/theme/themes/seed.ts

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: themeConfig.primaryColor,
    colorInfo: themeConfig.infoColor,
    colorSuccess: themeConfig.successColor,
    colorError: themeConfig.errorColor,
    colorWarning: themeConfig.warningColor,
  },
};
