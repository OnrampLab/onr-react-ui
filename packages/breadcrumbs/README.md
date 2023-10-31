# Breadcrumbs

Breadcrumbs UI components

## Installation

Using npm or yarn:

```sh
yarn add --dev @onr/breadcrumbs
```

For more information, check out our [docs on GitHub].

## Usage

```js
const { breadcrumbs } = useBreadcrumbs();
```

## Examples

### Simple

Start seeing generated breadcrumbs right away with this simple example

```js
import { useBreadcrumbs } from "@onr/breadcrumbs";

const Breadcrumbs = () => {
  const routes = [
    { path: "/example", breadcrumb: "Custom Example" },
  ];
  const { breadcrumbs } = useBreadcrumbs(routes);

  return (
    <React.Fragment>
      {breadcrumbs.map(({ breadcrumb }) => breadcrumb)}
    </React.Fragment>
  );
};
```

For the above example...

| Pathname      | Result                |
| ------------- | --------------------- |
| /example      | Home / Custom Example |

### Advanced

The example above will work for some routes, but you may want other routes to be dynamic (such as a user name breadcrumb). Let's modify it to handle custom-set breadcrumbs.

```js
import { useBreadcrumbs } from "@onr/breadcrumbs";

const userNamesById = { 1: "John" };

const DynamicUserBreadcrumb = ({ match }) => (
  <span>{userNamesById[match.params.userId]}</span>
);

const CustomPropsBreadcrumb = ({ someProp }) => <span>{someProp}</span>;

// define custom breadcrumbs for certain routes.
// breadcrumbs can be components or strings.
const routes = [
  { path: "/users/:userId", breadcrumb: DynamicUserBreadcrumb },
  { path: "/example", breadcrumb: "Custom Example" },
  {
    path: "/custom-props",
    breadcrumb: CustomPropsBreadcrumb,
    props: { someProp: "Hi" },
  },
];

// map & render your breadcrumb components however you want.
const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs(routes);

  return (
    <>
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <NavLink key={match.pathname} to={match.pathname}>
          {breadcrumb}
        </NavLink>
      ))}
    </>
  );
};
```

For the above example...

| Pathname      | Result                |
| ------------- | --------------------- |
| /users        | Home / Users          |
| /users/1      | Home / Users / John   |
| /example      | Home / Custom Example |
| /custom-props | Home / Hi             |

## Contributing

Try to optimize for the fewest specified options between the config specializations. For example, only `app` has `noEmit: true`, since the [default value][compiler options], `false`, is good for the `lib` config. Specifying it only in the `app` config means fewer overall entries!

We want to keep maintenance low by only specifying what is necessary. If the option's [default value][compiler options] is good for every config, remove it from every config!

[compiler options]: https://www.typescriptlang.org/docs/handbook/compiler-options.html
[docs on github]: ./docs

## References

[icd2k3/use-react-router-breadcrumbs](https://github.com/icd2k3/use-react-router-breadcrumbs)
