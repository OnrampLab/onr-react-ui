# Create React App

**This assumes you are using `react-scripts` v2.1 or higher!**

## Install TypeScript

Install TypeScript and configure it for use with Create React App by following their [brief tutorial](https://facebook.github.io/create-react-app/docs/adding-typescript).

_Feel free to commit just that part as a first step._

## Install and use the Onramplab TypeScript config

Next, install the Onramplab TypeScript config as a dev dependency:

```sh
yarn add -D @onr/tsconfig
```

Create React App will have already created a `tsconfig.json` for you. In this file, add an `extends` configuration:

```json
{
  "extends": "@onr/tsconfig",
  "include": ["src"]
}
```

Start your server up. At this point, Create React App will probably update your tsconfig.json with some defaults they recommend. At the time of writing, these don't conflict with anything the Onramplab config attempts to cover, so let Create React App do it.

_Go ahead and create another commit here once your server runs successfully._
