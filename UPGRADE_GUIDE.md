# Upgrade Guide

## @onr/core
### From 0.40.x to 1.x

- 升級 Yarn v4, 把 .yarn/* 加到 git ignore, 並執行
  ```
  yarn
  ```
- 修正 Yarn install 執行時的警告
- 除了 web 以外的所有 packages/plugins，把 @onr/core 搬到 peerDependencies
- 移除 babel 以及 old commands
- 移除 apps/web/src/server
- packages 都改用 tsup build，範例可以參考其他的
- 升級 packages
  - @types/react: ^18.3.4
  - @types/react-dom: ^18.3.0
  - typescript: ^5.5.4
  - react: ^18.3.1
  - react-dom: ^18.3.1
  - antd: 5.5.6
  - next: 13.5.6
  - @storybook 相關的 packages: ^8.2.9
  - @storybook/addon-knobs: ^8.0.1
  - @storybook/addons: ^7.6.17
  - next-transpile-modules: 10.0.1
- 因為升級 Yarn 4 後，package 的限制會變嚴格，因此會需要在每個 package 都加上
  - "prettier": "^2.8.8",
- 把所有 lodash 改成 radash
  - 需要注意 radash 沒有 sortBy，可以改用 sort (for number) or alphabetical (for string)
  - uniq -> unique
  - debounce 的參數有改，時間放前面
  - merge 要多帶 callback
- 把 MyApp 的 CSS 移到 _document.tsx
