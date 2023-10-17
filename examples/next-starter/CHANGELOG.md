# Change Log

## 0.35.8

### Patch Changes

- coreReducer use lodash

## 0.35.7

### Patch Changes

- Use lodash

## 0.35.6

### Patch Changes

- chore(core): support plugin store

## 0.35.5

### Patch Changes

- Revert sync way to bootstrap plugin

## 0.35.4

### Patch Changes

- Use sync way to bootstrap plugin

## 0.35.3

### Patch Changes

- Support plugin architecture

## 0.35.2

### Patch Changes

- upgrade antd to v5.10.0

## 0.35.1

### Patch Changes

- Core package support theme and auth role config

## 0.35.0

### Minor Changes

- Add auth config

## 0.34.1

### Patch Changes

- Upgrade styled-component

## 0.34.0

### Minor Changes

- Add onOkClick and onCancelClick to GlobalModalProvider

## 0.33.0

### Minor Changes

- Support registering layouts

## 0.32.0

### Minor Changes

- Improve layout and theme

## 0.31.0

### Minor Changes

- Can do better customization for logo

## 0.30.0

### Minor Changes

- Can customize logo and avatar

## 0.29.4

### Patch Changes

- Upgrade axios to v1.5

## 0.29.3

### Patch Changes

- User can do pagination and sorting on user and account list page

## 0.29.2

### Patch Changes

- Set global modal destroy on close

## 0.29.1

### Patch Changes

- Imrove app architecture

## 0.29.0

### Minor Changes

- simplify App architecture and provider better customization

## 0.28.0

### Minor Changes

- add new hooks: useGlobalModal, useLogger

## 0.27.0

### Minor Changes

- Add use case

## 0.26.2

### Patch Changes

- Improve type hinting

## 0.26.1

### Patch Changes

- Improve type hinting

## 0.26.0

### Minor Changes

- Add recent todos into menu bar

## 0.25.0

### Minor Changes

- Improve sidebar; Add recent todos

## 0.24.10

### Patch Changes

- @onr/ts-rest-client support nested query string

## 0.24.9

### Patch Changes

- Bump version

## 0.24.8

### Patch Changes

- Improve @onr/ts-rest-client

## 0.24.7

### Patch Changes

- Improve @onr/cloud-stream

## 0.24.6

### Patch Changes

- Fix ts-rest-client test

## 0.24.5

### Patch Changes

- Fix ts-rest-client

## 0.24.4

### Patch Changes

- Upgrade axios

## 0.24.3

### Patch Changes

- Upgrade axios version

## 0.24.2

### Patch Changes

- ts-rest-client's ResourceClient does not extend BasicClient

## 0.24.1

### Patch Changes

- Improve logging

## 0.24.0

### Minor Changes

- Improve API error handling

## 0.23.0

### Minor Changes

- Improve api error handling and upgrade typescript

## 0.22.4

### Patch Changes

- Show login error

## 0.22.3

### Patch Changes

- Show error logs for login and refresh access token

## 0.22.2

### Patch Changes

- change tsconfig target to es5 and commonjs
- Updated dependencies
  - next-starter-app@0.5.2

## 0.22.1

### Patch Changes

- do not package as esm module
- Updated dependencies
  - next-starter-app@0.5.1

## 0.22.0

### Minor Changes

- Use turborepo, upgrade to next.js v13 and antd v5

### Patch Changes

- Updated dependencies
  - next-starter-app@0.5.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.21.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.20.4...next-starter@0.21.0) (2022-12-06)

### Features

- [@onr/commitlint-config] add new package ([7fc1855](https://github.com/OnrampLab/onr-react-ui/commit/7fc1855cbc5a1d6dd1e6eed4265d703b9f3e8f82))

### [0.20.4](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.20.3...next-starter@0.20.4) (2021-12-27)

### Bug Fixes

- fix export packages get error, update transpile with core and antd for treeshake ([5a9c9e5](https://github.com/OnrampLab/onr-react-ui/commit/5a9c9e5d2bce31ab8d53c0cacac731d2623ca7d2))

### [0.20.3](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.20.2...next-starter@0.20.3) (2021-12-16)

**Note:** Version bump only for package next-starter

### [0.20.2](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.20.1...next-starter@0.20.2) (2021-12-16)

### Bug Fixes

- **package:** mirage should not export in production build ([fde2abd](https://github.com/OnrampLab/onr-react-ui/commit/fde2abd50733e1cb91b259a1de62bfbd4f16899e))
- **package:** tailwind and transpile module update ([ce2930e](https://github.com/OnrampLab/onr-react-ui/commit/ce2930e56c70104b8497eef830d9cc38ba1e110d))

### [0.20.1](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.20.0...next-starter@0.20.1) (2021-09-16)

**Note:** Version bump only for package next-starter

## [0.20.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.19.0...next-starter@0.20.0) (2021-08-25)

### Features

- **core/helper:** [env] new ([d19ab2c](https://github.com/OnrampLab/onr-react-ui/commit/d19ab2c7a1eac100ed1376e36a5106df5ed35e85))
- **plugin-home/component:** [HomeMainPage] add log example ([1b92f7f](https://github.com/OnrampLab/onr-react-ui/commit/1b92f7f9d652a88cee7d2d2aff29aa07ca8cfb15))
- **starter:** use new way to do auth and services ([4cb2f65](https://github.com/OnrampLab/onr-react-ui/commit/4cb2f65cf7d4c61466aadf4c902cb4ca66e66cd3))

## [0.19.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.18.1...next-starter@0.19.0) (2021-08-08)

### Features

- **component:** [Page] remove handling theme ([b5af6ff](https://github.com/OnrampLab/onr-react-ui/commit/b5af6ffa13383a5689d12b1ad354e9ee2c34a5a5))
- **starter/component:** [LoadingPage] new ([208acde](https://github.com/OnrampLab/onr-react-ui/commit/208acde84f8dc4279ae5e3efba582c232023615e))
- **starter/component:** [MyApp] remove global style and antd components to reduce bundle size ([f8fe069](https://github.com/OnrampLab/onr-react-ui/commit/f8fe069b1cfc7b06362fd4c4bce84cce769d5f78))

### Bug Fixes

- **plugin-antd/component:** [SidebardMenu] eslint error ([d4431aa](https://github.com/OnrampLab/onr-react-ui/commit/d4431aa2d777590e1eb870aa069cd78a8ee90949))

### [0.18.1](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.18.0...next-starter@0.18.1) (2021-08-05)

**Note:** Version bump only for package next-starter

## [0.18.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.17.0...next-starter@0.18.0) (2021-08-03)

### Features

- **core:** rename PageContainer to RouteContainer ([865e8d8](https://github.com/OnrampLab/onr-react-ui/commit/865e8d8a7c97a516c5fc9819079ba0d638441ac2))
- **core/component:** [App] rename routes to menuItems ([b8e6a01](https://github.com/OnrampLab/onr-react-ui/commit/b8e6a013028b8cac098517a6caa15d96c4ed4bf0))
- **core/provider:** [RouteProvider] remove isNotDashboard; ([2421baa](https://github.com/OnrampLab/onr-react-ui/commit/2421baab7b8d43a3d24410f4a00290dd7ee85865))
- **starter:** can define routes and apply layout on different routes ([1f85063](https://github.com/OnrampLab/onr-react-ui/commit/1f850630434690292621141a3908b4bfa9afa98d))
- **starter:** use wildcard for layout path matching ([add3fbf](https://github.com/OnrampLab/onr-react-ui/commit/add3fbfe923692fb9e5528c836a3f92a9157ce2b))
- **starter/page:** [admin] new ([3a9b803](https://github.com/OnrampLab/onr-react-ui/commit/3a9b803e639b54c71bdaf4411710c9bb2cd95ff7))
- **starter/plugin:** [admin-dashboard] new ([3642672](https://github.com/OnrampLab/onr-react-ui/commit/3642672075a464fb1a8b416cd14c54f594c67198))

## [0.17.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.16.0...next-starter@0.17.0) (2021-08-01)

### Features

- **plugin:** [@onr/plugin-antd] move from @onr/core-antd ([e45e664](https://github.com/OnrampLab/onr-react-ui/commit/e45e664ec94357dc21feef026498d4e93c599334))
- **starter/package:** [app] extract from starter ([3380b8e](https://github.com/OnrampLab/onr-react-ui/commit/3380b8e76935b459f4554d059fdb8c0bde78dcee))

## [0.16.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.15.1...next-starter@0.16.0) (2021-08-01)

### Features

- **plugin/auth:** create from auth package ([0e2cdb0](https://github.com/OnrampLab/onr-react-ui/commit/0e2cdb07cdcb7943440dfda7a5f01d0ce732d1fb))

### [0.15.1](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.15.0...next-starter@0.15.1) (2021-08-01)

**Note:** Version bump only for package next-starter

## [0.15.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.14.0...next-starter@0.15.0) (2021-07-31)

### Features

- **component:** add Loading pages ([39e0425](https://github.com/OnrampLab/onr-react-ui/commit/39e0425ab6aa6fe454512cd95b8c07652c9bc39c))
- **core/component:** [App] can wrap auth by config ([2b59c0d](https://github.com/OnrampLab/onr-react-ui/commit/2b59c0d11c460ad1cbeac934fde27f5d2a4ac665))
- **core/component:** [Signin] integrate with next-auth ([b6e08c9](https://github.com/OnrampLab/onr-react-ui/commit/b6e08c93ae4677b443fcc444288d0b9e54284721))
- **starter/api:** [/api/auth/*] add dynamic auth APIs ([5a5feca](https://github.com/OnrampLab/onr-react-ui/commit/5a5fecae0e7d602eaac5fc4e15122fb9d0b3100e))
- **starter/comopnent:** [PageComponent] no need to pass logout props ([0b6b76d](https://github.com/OnrampLab/onr-react-ui/commit/0b6b76d9cf753d3bf8debd873c804f7b703b935f))
- **starter/component:** [MyApp] add next-auth provider ([a3b7644](https://github.com/OnrampLab/onr-react-ui/commit/a3b7644c8dc4729dee17668e0c1e5e19a39cfa22))
- **starter/component:** [MyApp] pass session into AppProvider; remove getInitialProps ([4a65416](https://github.com/OnrampLab/onr-react-ui/commit/4a65416177b52ff43aa78f42e2bb7376498e125b))
- **starter/component:** [PageContainer] remove old AuthWrapper ([60a824e](https://github.com/OnrampLab/onr-react-ui/commit/60a824eab0f0ed044c7621b8caed0406cd709a2a))
- **starter/page:** [home] set server side token ([d2e982e](https://github.com/OnrampLab/onr-react-ui/commit/d2e982e7367fc87ce5e1b6632402ac96d85b48b0))

## [0.14.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.13.0...next-starter@0.14.0) (2021-07-18)

### Features

- **starter:** [server] use @onr/next-server to simplify logic ([30f3bc8](https://github.com/OnrampLab/onr-react-ui/commit/30f3bc839f6a9ba3b0ea6bf2a68252020b9eb134))
- **starter/package:** [@onr/plugin-custom-home] new ([fc5c27f](https://github.com/OnrampLab/onr-react-ui/commit/fc5c27f499ab480b5ea60f55ea0ce1c24140fd7c))
- **starter/plugin:** [@onr/plugin-custom-home] extract from home module ([233d668](https://github.com/OnrampLab/onr-react-ui/commit/233d668756edcc59b2c93c3582a41134c109813f))

## [0.13.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.12.0...next-starter@0.13.0) (2021-07-16)

### Features

- **starter:** move documentation to root folder ([8e72fc6](https://github.com/OnrampLab/onr-react-ui/commit/8e72fc67446cfe36b57f7bba6d4fdcefc6e55e07))

## [0.12.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.11.0...next-starter@0.12.0) (2021-07-16)

### Features

- **module:** [user] move to plugins ([a8072f7](https://github.com/OnrampLab/onr-react-ui/commit/a8072f72347013fabd5eae998d2c7805770eb57d))
- **starter/plugin:** add @onr/plugin-user ([8053b77](https://github.com/OnrampLab/onr-react-ui/commit/8053b77b78004f3ff766a375cc8a2dd72aedc8a2))

### Bug Fixes

- **starter/component:** [UserForm] could not show Available Accounts ([abb5c21](https://github.com/OnrampLab/onr-react-ui/commit/abb5c214ca08f4e9da4d2331c1e276f97b1f2dbc))

## [0.11.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.10.0...next-starter@0.11.0) (2021-07-16)

### Features

- **starter/component:** use Page, Header, SidebarMenu components from @onr/plugin-antd ([17c14fb](https://github.com/OnrampLab/onr-react-ui/commit/17c14fb7ffb4ca8efa2e6fbd41b53dafe31e23e3))

## [0.10.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.9.0...next-starter@0.10.0) (2021-07-14)

### Features

- **core:** remove AppProvider and usePubSub hook ([d73b2b9](https://github.com/OnrampLab/onr-react-ui/commit/d73b2b9c89277ff0b0fb2f4ccfb73a70ada9a7fe))
- **module:** [auth] move to packages ([e985888](https://github.com/OnrampLab/onr-react-ui/commit/e985888a92957fdcb36fa089a704ccb0c73d6223))
- **starter/package:** [@onr/auth] new ([c455b6e](https://github.com/OnrampLab/onr-react-ui/commit/c455b6eb33b2bfd0306d08009668f8201908043b))

## [0.9.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.8.7...next-starter@0.9.0) (2021-07-08)

### Features

- **starter/config:** [appConfig] add full-page-routes ([d85302d](https://github.com/OnrampLab/onr-react-ui/commit/d85302d41cea57802da2b74d7cfb46bcccbfa5ea))

### [0.8.7](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.8.6...next-starter@0.8.7) (2021-07-07)

**Note:** Version bump only for package next-starter

### [0.8.6](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.8.5...next-starter@0.8.6) (2021-07-07)

**Note:** Version bump only for package next-starter

### [0.8.5](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.8.4...next-starter@0.8.5) (2021-07-07)

**Note:** Version bump only for package next-starter

### [0.8.4](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.8.3...next-starter@0.8.4) (2021-07-07)

### Bug Fixes

- **starter:** original tailwindcss theme colors are overrided ([2b1d3d0](https://github.com/OnrampLab/onr-react-ui/commit/2b1d3d0a7e3cb58d66afb52a5551facf0f55f0b2))
- **starter:** rollback original global styles ([0941c98](https://github.com/OnrampLab/onr-react-ui/commit/0941c98b0d8c0e50c2571da4f2bf9edb3006603d))

### [0.8.3](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.8.2...next-starter@0.8.3) (2021-07-05)

**Note:** Version bump only for package next-starter

### [0.8.2](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.8.1...next-starter@0.8.2) (2021-07-03)

**Note:** Version bump only for package next-starter

### [0.8.1](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.8.0...next-starter@0.8.1) (2021-06-30)

**Note:** Version bump only for package next-starter

## [0.8.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.7.0...next-starter@0.8.0) (2021-06-29)

### Features

- **starter/component:** [MyApp] add appConfig to create the App ([f9d91e9](https://github.com/OnrampLab/onr-react-ui/commit/f9d91e926666433897b2c3edfe682e83be5344a3))

## [0.7.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.6.2...next-starter@0.7.0) (2021-06-28)

### Features

- **starter:** [tailwindcss] add antd palettes ([58fe5dd](https://github.com/OnrampLab/onr-react-ui/commit/58fe5dd850a2ef670076ab29b709f6b41d42dc22))
- **starter/lib:** [getAntdVariables] extracted from GlobalStyles ([43a2a70](https://github.com/OnrampLab/onr-react-ui/commit/43a2a7063a667aedc683acd6b1570fc9ffb35035))
- **starter/lib:** [mergeArrayToObject] new ([9b5f760](https://github.com/OnrampLab/onr-react-ui/commit/9b5f7607e5b5296739df6c6f8a89f0156ca5c38f))
- **starter/lib:** [rgbHex] new ([7062575](https://github.com/OnrampLab/onr-react-ui/commit/7062575033302d0028d4ce94ef1a5ced2227fb81))

### [0.6.2](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.6.1...next-starter@0.6.2) (2021-06-25)

**Note:** Version bump only for package next-starter

### [0.6.1](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.6.0...next-starter@0.6.1) (2021-06-24)

**Note:** Version bump only for package next-starter

## [0.6.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.5.1...next-starter@0.6.0) (2021-06-21)

### Features

- **core/component:** [SidebarMenu] get menuItems from app container ([137fa16](https://github.com/OnrampLab/onr-react-ui/commit/137fa1642a03d907a56ba4e88d34d92d0b660ab9))
- **starter/component:** [MyApp] can use createApp to create a app container ([eef0a21](https://github.com/OnrampLab/onr-react-ui/commit/eef0a21dfa2294068bd1ff94bdf6d4d3116e4d98))

### [0.5.1](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.5.0...next-starter@0.5.1) (2021-06-17)

**Note:** Version bump only for package next-starter

## [0.5.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.4.0...next-starter@0.5.0) (2021-06-16)

### Features

- **starter/page:** add custom error page ([61adc32](https://github.com/OnrampLab/onr-react-ui/commit/61adc32780511ef82e4a174af007a1ff7e0890cf))

## [0.4.0](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.3.2...next-starter@0.4.0) (2021-06-16)

### Features

- **package:** [mock] extracted from @onr/core ([499a0d4](https://github.com/OnrampLab/onr-react-ui/commit/499a0d41f420e5592867fdd8eb3e6ab8b1ba52ae))

### [0.3.2](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.3.0...next-starter@0.3.2) (2021-06-10)

**Note:** Version bump only for package next-starter

### [0.3.1](https://github.com/OnrampLab/onr-react-ui/compare/next-starter@0.3.0...next-starter@0.3.1) (2021-06-10)

**Note:** Version bump only for package next-starter

## 0.3.0 (2021-06-08)

### 0.2.3 (2021-06-07)

### 0.2.2 (2021-06-07)

### 0.2.1 (2021-06-07)

## 0.2.0 (2021-06-07)

### Features

- **core/component:** [Header] can pass HeaderMainSection to props ([e10f242](https://github.com/OnrampLab/onr-react-ui/commit/e10f2420d27b0aa3671e10711a836346d9763dfd))
- **core/component:** [SidebarMenu] add logout() to props ([d584d85](https://github.com/OnrampLab/onr-react-ui/commit/d584d85bbdf08a96ecc5152b73395909c138e669))

### Bug Fixes

- **account/component:** [AccountListPage] remove wrong useEffect dependencies ([4c77b37](https://github.com/OnrampLab/onr-react-ui/commit/4c77b3791c68c5c71ba1cc1cd780df18b20b7dd9))
- **account/component:** [AccountSelector] wrong way to dispatch action ([6412719](https://github.com/OnrampLab/onr-react-ui/commit/64127193fd6c0308336cf93526da79f765b3aaf9))
- **auth/service:** [AuthService] wrong error message ([07acd16](https://github.com/OnrampLab/onr-react-ui/commit/07acd16e7a6005e99de0005ac2a33d191a81ec6a))
- **service:** wrong import module ([94228e1](https://github.com/OnrampLab/onr-react-ui/commit/94228e12c455d2d8069a17ea8c0400609d5048e2))

## [0.2.3](https://github.com/OnrampLab/onr-react-ui/compare/v0.2.2...v0.2.3) (2021-06-07)

**Note:** Version bump only for package next-starter

## [0.2.2](https://github.com/OnrampLab/onr-react-ui/compare/v0.2.1...v0.2.2) (2021-06-07)

**Note:** Version bump only for package next-starter

**Note:** Version bump only for package next-starter

## [0.2.1](https://github.com/OnrampLab/onr-react-ui/compare/v0.2.0...v0.2.1) (2021-06-07)

**Note:** Version bump only for package next-starter

**Note:** Version bump only for package next-starter

# 0.2.0 (2021-06-07)

### Bug Fixes

- **account/component:** [AccountListPage] remove wrong useEffect dependencies ([4c77b37](https://github.com/OnrampLab/onr-react-ui/commit/4c77b3791c68c5c71ba1cc1cd780df18b20b7dd9))
- **account/component:** [AccountSelector] wrong way to dispatch action ([6412719](https://github.com/OnrampLab/onr-react-ui/commit/64127193fd6c0308336cf93526da79f765b3aaf9))
- **auth/service:** [AuthService] wrong error message ([07acd16](https://github.com/OnrampLab/onr-react-ui/commit/07acd16e7a6005e99de0005ac2a33d191a81ec6a))
- **service:** wrong import module ([94228e1](https://github.com/OnrampLab/onr-react-ui/commit/94228e12c455d2d8069a17ea8c0400609d5048e2))

### Features

- **core/component:** [Header] can pass HeaderMainSection to props ([e10f242](https://github.com/OnrampLab/onr-react-ui/commit/e10f2420d27b0aa3671e10711a836346d9763dfd))
- **core/component:** [SidebarMenu] add logout() to props ([d584d85](https://github.com/OnrampLab/onr-react-ui/commit/d584d85bbdf08a96ecc5152b73395909c138e669))
