import { Row, Spin } from 'antd';

export const LoadingPage = () => {
  return (
    <Row
      // @ts-ignore
      type="flex"
      align="middle"
      justify="center"
      className="bg-white text-center"
      style={{ minHeight: '100vh' }}
    >
      <Spin tip="Loading..." size="large" />
    </Row>
  );
};
