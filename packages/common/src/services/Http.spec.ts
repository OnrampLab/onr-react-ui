import nock from 'nock';
import { Http } from './Http';

jest.mock('next/config', () => () => ({
  publicRuntimeConfig: {
    processEnv: {
      API_URL: 'http://localhost:3000',
      API_KEY: 'Some_Token',
    },
  },
}));

const headers = {
  'Access-Control-Allow-Origin': '*',
  'content-Type': 'application/json',
  'access-control-allow-headers': 'Authorization',
};

describe('Axios request tests', () => {
  beforeAll(() => {
    Http.setBaseUrl('http://localhost:3000/api');
    nock('http://localhost:3000')
      .intercept('/api/200', 'OPTIONS')
      .reply(200, undefined, headers)
      .intercept('/api/404', 'OPTIONS')
      .reply(200, undefined, headers)
      .intercept('/api', 'OPTIONS')
      .reply(200, undefined, headers)
      .get('/api/200')
      .reply(200, { data: { success: true } })
      .get('/api/404')
      .reply(404, { data: { success: false } });
  });

  test('200 test', async () => {
    const result = await Http.request<{ success: boolean }>({
      method: 'get',
      url: '/200',
    });
    expect(result.data.success).toEqual(true);
  });

  test('404 test', async () => {
    try {
      await Http.request({
        method: 'get',
        url: '/404',
      });
    } catch (error) {
      expect(error).not.toBeUndefined();
    }
  });

  // Raymond: What's the use case for this test anyway??
  // test('Catch test', async () => {
  //   try {
  //     await Http.request({
  //       method: 'get',
  //       url: '',
  //     });
  //   } catch (error) {
  //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  //     expect(error.code).toBeUndefined();
  //   }
  // });
});
