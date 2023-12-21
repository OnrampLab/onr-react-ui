import { LoadingOutlined } from '@ant-design/icons';

export const TodoLoadingLogo = () => (
  <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
    <LoadingOutlined rev="" />
    Loading...
  </div>
);

export const todoLoadingLogo = <TodoLoadingLogo />;
