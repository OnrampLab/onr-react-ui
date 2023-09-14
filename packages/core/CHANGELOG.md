# Change Log

## 0.27.0

### Minor Changes

- Add auth config

### Patch Changes

- Updated dependencies
  - @onr/common@0.8.2
  - @onr/logging@0.4.3
  - @onr/ts-rest-client@2.0.2

## 0.26.1

### Patch Changes

- Upgrade styled-component

## 0.26.0

### Minor Changes

- Add onOkClick and onCancelClick to GlobalModalProvider

## 0.25.0

### Minor Changes

- Support registering layouts

## 0.24.0

### Minor Changes

- Improve layout and theme

## 0.23.1

### Patch Changes

- Upgrade axios to v1.5
- Updated dependencies
  - @onr/ts-rest-client@2.0.1

## 0.23.0

### Minor Changes

- GlobalModalProvider support more modal props

## 0.22.4

### Patch Changes

- User can do pagination and sorting on user and account list page
- Updated dependencies
  - @onr/ts-rest-client@2.0.0

## 0.22.3

### Patch Changes

- Set global modal destroy on close
- Updated dependencies
  - @onr/ts-rest-client@1.3.9

## 0.22.2

### Patch Changes

- System will be redirected to login page when session expired

## 0.22.1

### Patch Changes

- Imrove app architecture
- Updated dependencies
  - @onr/logging@0.4.2

## 0.22.0

### Minor Changes

- simplify App architecture and provider better customization

## 0.21.0

### Minor Changes

- add new hooks: useGlobalModal, useLogger

## 0.20.0

### Minor Changes

- Add use case

## 0.19.2

### Patch Changes

- Improve type hinting

## 0.19.1

### Patch Changes

- Improve type hinting

## 0.19.0

### Minor Changes

- Add recent todos into menu bar

## 0.18.0

### Minor Changes

- Improve sidebar; Add recent todos

## 0.17.10

### Patch Changes

- @onr/ts-rest-client support nested query string
- Updated dependencies
  - @onr/ts-rest-client@1.3.8

## 0.17.9

### Patch Changes

- Bump version
- Updated dependencies
  - @onr/ts-rest-client@1.3.7

## 0.17.8

### Patch Changes

- Improve @onr/ts-rest-client
- Updated dependencies
  - @onr/ts-rest-client@1.3.6

## 0.17.7

### Patch Changes

- Fix ts-rest-client test
- Updated dependencies
  - @onr/ts-rest-client@1.3.5

## 0.17.6

### Patch Changes

- Fix ts-rest-client
- Updated dependencies
  - @onr/ts-rest-client@1.3.4

## 0.17.5

### Patch Changes

- Upgrade axios
- Updated dependencies
  - @onr/common@0.8.1
  - @onr/logging@0.4.1
  - @onr/ts-rest-client@1.3.3

## 0.17.4

### Patch Changes

- Upgrade axios version
- Updated dependencies
  - @onr/ts-rest-client@1.3.2

## 0.17.3

### Patch Changes

- ts-rest-client's ResourceClient does not extend BasicClient
- Updated dependencies
  - @onr/ts-rest-client@1.3.1

## 0.17.2

### Patch Changes

- Add resource for ts-rest-client
- Updated dependencies
  - @onr/ts-rest-client@1.3.0

## 0.17.1

### Patch Changes

- Improve logging
- Updated dependencies
  - @onr/ts-rest-client@1.2.1

## 0.17.0

### Minor Changes

- Improve API error handling

### Patch Changes

- Updated dependencies
  - @onr/common@0.8.0
  - @onr/logging@0.4.0
  - @onr/ts-rest-client@1.2.0

## 0.16.0

### Minor Changes

- Improve api error handling and upgrade typescript

### Patch Changes

- Updated dependencies
  - @onr/common@0.7.0
  - @onr/logging@0.3.0
  - @onr/ts-rest-client@1.1.0

## 0.15.6

### Patch Changes

- Upgrade
- Updated dependencies
  - @onr/logging@0.2.4
  - @onr/common@0.6.2

## 0.15.5

### Patch Changes

- Fix failed to redirect after login successfully

## 0.15.4

### Patch Changes

- Updated dependencies
  - @onr/ts-rest-client@1.0.0

## 0.15.3

### Patch Changes

- Show error logs for login and refresh access token

## 0.15.2

### Patch Changes

- test
- Updated dependencies
  - @onr/logging@0.2.3

## 0.15.1

### Patch Changes

- fix version

## 0.15.0

### Minor Changes

- remove less style; refine antd styles

## 0.14.2

### Patch Changes

- change tsconfig target to es5 and commonjs
- Updated dependencies
  - @onr/common@0.6.1
  - @onr/logging@0.2.2
  - @onr/ts-rest-client@0.2.1

## 0.14.1

### Patch Changes

- do not package as esm module
- Updated dependencies
  - @onr/logging@0.2.1

## 0.14.0

### Minor Changes

- Use turborepo, upgrade to next.js v13 and antd v5

### Patch Changes

- Updated dependencies
  - @onr/common@0.6.0
  - @onr/logging@0.2.0
  - @onr/ts-rest-client@0.2.0

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

### [0.13.3](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.13.2...@onr/core@0.13.3) (2021-12-27)

### Bug Fixes

- fix export packages get error, update transpile with core and antd for treeshake ([5a9c9e5](https://github.com/OnrampLab/onr-react-ui/commit/5a9c9e5d2bce31ab8d53c0cacac731d2623ca7d2))
- **package/plugin:** [jest.config.js] change to .cjs to fix es module problem ([a602fed](https://github.com/OnrampLab/onr-react-ui/commit/a602fedf27e17c375a350dca520dafc721e8aa6e))

### [0.13.2](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.13.1...@onr/core@0.13.2) (2021-12-16)

**Note:** Version bump only for package @onr/core

### [0.13.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.13.0...@onr/core@0.13.1) (2021-09-16)

### Bug Fixes

- **core/componnet:** [App] getting wrong apis from options ([e752cd8](https://github.com/OnrampLab/onr-react-ui/commit/e752cd8a9d77e47b968152ffd0aceb1f5b72b56f))

## [0.13.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.12.0...@onr/core@0.13.0) (2021-08-25)

### Features

- **core/component:** [App] support api service for front and admin ([11d91ab](https://github.com/OnrampLab/onr-react-ui/commit/11d91ab5d02d134f9e03c9c2625defcb8ea1f46d))
- **core/component:** [App] support logger with logConfig ([a9a496e](https://github.com/OnrampLab/onr-react-ui/commit/a9a496e70942e9aec0969b9215b7bcd2f6c0fc07))
- **core/helper:** [env] new ([d19ab2c](https://github.com/OnrampLab/onr-react-ui/commit/d19ab2c7a1eac100ed1376e36a5106df5ed35e85))

## [0.12.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.11.0...@onr/core@0.12.0) (2021-08-08)

### Features

- **component:** [Page] remove handling theme ([b5af6ff](https://github.com/OnrampLab/onr-react-ui/commit/b5af6ffa13383a5689d12b1ad354e9ee2c34a5a5))
- **core/container:** [LayoutContainer] new with wrapper ([39b6076](https://github.com/OnrampLab/onr-react-ui/commit/39b6076e047b9ee80065c546a98b4353407f88dd))
- **core/container:** [StyleContainer] new ([f0e795b](https://github.com/OnrampLab/onr-react-ui/commit/f0e795bd4f4cf5168799583c60a1ef7964166192))
- **core/provider:** [AuthProvider] can redirect to original url after login ([ef392af](https://github.com/OnrampLab/onr-react-ui/commit/ef392af37ff86b84f2ca779caabfa1ab0562b016))

## [0.11.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.10.2...@onr/core@0.11.0) (2021-08-03)

### Features

- **core:** rename PageContainer to RouteContainer ([865e8d8](https://github.com/OnrampLab/onr-react-ui/commit/865e8d8a7c97a516c5fc9819079ba0d638441ac2))
- **core/component:** [App] rename routes to menuItems ([b8e6a01](https://github.com/OnrampLab/onr-react-ui/commit/b8e6a013028b8cac098517a6caa15d96c4ed4bf0))
- **core/component:** [App] support routes ([978ecb4](https://github.com/OnrampLab/onr-react-ui/commit/978ecb43a60936fcdabc9cad1b44a0b363f6ab9d))
- **core/hook:** [useApp] new ([2734145](https://github.com/OnrampLab/onr-react-ui/commit/273414569b51e6dd417f9d72be94307d09714e61))
- **core/hook:** [usePage] new ([9835e3d](https://github.com/OnrampLab/onr-react-ui/commit/9835e3da04cb9551b8b29fda9ff4749c99ddb600))
- **core/provider:** [PageProvider] add currentRoute ([4ec62aa](https://github.com/OnrampLab/onr-react-ui/commit/4ec62aa0e6b508e24d92322275134e876e34aa90))
- **core/provider:** [PageProvider] new ([ee8e882](https://github.com/OnrampLab/onr-react-ui/commit/ee8e8829b98ea8446b443785407dc99f0dbc8a28))
- **core/provider:** [RouteProvider] remove isNotDashboard; ([2421baa](https://github.com/OnrampLab/onr-react-ui/commit/2421baab7b8d43a3d24410f4a00290dd7ee85865))
- **starter:** can define routes and apply layout on different routes ([1f85063](https://github.com/OnrampLab/onr-react-ui/commit/1f850630434690292621141a3908b4bfa9afa98d))
- **starter:** use wildcard for layout path matching ([add3fbf](https://github.com/OnrampLab/onr-react-ui/commit/add3fbfe923692fb9e5528c836a3f92a9157ce2b))

### [0.10.2](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.10.1...@onr/core@0.10.2) (2021-08-01)

**Note:** Version bump only for package @onr/core

### [0.10.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.10.0...@onr/core@0.10.1) (2021-08-01)

**Note:** Version bump only for package @onr/core

## [0.10.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.9.0...@onr/core@0.10.0) (2021-07-31)

### Features

- **component:** add Loading pages ([39e0425](https://github.com/OnrampLab/onr-react-ui/commit/39e0425ab6aa6fe454512cd95b8c07652c9bc39c))
- **core/api:** [createNextAuthApi] new for creating NextAuth API ([7056868](https://github.com/OnrampLab/onr-react-ui/commit/70568683364d61f669030f98565825ec86c7e899))
- **core/component:** [App] can wrap auth by config ([2b59c0d](https://github.com/OnrampLab/onr-react-ui/commit/2b59c0d11c460ad1cbeac934fde27f5d2a4ac665))
- **core/component:** [App] integrate with NextAuthProvider and AuthProvider ([136abcf](https://github.com/OnrampLab/onr-react-ui/commit/136abcf389d2820e9bb8ab089c56d9add5aa2415))
- **core/component:** [Page] use useAuth hook to handle user ([035a9e2](https://github.com/OnrampLab/onr-react-ui/commit/035a9e27be8489eb0cb4de7f02351c2ba9a4c51a))
- **core/hook:** [useAuth] new ([ca346d7](https://github.com/OnrampLab/onr-react-ui/commit/ca346d78bfada6a10c1d22246d3f0bce54a0364f))
- **core/hook:** [useSession] new ([8c8584b](https://github.com/OnrampLab/onr-react-ui/commit/8c8584b3fdc3f00f6b08f237860fe0b397868093))
- **core/provider:** [AuthProvider] new ([b767b3b](https://github.com/OnrampLab/onr-react-ui/commit/b767b3b9f81451e39041d081f626d99fc9eb1446))
- **core/provider:** [NextAuthProvider] new ([d23ec70](https://github.com/OnrampLab/onr-react-ui/commit/d23ec706b8a7d1c1fb2ad65b42c82f1ff2c89f2b))

## [0.9.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.8.0...@onr/core@0.9.0) (2021-07-16)

### Features

- **core/component:** remove antd dependency ([9097c14](https://github.com/OnrampLab/onr-react-ui/commit/9097c14fa6401eaa25794a6b5babce6637682510))
- **core/type:** [AppComponents] add more component support: Header, Page, Sidebar ([14244ae](https://github.com/OnrampLab/onr-react-ui/commit/14244aef722ea03e0d76887203d06012d5eccdce))

### Bug Fixes

- **core/component:** [App] wrong type definition ([fff0790](https://github.com/OnrampLab/onr-react-ui/commit/fff0790fc5151a5ba5b704f621b0bc8b3c09b40c))
- **core/component:** [Page] possible null pointer ([61af235](https://github.com/OnrampLab/onr-react-ui/commit/61af2356f374b3bba4001beaa1870e1e0ab6be54))
- **core/component:** [SidebarMenu] possible null pointer ([9ed0499](https://github.com/OnrampLab/onr-react-ui/commit/9ed04993f1fced481e56eb17b403197d74350b98))

## [0.8.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.7.0...@onr/core@0.8.0) (2021-07-14)

### Features

- **core:** remove AppProvider and usePubSub hook ([d73b2b9](https://github.com/OnrampLab/onr-react-ui/commit/d73b2b9c89277ff0b0fb2f4ccfb73a70ada9a7fe))

## [0.7.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.6.5...@onr/core@0.7.0) (2021-07-08)

### Features

- **starter/config:** [appConfig] add full-page-routes ([d85302d](https://github.com/OnrampLab/onr-react-ui/commit/d85302d41cea57802da2b74d7cfb46bcccbfa5ea))

### [0.6.5](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.6.4...@onr/core@0.6.5) (2021-07-07)

**Note:** Version bump only for package @onr/core

### [0.6.4](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.6.3...@onr/core@0.6.4) (2021-07-07)

### Bug Fixes

- **core/component:** ts errors ([594a1f7](https://github.com/OnrampLab/onr-react-ui/commit/594a1f75bd386aa3f684c7f8e4161798983c42e3))

### [0.6.3](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.6.2...@onr/core@0.6.3) (2021-07-07)

**Note:** Version bump only for package @onr/core

### [0.6.2](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.6.1...@onr/core@0.6.2) (2021-07-05)

**Note:** Version bump only for package @onr/core

### [0.6.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.6.0...@onr/core@0.6.1) (2021-06-30)

**Note:** Version bump only for package @onr/core

## [0.6.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.5.2...@onr/core@0.6.0) (2021-06-29)

### Features

- **core/component:** [App] add appConfig & initialize() to set api base url and token ([086d273](https://github.com/OnrampLab/onr-react-ui/commit/086d273420dd9db97947071dddc3de9e6018287b))

### [0.5.2](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.5.1...@onr/core@0.5.2) (2021-06-25)

**Note:** Version bump only for package @onr/core

### [0.5.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.5.0...@onr/core@0.5.1) (2021-06-24)

**Note:** Version bump only for package @onr/core

## [0.5.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.4.1...@onr/core@0.5.0) (2021-06-21)

### Features

- **core/component:** [SidebarMenu] get menuItems from app container ([137fa16](https://github.com/OnrampLab/onr-react-ui/commit/137fa1642a03d907a56ba4e88d34d92d0b660ab9))
- **core/container:** [App] added ([a202351](https://github.com/OnrampLab/onr-react-ui/commit/a2023512476cb5dde9421f20a1b6536b886e362f))
- **core/wrapper:** [createApp] added ([3d7ecfa](https://github.com/OnrampLab/onr-react-ui/commit/3d7ecfabba4d5a4ba0d9188c76dbbfcbf08f6c56))

### [0.4.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.4.0...@onr/core@0.4.1) (2021-06-17)

**Note:** Version bump only for package @onr/core

## [0.4.0](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.3.2...@onr/core@0.4.0) (2021-06-16)

### Features

- **package:** [mock] extracted from @onr/core ([499a0d4](https://github.com/OnrampLab/onr-react-ui/commit/499a0d41f420e5592867fdd8eb3e6ab8b1ba52ae))

### [0.3.2](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.3.0...@onr/core@0.3.2) (2021-06-10)

**Note:** Version bump only for package @onr/core

### [0.3.1](https://github.com/OnrampLab/onr-react-ui/compare/@onr/core@0.3.0...@onr/core@0.3.1) (2021-06-10)

**Note:** Version bump only for package @onr/core

## 0.3.0 (2021-06-08)

### 0.2.3 (2021-06-07)

### 0.2.2 (2021-06-07)

### 0.2.1 (2021-06-07)

## 0.2.0 (2021-06-07)

### Features

- **onr-core:** init ([2adc5ca](https://github.com/OnrampLab/onr-react-ui/commit/2adc5cabf7c64f111b350441fe28226290fd86c7))
- **onr-core/mock:** [mirage] use Mock and Mocks to simplify mocking ([9722525](https://github.com/OnrampLab/onr-react-ui/commit/9722525a6c9b64a77dc753f44361edb4b826f8e7))
- **onr-core/mock:** [Mock] added ([2c9bfc3](https://github.com/OnrampLab/onr-react-ui/commit/2c9bfc34c323e07c39300af8ab0c0074fabd30e9))
- **onr-core/redux:** added related files ([79d4287](https://github.com/OnrampLab/onr-react-ui/commit/79d4287078c748bce907db76797c1df7b8672196))

### Bug Fixes

- **onr-core/mock:** [Mock] serialize result of resrouce route ([7a0c626](https://github.com/OnrampLab/onr-react-ui/commit/7a0c626cd697a713cf6b359f34e1611b30a82878))

## [0.2.3](https://github.com/OnrampLab/onr-react-ui/compare/v0.2.2...v0.2.3) (2021-06-07)

**Note:** Version bump only for package @onr/core

## [0.2.2](https://github.com/OnrampLab/onr-react-ui/compare/v0.2.1...v0.2.2) (2021-06-07)

**Note:** Version bump only for package @onr/core

**Note:** Version bump only for package @onr/core

## [0.2.1](https://github.com/OnrampLab/onr-react-ui/compare/v0.2.0...v0.2.1) (2021-06-07)

**Note:** Version bump only for package @onr/core

**Note:** Version bump only for package @onr/core

# 0.2.0 (2021-06-07)

### Bug Fixes

- **onr-core/mock:** [Mock] serialize result of resrouce route ([7a0c626](https://github.com/OnrampLab/onr-react-ui/commit/7a0c626cd697a713cf6b359f34e1611b30a82878))

### Features

- **onr-core:** init ([2adc5ca](https://github.com/OnrampLab/onr-react-ui/commit/2adc5cabf7c64f111b350441fe28226290fd86c7))
- **onr-core/mock:** [mirage] use Mock and Mocks to simplify mocking ([9722525](https://github.com/OnrampLab/onr-react-ui/commit/9722525a6c9b64a77dc753f44361edb4b826f8e7))
- **onr-core/mock:** [Mock] added ([2c9bfc3](https://github.com/OnrampLab/onr-react-ui/commit/2c9bfc34c323e07c39300af8ab0c0074fabd30e9))
- **onr-core/redux:** added related files ([79d4287](https://github.com/OnrampLab/onr-react-ui/commit/79d4287078c748bce907db76797c1df7b8672196))
