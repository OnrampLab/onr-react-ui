# onr-eslint-config

## Installation

Install onr-eslint-config:

```bash
npm install --save-dev @onr/eslint-config
```

Then, add `"@onr"` to the "extends" array in your `.eslintrc.*` file. Make sure to put it **last,** so it gets the chance to override other configs.

<!-- prettier-ignore -->
```json
{
  "extends": [
    "some-other-config-you-use",
    "@onr"
  ]
}
```

That’s it! Extending `"@onr"` turns off a bunch of core ESLint rules, as well as a few rules from these plugins:

- [eslint-config-prettier]
- [eslint-plugin-import]
- [eslint-plugin-react]
- [eslint-plugin-react-hook]
- [eslint-plugin-promise]
- [@typescript-eslint/eslint-plugin]
