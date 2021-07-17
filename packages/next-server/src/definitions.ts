export interface ServerOptions {
  assetPrefix: string;
  staticPath: string;
  mode: string;
  routes: RouteItem[];
  proxy: any;
  proxyMode: string;
  port: number;
}

export interface RouteItem {
  from: string;
  to: string;
}
