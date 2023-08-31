// TODO: should only do this on admin page
import { createSiteGlobalStyles } from '@onr/plugin-antd';
import { theme } from '../configs/theme';

const { GlobalStyles } = createSiteGlobalStyles(theme);

export { GlobalStyles };
