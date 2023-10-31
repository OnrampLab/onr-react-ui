import { Breadcrumbs, BreadcrumbsRoute } from "../interfaces";

interface Props {
  routes: BreadcrumbsRoute[];
}

export const useBreadcrumbs = (props: Props) => {
  const { routes } = props;
  const breadcrumbs: Breadcrumbs = [];

  return {
    breadcrumbs,
  };
}
