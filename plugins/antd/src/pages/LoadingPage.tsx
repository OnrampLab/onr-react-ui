import { Row, Spin } from 'antd';

export const LoadingPage = () => {
  return (
    <Row
      align="middle"
      justify="center"
      className="text-center bg-white"
      style={{ minHeight: '100dvh' }}
    >
      <Spin tip="Loading..." size="large" />
    </Row>
  );
};
