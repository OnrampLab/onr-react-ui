// TODO: should only do this on admin page
import { createSiteGlobalStylesAndTheme } from '@onr/plugin-antd';
import { styleConfig } from '../configs/styleConfig';

const { GlobalStyles, theme } = createSiteGlobalStylesAndTheme(styleConfig);

export { GlobalStyles, theme };
