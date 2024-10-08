import { Row } from 'antd';
import HTTPStatus from 'http-status';
import { NextPageContext } from 'next';

interface Props {
  code: keyof typeof HTTPStatus;
  error: string;
}

export const Error = ({ code, error }: Props) => {
  const title = String(HTTPStatus[code]);

  return (
    <Row
      align="middle"
      justify="center"
      className="bg-white text-center"
      style={{ minHeight: '100dvh' }}
    >
      <div className="max-w-7xl min-w-5xl z-10">
        <h1 className={`${code === 404 ? 'text-warning' : 'text-error'} text-9xl font-black`}>
          {code}
        </h1>
        <h2 className="text-body">{title}</h2>
        <h3 className="text-body">{error}</h3>
      </div>
    </Row>
  );
};

export const getErrorServerSideProps = ({ res, err, query }: NextPageContext) => {
  const code = res ? res.statusCode : err ? err.statusCode : 404;
  const error = query.error ?? null;

  console.log('Error page', { error });

  return {
    props: {
      code,
      error,
    },
  };
};
