// TODO: should only do this on admin page
import { createSiteGlobalStyles } from '@onr/plugin-antd';
import { themeConfig } from '../configs/theme';

const { GlobalStyles } = createSiteGlobalStyles(themeConfig);

export { GlobalStyles };
