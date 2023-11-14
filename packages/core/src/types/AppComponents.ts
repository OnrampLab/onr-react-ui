import { ComponentType, ReactNode } from 'react';
import { AuthUser } from '../types';

export type AppComponents = {
  NotFoundErrorPage?: ComponentType<{}>;

  /**
   * An optional sign-in page that will be rendered instead of the AppRouter at startup.
   *
   * If a sign-in page is set, it will always be shown before the app, and it is up
   * to the sign-in page to handle e.g. saving of login methods for subsequent visits.
   *
   * The sign-in page will be displayed until it has passed up a result to the parent,
   * and which point the AppRouter and all of its children will be rendered instead.
   */
  SignInPage?: ComponentType<SignInPageProps>;

  Page?: ComponentType<PageProps>;

  Header?: ComponentType<HeaderProps>;

  SidebarMenu?: ComponentType<SidebarMenuProps>;

  LoadingPage?: ComponentType;
};

export type SignInPageProps = {
  /**
   * Set the sign-in result for the app. This should only be called once.
   */
  onResult(result: {}): void;
};

export type HeaderProps = {
  HeaderMainSection: ReactNode;
};

export type SidebarMenuProps = {
  sidebarTheme: 'dark' | 'light';
  sidebarMode: 'vertical' | 'inline';
  currentUser: AuthUser;
};

export type PageProps = {
  children: ReactNode;
  HeaderMainSection?: ComponentType;
  logo?: ReactNode;
  avatar?: string;
  innerStyle?: React.CSSProperties;
  showMenuToggle?: boolean;
};

export type PageComponentType = ComponentType<PageProps>;
