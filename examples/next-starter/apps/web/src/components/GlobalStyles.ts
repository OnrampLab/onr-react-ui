import paletteLess from '!!raw-loader!../assets/antd-custom.less';
// TODO: should only do this on admin page
import { createSiteGlobalStylesAndTheme } from '@onr/plugin-antd';

const { GlobalStyles, theme } = createSiteGlobalStylesAndTheme(paletteLess);

export { GlobalStyles, theme };
