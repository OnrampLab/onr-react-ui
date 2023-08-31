import { ThemeConfig } from 'antd';
import { theme } from '../configs/theme';

// Default seed is https://github.com/ant-design/ant-design/blob/master/components/theme/themes/seed.ts

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: theme.primaryColor,
    colorInfo: theme.infoColor,
    colorSuccess: theme.successColor,
    colorError: theme.errorColor,
    colorWarning: theme.warningColor,
  },
};
