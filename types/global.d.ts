import 'redux-dynamic-modules-react';

declare module 'redux-dynamic-modules-react' {
  export interface IDynamicModuleLoaderProps {
    /** Explicitly name children as a prop to work with @types/react@18 */
    children: React.ReactNode;
  }
}
