import { appConfig } from '@app';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const API_BASE_URL = appConfig.apiBaseUrl;

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'test@test.com' },
        password: { label: 'Password', type: 'password' },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const token = await login(credentials);
        const user = await getUser(token);

        user.token = token;
        return user;
      },
    }),
  ],
  // Database optional. MySQL, Maria DB, Postgres and MongoDB are supported.
  // https://next-auth.js.org/configuration/databases
  //
  // Notes:
  // * You must install an appropriate node_module for your database
  // * The Email provider requires a database (OAuth providers do not)
  database: process.env.DATAAPI_BASE_URL,

  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: process.env.SECRET,

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/auth/signin', // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // @ts-ignore
    async signIn(user, account, profile) {
      return true;
    },
    // @ts-ignore
    async redirect(url, baseUrl) {
      return baseUrl;
    },
    async session(session, token) {
      session.accessToken = token.accessToken;
      session.user = token.user;

      console.log('session will be expired at', new Date(token.accessTokenExpires).toISOString());

      return session;
    },
    // @ts-ignore
    async jwt(token, user, account, profile, isNewUser) {
      if (user?.token) {
        const token = user.token;
        const transformedToken = transformToken(token);

        delete user.token;

        return {
          ...transformedToken,
          user,
        };
      }

      if (tokenWillExpire(token)) {
        // Access token has expired, try to update it
        return refreshAccessToken(token);
      }

      return token;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: 'light',

  // Enable debug messages in the console if you are having problems
  debug: true,
});

function tokenWillExpire(token: any) {
  const remaining = token.accessTokenExpires - Date.now();
  // TODO: should extract to env
  const lessThanOneDay = remaining < 60 * 60 * 24 * 1000;

  return lessThanOneDay;
}

function transformToken(token: any) {
  return {
    accessToken: token.access_token,
    accessTokenExpires: Date.now() + token.expires_in * 1000,
  };
}

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
// @ts-ignore
async function refreshAccessToken(token) {
  const refreshedToken = await refreshJWT(token);
  const user = await getUser(refreshedToken);
  const transformedToken = transformToken(refreshedToken);

  return {
    ...transformedToken,
    user,
  };
}

async function login(credentials: any) {
  let res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: { 'Content-Type': 'application/json' },
  });
  const { data: token } = await res.json();

  if (!res.ok) {
    console.log('login error:', { error: token });
    throw new Error('Auth failed');
  }

  return token;
}

async function getUser(token: any) {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
  });
  const { data: user } = await res.json();

  if (!res.ok) {
    console.log('get user error:', { error: user });
    throw new Error('Auth failed');
  }

  return user;
}

async function refreshJWT(token: any) {
  let res = await fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.accessToken}`,
    },
  });
  const { data: refreshedToken } = await res.json();

  if (!res.ok) {
    console.log('refreshedToken error:', { accessToken: token.accessToken });

    throw new Error('Faild to refresh token');
  }

  return refreshedToken;
}
