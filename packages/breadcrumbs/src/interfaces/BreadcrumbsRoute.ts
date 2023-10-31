export interface BreadcrumbMatch {
  /**
   * The portion of the URL pathname that was matched.
   */
  pathname: string;
  /**
   * The route object that was used to match.
   */
  route?: BreadcrumbsRoute;
}

export interface BreadcrumbComponentProps {
  [x: string]: unknown;
}

export type BreadcrumbComponentType = string | React.ComponentType<BreadcrumbComponentProps>;

export interface BreadcrumbsRoute {
  path: string;
  breadcrumbConfig?: {
    label: BreadcrumbComponentType;
    props?: { [key: string]: unknown };
  };
  children?: BreadcrumbsRoute[];
}

export interface Breadcrumbs {
  match: BreadcrumbMatch;
}
