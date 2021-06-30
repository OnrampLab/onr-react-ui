<div align="center" >Performance oriented Next.js application boilerplate with Redux, Typescript, Express.js and Sass.</div>
<br/>

<div align="center">
  <!-- Build Status -->
  <a href="https://circleci.com/Onramplab/next-starter">
    <img src="https://circleci.com/gh/OnrampLab/next-starter.svg?style=shield" alt="Build Status" />
  </a>
  <!-- Dependency Status -->
  <a href="https://david-dm.org/Onramplab/next-starter">
    <img src="https://status.david-dm.org/gh/Onramplab/next-starter.svg" alt="Dependency Status" />
  </a>
  <!-- devDependency Status -->
  <a href="https://david-dm.org/Onramplab/next-starter#info=devDependencies">
    <img src="https://status.david-dm.org/gh/Onramplab/next-starter.svg?type=dev" alt="devDependency Status" />
  </a>
</div>

<div align="center">
  <sub>Inspired by <a href="https://www.pankod.com">Pankod</a></sub>
</div>

## About

Next.js is a minimalistic React framework that runs in the browser and the server. It offers developers an easy way to get started, and as it uses React.js for templating it is also a straightforward way for developers with React experience to get productive fast.

The advantages of this approach is to be able to create Rich User experiences in a uniform way, without compromising Search Engine Optimisation (SEO) factors that are key to good ranking on Google and other search engines.

This boilerplate make it easier to get started with a well-structured Next.js and TypeScript application.

By the end of setup, you'll have a Next.js project and features which is specified at the below.

## Features

This boilerplate is modular architecture includes the latest powerfull tools.

- **Next.js** - Minimalistic framework for server-rendered React applications.
- **Typescript** - Superset of JavaScript which primarily provides optional static typing, classes and interfaces. path support(allias)
- **Redux** - State management
- **Express.js**- Handles server-side rendering and integrated with Express.js
- **Built-in Project CLI**- Create pages, components, actions, reducers with one command by using built-in cli.
- **Sass/Scss** - CSS preprocessor, which adds special features such as variables, nested rules and mixins (sometimes referred to as syntactic sugar) into regular CSS.
- **Docker** - A tool designed to make it easier to create, deploy, and run applications by using containers.
- **Babel** - The compiler for next generation JavaScript. Module(alias) support
- **Eslint** - The pluggable linting utility.
- **Reverse Proxy** - A reverse proxy server is a type of proxy server that typically sits behind the firewall in a private network and directs client requests to the appropriate backend server
- **Bundler Analyzer** - Visualize size of webpack output files with an interactive zoomable treemap.
- **dotenv .config** - Expose environment variables to the runtime config of Next.js
- **Jest** - Javascript testing framework , created by developers who created react
- **React Testing Library** - Simple and complete React DOM testing utilities that encourage good testing practices.
- **Enzyme** - JavaScript testing utility for React that makes it easier to test your React Components output.
- **Storybook** - An open source tool for developing UI components in isolation for React.

_Here are a few highlights to look out for in this boilerplate_

<dl>

  <dd>The boilerplate includes tsconfig.json which contains a list of your input files as well as all your compilation settings.<dd>

> One of TypeScript’s core principles is that type-checking focuses on the shape that values have. This is sometimes called “duck typing” or “structural subtyping”. In TypeScript, interfaces fill the role of naming these types, and are a powerful way of defining contracts within your code as well as contracts with code outside of your project.

  <dd>Includes babel-plugin-module-resolver <dd>

> A Babel plugin to add a new resolver for your modules when compiling your code using Babel. This plugin allows you to add new "root" directories that contain your modules. It also allows you to setup a custom alias for directories, specific files, or even other npm modules.

  <dd>Includes nextjs runtime config <dd>

> You will need to uncomment `MyApp` component's `getInitialProps()` in order to enable runtime config to get environment variables.

  <dd>Includes jest and enzyme <dd>

> Jest was created by Facebook and is a testing framework to test javascript and React code. Together with Airbnb’s Enzyme, which is a testing utility, makes it the perfect match to easily test your React application.

</dl>

<br/>

## Getting Started

1. Clone the repository and install the dependencies:

   ```sh
   yarn create next-app my-app --example https://github.com/OnrampLab/onr-react-ui/tree/main/examples/next-starter
   ```

2. To create a new app, go to the chosen app directory on the CLI then run one of the following methods:

   ```sh
   yarn install
   ```

3. Create `.env.local`

   ```sh
   cp .env.example .env.local
   ```

4. Once the installation is done, you can run the following command:

   ```sh
   yarn dev
   ```

Then open [http://localhost:3000/](http://localhost:3000/) to see your app.

## How to have better debug logs

By setting environment variable `DEBUG`, you can see a specific logs of some packages on backend. For example,

```shell
DEBUG=onr:core:*
```

You will see all logs for `@onr/core` package.

To see browser debug logs, you can use Firefox and then set `localPackage.debug = 'onr:core:\*' on console of dev tool.

## Built-in CLI

<div>
 <img width="600" src="./boilerplate-cli.gif" >
</div>
<br/>
<br/>

Pankod boilerplate is shipped with a CLI tool to streamline the creation of new components. By using the CLI tool, you may easily add pages, class components or functional components to your project and have all the required actions, reducers and imports are automatically created for you.
<br />

To start the CLI, you may run the following npm command:

```sh
npm run cli
```

After starting, an interactive menu will let you configure the component the be created. Firstly, you'll be asked for the type of the component whether it's a page, functional component or class component. Then you'll be prompted with the other options relevant to your selection of the component type.

For example, let's go through the steps of the creation of a new page component.

> Enter page name

- Enter the desired filename for the page. Spaces are not allowed!
- The tool will check for the existing filenames in the project and reject if found any.
- The interface files are going to be created under Interfaces/Pages directory.

> Do you want to add custom route or use default route name?,

- You can define custom route for page which is specified in app/routes.js
- It will set filename as a route to if you don't want to add custom route.

> Do you want to have a connection to store?

If you choose yes, the following store connection methods and imports are generated:

- mapStateToProps & mapDispatchToProps methods and some imports in page component file,
- An action file in the Actions folder,
- An action constants in Definitions/ActionConsts.ts,
- An action file to Actions/index.ts,
- A Store interface file.

> Do you want to create a new reducer or use your own?

- If you choose yes, a new reducer file for page is created in src/Redux/Reducers directory and combineReducers are added to index.ts

> Do you want to add a style file?

- If you choose yes, a style.scss file is created in to same directory with page the component.

After answering questions it generates files in miliseconds.

## Development Tools

### VS Code

- plugins
  - Code Spell Checker (streetsidesoftware.code-spell-checker)
  - EditorConfig for VS Code (editorconfig.editorconfig)
  - Prettier - Code formatter (esbenp.prettier-vscode)
  - ESLint (dbaeumer.vscode-eslint)

## License

Licensed under the MIT License, Copyright © 2018-present Pankod
