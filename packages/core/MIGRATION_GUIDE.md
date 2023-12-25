# Migration Guide

## 0.40.0 -> 0.41.0

- [af46a06](https://github.com/OnrampLab/onr-react-ui/pull/175/commits/af46a06217243015da684619be764f476fc26319) mark `HeaderMainSection: React.FC<any>` as deprecated props of `PageProps`, should pass instance `headerMainSection: ReactNode` instead

## 0.35.0 -> 0.36.0

- [540cf0fb](https://github.com/OnrampLab/onr-react-ui/pull/162/commits/540cf0fbb83bd9d96bae97316f9823525d5ef7d2) RouteType no longer support CustomMenuProvider props, use `providers: [CustomMenuProvider]` to inject dependency instead
