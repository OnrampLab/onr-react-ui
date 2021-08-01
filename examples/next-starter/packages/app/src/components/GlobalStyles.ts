import paletteLess from '!!raw-loader!../assets/antd-custom.less';
import { createSiteGlobalStylesAndTheme } from '@onr/plugin-antd';

const { GlobalStyles, theme } = createSiteGlobalStylesAndTheme(paletteLess);

export { GlobalStyles, theme };
