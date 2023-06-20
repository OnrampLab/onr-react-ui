# Change Log

## 0.8.0

### Minor Changes

- Improve API error handling

### Patch Changes

- Updated dependencies
  - @onr/common@0.8.0
  - @onr/core@0.17.0

## 0.7.0

### Minor Changes

- Improve api error handling and upgrade typescript

### Patch Changes

- Updated dependencies
  - @onr/common@0.7.0
  - @onr/core@0.16.0

## 0.6.6

### Patch Changes

- Upgrade
- Updated dependencies
  - @onr/common@0.6.2
  - @onr/core@0.15.6

## 0.6.5

### Patch Changes

- Can show url for api error
  - @onr/core@0.15.4

## 0.6.4

### Patch Changes

- bump version

## 0.6.3

### Patch Changes

- Updated dependencies
  - @onr/core@0.15.0

## 0.6.2

### Patch Changes

- change tsconfig target to es5 and commonjs
- Updated dependencies
  - @onr/common@0.6.1
  - @onr/core@0.14.2

## 0.6.1

### Patch Changes

- do not package as esm module
- Updated dependencies
  - @onr/core@0.14.1

## 0.6.0

### Minor Changes

- Use turborepo, upgrade to next.js v13 and antd v5

### Patch Changes

- Updated dependencies
  - @onr/common@0.6.0
  - @onr/core@0.14.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

### [0.5.3](https://github.com/OnrampLab/onr-react-ui/compare/@onr/plugin-auth@0.5.2...@onr/plugin-auth@0.5.3) (2021-12-27)

### Bug Fixes

- fix export packages get error, update transpile with core and antd for treeshake ([5a9c9e5](https://github.com/OnrampLab/onr-react-ui/commit/5a9c9e5d2bce31ab8d53c0cacac731d2623ca7d2))
- **package/plugin:** [jest.config.js] change to .cjs to fix es module problem ([a602fed](https://github.com/OnrampLab/onr-react-ui/commit/a602fedf27e17c375a350dca520dafc721e8aa6e))

### [0.5.2](https://github.com/OnrampLab/onr-react-ui/compare/@onr/plugin-auth@0.5.1...@onr/plugin-auth@0.5.2) (2021-12-16)

### Bug Fixes

- **package:** mirage should not export in production build ([fde2abd](https://github.com/OnrampLab/onr-react-ui/commit/fde2abd50733e1cb91b259a1de62bfbd4f16899e))

### [0.5.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/plugin-auth@0.5.0...@onr/plugin-auth@0.5.1) (2021-09-16)

**Note:** Version bump only for package @onr/plugin-auth

## [0.5.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/plugin-auth@0.4.2...@onr/plugin-auth@0.5.0) (2021-08-25)

### Features

- **plugin/antd:** use new way to do auth and save token to cookie ([cdccabd](https://github.com/OnrampLab/onr-react-ui/commit/cdccabdf8c5fe86fc76f076d4063a536e484c936))

### [0.4.2](https://github.com/OnrampLab/onr-react-ui/compare/@onr/plugin-auth@0.4.1...@onr/plugin-auth@0.4.2) (2021-08-08)

**Note:** Version bump only for package @onr/plugin-auth

### [0.4.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/plugin-auth@0.4.0...@onr/plugin-auth@0.4.1) (2021-08-03)

**Note:** Version bump only for package @onr/plugin-auth

## 0.4.0 (2021-08-01)

### Features

- **plugin/auth:** create from auth package ([0e2cdb0](https://github.com/OnrampLab/onr-react-ui/commit/0e2cdb07cdcb7943440dfda7a5f01d0ce732d1fb))

### [0.3.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/auth@0.3.0...@onr/auth@0.3.1) (2021-08-01)

**Note:** Version bump only for package @onr/auth

## [0.3.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/auth@0.2.0...@onr/auth@0.3.0) (2021-07-31)

### Features

- **auth/service:** [AuthService] add new method in order to be compatible with next-auth ([40f0486](https://github.com/OnrampLab/onr-react-ui/commit/40f0486a4a8355e430a28fe060ca08262f58e303))
- **auth/service:** [AuthTokenService] new ([1c43f38](https://github.com/OnrampLab/onr-react-ui/commit/1c43f3857d5c23b491f010b29719484aac517160))
- **core/component:** [Signin] integrate with next-auth ([b6e08c9](https://github.com/OnrampLab/onr-react-ui/commit/b6e08c93ae4677b443fcc444288d0b9e54284721))

### Bug Fixes

- **auth/service:** [AuthService] could not get error message ([23acefd](https://github.com/OnrampLab/onr-react-ui/commit/23acefda5db6e722849f2d4b81ac66353eed40a8))

## [0.2.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/auth@0.1.1...@onr/auth@0.2.0) (2021-07-16)

### Features

- **auth:** export roleModel for mocking ([23777db](https://github.com/OnrampLab/onr-react-ui/commit/23777db51e44031cdfead6dbb96cc3b41e6c09c2))

### Bug Fixes

- ts erros ([eb39844](https://github.com/OnrampLab/onr-react-ui/commit/eb39844b5ad647ce889b15c63486b5540e16c4df))

### [0.1.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/auth@0.1.0...@onr/auth@0.1.1) (2021-07-16)

### Bug Fixes

- versions of onr packages ([49d7363](https://github.com/OnrampLab/onr-react-ui/commit/49d7363a7984c10e416a50cb8b67e19b880fccbb))

## 0.1.0 (2021-07-14)

### Features

- **module:** [auth] move to packages ([e985888](https://github.com/OnrampLab/onr-react-ui/commit/e985888a92957fdcb36fa089a704ccb0c73d6223))
