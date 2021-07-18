import paletteLess from '!!raw-loader!../../assets/antd-custom.less';
import { createSiteGlobalStylesAndTheme } from '@onr/core-antd';

const { GlobalStyles, theme } = createSiteGlobalStylesAndTheme(paletteLess);

export { GlobalStyles, theme };
