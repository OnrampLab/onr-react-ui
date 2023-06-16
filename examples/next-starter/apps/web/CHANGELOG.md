# Change Log

## 0.6.4

### Patch Changes

- Upgrade dependencies
- Updated dependencies
  - @onr/plugin-custom-admin-dashboard@0.3.5

## 0.6.3

### Patch Changes

- Show login error
- Updated dependencies
  - @onr/plugin-antd@0.9.0
  - @onr/plugin-custom-admin-dashboard@0.3.4

## 0.6.2

### Patch Changes

- Bump version
- Updated dependencies
  - @onr/plugin-antd@0.8.3

## 0.6.1

### Patch Changes

- fix version
- Updated dependencies
  - @onr/core@0.15.1
  - @onr/plugin-antd@0.8.1

## 0.6.0

### Minor Changes

- remove less style; refine antd styles

### Patch Changes

- Updated dependencies
  - @onr/core@0.15.0
  - @onr/plugin-antd@0.8.0
  - @onr/plugin-custom-admin-dashboard@0.3.2
  - @onr/plugin-custom-home@0.3.2
  - @onr/plugin-account@0.6.3
  - @onr/plugin-auth@0.6.3
  - @onr/plugin-todo-demo-with-ts-rest-client@0.2.2
  - @onr/plugin-user@0.4.3

## 0.5.2

### Patch Changes

- change tsconfig target to es5 and commonjs
- Updated dependencies
  - @onr/plugin-custom-admin-dashboard@0.3.1
  - @onr/plugin-custom-home@0.3.1
  - @onr/core@0.14.2
  - @onr/logging@0.2.2
  - @onr/mock@1.0.1
  - @onr/plugin-account@0.6.2
  - @onr/plugin-antd@0.7.2
  - @onr/plugin-auth@0.6.2
  - @onr/plugin-todo-demo-with-ts-rest-client@0.2.1
  - @onr/plugin-user@0.4.2

## 0.5.1

### Patch Changes

- do not package as esm module
- Updated dependencies
  - @onr/core@0.14.1
  - @onr/logging@0.2.1
  - @onr/plugin-account@0.6.1
  - @onr/plugin-antd@0.7.1
  - @onr/plugin-auth@0.6.1
  - @onr/plugin-user@0.4.1

## 0.5.0

### Minor Changes

- Use turborepo, upgrade to next.js v13 and antd v5

### Patch Changes

- Updated dependencies
  - @onr/plugin-custom-admin-dashboard@0.3.0
  - @onr/plugin-custom-home@0.3.0
  - @onr/core@0.14.0
  - @onr/logging@0.2.0
  - @onr/mock@1.0.0
  - @onr/plugin-account@0.6.0
  - @onr/plugin-antd@0.7.0
  - @onr/plugin-auth@0.6.0
  - @onr/plugin-todo-demo-with-ts-rest-client@0.2.0
  - @onr/plugin-user@0.4.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.4.5](https://github.com/OnrampLab/onr-react-ui/compare/next-starter-app@0.4.4...next-starter-app@0.4.5) (2022-12-06)

**Note:** Version bump only for package next-starter-app

### [0.4.4](https://github.com/OnrampLab/onr-react-ui/compare/next-starter-app@0.4.3...next-starter-app@0.4.4) (2021-12-27)

### Bug Fixes

- fix export packages get error, update transpile with core and antd for treeshake ([5a9c9e5](https://github.com/OnrampLab/onr-react-ui/commit/5a9c9e5d2bce31ab8d53c0cacac731d2623ca7d2))

### [0.4.3](https://github.com/OnrampLab/onr-react-ui/compare/next-starter-app@0.4.2...next-starter-app@0.4.3) (2021-12-16)

**Note:** Version bump only for package next-starter-app

### [0.4.2](https://github.com/OnrampLab/onr-react-ui/compare/next-starter-app@0.4.1...next-starter-app@0.4.2) (2021-12-16)

### Bug Fixes

- **package:** mirage should not export in production build ([fde2abd](https://github.com/OnrampLab/onr-react-ui/commit/fde2abd50733e1cb91b259a1de62bfbd4f16899e))
- **package:** tailwind and transpile module update ([ce2930e](https://github.com/OnrampLab/onr-react-ui/commit/ce2930e56c70104b8497eef830d9cc38ba1e110d))

### [0.4.1](https://github.com/OnrampLab/onr-react-ui/compare/next-starter-app@0.4.0...next-starter-app@0.4.1) (2021-09-16)

**Note:** Version bump only for package next-starter-app

## [0.4.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter-app@0.3.0...next-starter-app@0.4.0) (2021-08-25)

### Features

- **core/helper:** [env] new ([d19ab2c](https://github.com/OnrampLab/onr-react-ui/commit/d19ab2c7a1eac100ed1376e36a5106df5ed35e85))
- **starter:** use new way to do auth and services ([4cb2f65](https://github.com/OnrampLab/onr-react-ui/commit/4cb2f65cf7d4c61466aadf4c902cb4ca66e66cd3))

## [0.3.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter-app@0.2.1...next-starter-app@0.3.0) (2021-08-08)

### Features

- **component:** [Page] remove handling theme ([b5af6ff](https://github.com/OnrampLab/onr-react-ui/commit/b5af6ffa13383a5689d12b1ad354e9ee2c34a5a5))
- **starter/component:** [LoadingPage] new ([208acde](https://github.com/OnrampLab/onr-react-ui/commit/208acde84f8dc4279ae5e3efba582c232023615e))
- **starter/component:** [MyApp] remove global style and antd components to reduce bundle size ([f8fe069](https://github.com/OnrampLab/onr-react-ui/commit/f8fe069b1cfc7b06362fd4c4bce84cce769d5f78))

### Bug Fixes

- **plugin-antd/component:** [SidebardMenu] eslint error ([d4431aa](https://github.com/OnrampLab/onr-react-ui/commit/d4431aa2d777590e1eb870aa069cd78a8ee90949))

### [0.2.1](https://github.com/OnrampLab/onr-react-ui/compare/next-starter-app@0.2.0...next-starter-app@0.2.1) (2021-08-05)

**Note:** Version bump only for package next-starter-app

## [0.2.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter-app@0.1.0...next-starter-app@0.2.0) (2021-08-03)

### Features

- **core:** rename PageContainer to RouteContainer ([865e8d8](https://github.com/OnrampLab/onr-react-ui/commit/865e8d8a7c97a516c5fc9819079ba0d638441ac2))
- **core/component:** [App] rename routes to menuItems ([b8e6a01](https://github.com/OnrampLab/onr-react-ui/commit/b8e6a013028b8cac098517a6caa15d96c4ed4bf0))
- **core/provider:** [RouteProvider] remove isNotDashboard; ([2421baa](https://github.com/OnrampLab/onr-react-ui/commit/2421baab7b8d43a3d24410f4a00290dd7ee85865))
- **starter:** can define routes and apply layout on different routes ([1f85063](https://github.com/OnrampLab/onr-react-ui/commit/1f850630434690292621141a3908b4bfa9afa98d))
- **starter:** use wildcard for layout path matching ([add3fbf](https://github.com/OnrampLab/onr-react-ui/commit/add3fbfe923692fb9e5528c836a3f92a9157ce2b))
- **starter/page:** [admin] new ([3a9b803](https://github.com/OnrampLab/onr-react-ui/commit/3a9b803e639b54c71bdaf4411710c9bb2cd95ff7))
- **starter/plugin:** [admin-dashboard] new ([3642672](https://github.com/OnrampLab/onr-react-ui/commit/3642672075a464fb1a8b416cd14c54f594c67198))

## 0.1.0 (2021-08-01)

### Features

- **starter/package:** [app] extract from starter ([3380b8e](https://github.com/OnrampLab/onr-react-ui/commit/3380b8e76935b459f4554d059fdb8c0bde78dcee))
