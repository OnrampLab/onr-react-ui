# onr-react-ui

## Examples

- [next-starter](examples/next-starter/README.md)

## Packages

- [@onr/common](packages/common/README.md)
- [@onr/core](packages/core/README.md)
- [@onr/eslint-config](packages/eslint-config/README.md)
- [@onr/mock](packages/mock/README.md)
- [@onr/prettier-config](packages/prettier-config/README.md)
- [@onr/tailwind-palette](packages/tailwind-palette/README.md)
- [@onr/tsconfig](packages/tsconfig/README.md)

## Release

[Using Changeset](https://github.com/changesets/changesets)

Add changeset, use space to choose target items, if not select any, click enter to jump to next question

```
yarn changeset add
```

Bump version

```
yarn changeset version
git add --all
git commit -m "chore: bump version"
yarn changeset tag
```

Push tags

```
git push --follow-tags
```

Circle CI may failed to deploy when push multiple tags, if so, please push web@*.*.* tag separately

## Publish

### Login to npm

When you want to use lerna to publish packages, you will need to login to npm.

```sh
npm login
```

### Publish by using lerna command

1. create a version

Use [lerna version](https://github.com/lerna/lerna/tree/main/commands/version#usage) command

```sh
yarn lerna version # by default it will increase the minor version
```

or

```sh
yarn lerna version patch
```

## Development Tools

### VS Code

- plugins
  - Code Spell Checker (streetsidesoftware.code-spell-checker)
  - EditorConfig for VS Code (editorconfig.editorconfig)
  - Prettier - Code formatter (esbenp.prettier-vscode)
  - ESLint (dbaeumer.vscode-eslint)
  - PostCSS Sorting (mrmlnc.vscode-postcss-sorting)
