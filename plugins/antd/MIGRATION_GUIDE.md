# Migration Guide

## 0.23.0 -> 0.24.0

- [73d6b34f](https://github.com/OnrampLab/onr-react-ui/pull/158/commits/73d6b34fa301510778d48b1bc1e5be223e7b5088) Remove nprogress global style, please add nprogress styles in applications's styles. You could take [styles.css](https://github.com/OnrampLab/onr-react-ui/blob/main/examples/next-starter/apps/web/src/assets/styles.css) as reference
- [9921a860](https://github.com/OnrampLab/onr-react-ui/pull/158/commits/9921a86051a23299637059391db531c725ecbf77) Add root variables to createSiteGlobalStyles method, import this method instead of add custom styles
