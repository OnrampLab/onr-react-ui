# onr-react-ui

## Packages

- [next-starter](packages/next-starter/README.md)
- [@onr/common](packages/onr-common/README.md)
- [@onr/core](packages/onr-core/README.md)
- [@onr/eslint-config](packages/onr-eslint-config/README.md)
- [@onr/mock](packages/mock/README.md)
- [@onr/prettier-config](packages/prettier-config/README.md)
- [@onr/tsconfig](packages/tsconfig/README.md)

## Publish

### login to npm

When you want to use lerna to publish packages, you will need to login to npm.

```sh
npm login
```

### Publish by using lerna command

1. create a version

Use [lerna version](https://github.com/lerna/lerna/tree/main/commands/version#usage) command

```sh
yarn lerna version # by default it will increse the minor version
```

or

```sh
yarn lerna version patch
```
