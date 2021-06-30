import paletteLess from '!!raw-loader!../../assets/antd-custom.less';
import { createGlobalStyle } from 'styled-components';
import { getAntdVariables } from '../../lib/getAntdVariables';

const theme = getAntdVariables(paletteLess);

const GlobalStyles = createGlobalStyle`
  *, *:before, *:after {
    box-sizing: inherit;
  }

  #__next > .ant-spin-nested-loading > .ant-spin-blur:after {
    opacity: .8;
  }

  html {
    box-sizing: border-box;
    font-size: 14px;
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  body {
    background-color: ${theme.backgroundColor};
    -ms-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering:optimizeLegibility;
  }

  #nprogress .bar {
    background: ${theme.primaryColor};
  }
  #nprogress .peg {
    box-shadow: 0 0 10px ${theme.primaryColor}, 0 0 5px ${theme.primaryColor};
  }
  #nprogress .spinner-icon {
    border-top-color: ${theme.primaryColor};
    border-left-color: ${theme.primaryColor};
  }

  .weakColor{
    -webkit-filter:invert(80%);
    filter:invert(80%)
  }

  .weakColor img {
    -webkit-filter:invert(100%);
    filter:invert(100%)
  }

  a:hover {
    text-decoration: none;
  }

  svg {
    overflow: hidden;
    vertical-align: middle;
  }
  .brand {
    display: flex;
    align-items: center;
    margin-right: 1rem;
    font-size: 1.25rem;
    white-space: nowrap;
    color: ${theme.primaryColor};
    justify-content: center;
  }
  .brand > svg {
    fill: ${theme.primaryColor};
  }
  .anticon {
    vertical-align: middle
  }

  b, strong {
    font-weight: 600;
  }

  h1, h2, h3, h4, h5, h6,
  .h1, .h2, .h3, .h4, .h5, .h6 {
    margin-bottom: 0.5rem;
    font-family: inherit;
    font-weight: 400;
    line-height: 1.2;
  }

  h1, .h1 {
    font-size: 2.5rem;
  }

  h2, .h2 {
    font-size: 2rem;
  }

  h3, .h3 {
    font-size: 1.75rem;
  }

  h4, .h4 {
    font-size: 1.5rem;
  }

  h5, .h5 {
    font-size: 1.25rem;
  }

  h6, .h6 {
    font-size: 1rem;
  }
`;

export { GlobalStyles, theme };
