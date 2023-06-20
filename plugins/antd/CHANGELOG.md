# Change Log

## 0.11.0

### Minor Changes

- Improve API error handling

### Patch Changes

- Updated dependencies
  - @onr/common@0.8.0
  - @onr/core@0.17.0

## 0.10.0

### Minor Changes

- Improve api error handling and upgrade typescript

### Patch Changes

- Updated dependencies
  - @onr/common@0.7.0
  - @onr/core@0.16.0

## 0.9.4

### Patch Changes

- Upgrade
- Updated dependencies
  - @onr/common@0.6.2
  - @onr/core@0.15.6

## 0.9.3

### Patch Changes

- Fix failed to redirect after login successfully
- Updated dependencies
  - @onr/core@0.15.5

## 0.9.2

### Patch Changes

- Fix can not get form values in login page

## 0.9.1

### Patch Changes

- upgrade dependencies

## 0.9.0

### Minor Changes

- Show login error

## 0.8.3

### Patch Changes

- Bump version

## 0.8.2

### Patch Changes

- remove less package

## 0.8.1

### Patch Changes

- fix version
- Updated dependencies
  - @onr/core@0.15.1

## 0.8.0

### Minor Changes

- remove less style; refine antd styles

### Patch Changes

- Updated dependencies
  - @onr/core@0.15.0

## 0.7.2

### Patch Changes

- change tsconfig target to es5 and commonjs
- Updated dependencies
  - @onr/common@0.6.1
  - @onr/core@0.14.2

## 0.7.1

### Patch Changes

- do not package as esm module
- Updated dependencies
  - @onr/core@0.14.1

## 0.7.0

### Minor Changes

- Use turborepo, upgrade to next.js v13 and antd v5

### Patch Changes

- Updated dependencies
  - @onr/common@0.6.0
  - @onr/core@0.14.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

### [0.6.3](https://github.com/OnrampLab/onr-react-ui/compare/@onr/plugin-antd@0.6.2...@onr/plugin-antd@0.6.3) (2021-12-27)

### Bug Fixes

- fix export packages get error, update transpile with core and antd for treeshake ([5a9c9e5](https://github.com/OnrampLab/onr-react-ui/commit/5a9c9e5d2bce31ab8d53c0cacac731d2623ca7d2))
- **package/plugin:** [jest.config.js] change to .cjs to fix es module problem ([a602fed](https://github.com/OnrampLab/onr-react-ui/commit/a602fedf27e17c375a350dca520dafc721e8aa6e))

### [0.6.2](https://github.com/OnrampLab/onr-react-ui/compare/@onr/plugin-antd@0.6.1...@onr/plugin-antd@0.6.2) (2021-12-16)

### Bug Fixes

- **package:** tailwind and transpile module update ([ce2930e](https://github.com/OnrampLab/onr-react-ui/commit/ce2930e56c70104b8497eef830d9cc38ba1e110d))

### [0.6.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/plugin-antd@0.6.0...@onr/plugin-antd@0.6.1) (2021-09-16)

**Note:** Version bump only for package @onr/plugin-antd

## [0.6.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/plugin-antd@0.5.0...@onr/plugin-antd@0.6.0) (2021-08-25)

### Features

- **plugin/antd:** use new way to do auth and save token to cookie ([cdccabd](https://github.com/OnrampLab/onr-react-ui/commit/cdccabdf8c5fe86fc76f076d4063a536e484c936))

## [0.5.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/plugin-antd@0.4.0...@onr/plugin-antd@0.5.0) (2021-08-08)

### Features

- **component:** [Page] remove handling theme ([b5af6ff](https://github.com/OnrampLab/onr-react-ui/commit/b5af6ffa13383a5689d12b1ad354e9ee2c34a5a5))

### Bug Fixes

- **plugin-antd/component:** [SidebardMenu] eslint error ([d4431aa](https://github.com/OnrampLab/onr-react-ui/commit/d4431aa2d777590e1eb870aa069cd78a8ee90949))

## [0.4.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/plugin-antd@0.3.0...@onr/plugin-antd@0.4.0) (2021-08-03)

### Features

- **core:** rename PageContainer to RouteContainer ([865e8d8](https://github.com/OnrampLab/onr-react-ui/commit/865e8d8a7c97a516c5fc9819079ba0d638441ac2))
- **core/component:** [App] rename routes to menuItems ([b8e6a01](https://github.com/OnrampLab/onr-react-ui/commit/b8e6a013028b8cac098517a6caa15d96c4ed4bf0))
- **core/provider:** [RouteProvider] remove isNotDashboard; ([2421baa](https://github.com/OnrampLab/onr-react-ui/commit/2421baab7b8d43a3d24410f4a00290dd7ee85865))
- **starter:** use wildcard for layout path matching ([add3fbf](https://github.com/OnrampLab/onr-react-ui/commit/add3fbfe923692fb9e5528c836a3f92a9157ce2b))

## 0.3.0 (2021-08-01)

### Features

- **plugin:** [@onr/plugin-antd] move from @onr/core-antd ([e45e664](https://github.com/OnrampLab/onr-react-ui/commit/e45e664ec94357dc21feef026498d4e93c599334))

### [0.2.2](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core-antd@0.2.1...@onr/core-antd@0.2.2) (2021-08-01)

**Note:** Version bump only for package @onr/core-antd

### [0.2.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core-antd@0.2.0...@onr/core-antd@0.2.1) (2021-08-01)

**Note:** Version bump only for package @onr/core-antd

## [0.2.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core-antd@0.1.1...@onr/core-antd@0.2.0) (2021-07-31)

### Features

- **component:** add Loading pages ([39e0425](https://github.com/OnrampLab/onr-react-ui/commit/39e0425ab6aa6fe454512cd95b8c07652c9bc39c))
- **core-antd/component:** [Page] use useAuth hook to handle user ([89c01d4](https://github.com/OnrampLab/onr-react-ui/commit/89c01d45530912338459b8bfaf76f873dbfe0c38))
- **core-antd/component:** [SidebarMenu] use useAuth hook to get user ([136a4dc](https://github.com/OnrampLab/onr-react-ui/commit/136a4dc9d670c6e7eb8de0261bfe941cc0691192))

### [0.1.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core-antd@0.1.0...@onr/core-antd@0.1.1) (2021-07-18)

**Note:** Version bump only for package @onr/core-antd

## 0.1.0 (2021-07-16)

### Features

- **package/core-antd:** new ([bffd55c](https://github.com/OnrampLab/onr-react-ui/commit/bffd55c34ee2b66050e97e49c14c98e42ab7de9e))

### Bug Fixes

- versions of onr packages ([49d7363](https://github.com/OnrampLab/onr-react-ui/commit/49d7363a7984c10e416a50cb8b67e19b880fccbb))
