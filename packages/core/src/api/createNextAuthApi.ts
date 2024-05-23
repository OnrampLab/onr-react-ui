import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { LaravelJWT, NextAuthAPIOptions, NextAuthToken } from '../types';

// const API_BASE_URL = appConfig.apiBaseUrl;
export function createNextAuthApi(options: NextAuthAPIOptions) {
  // For more information on each option (and a full list of options) go to
  // https://next-auth.js.org/configuration/options

  const { login, getUser, refreshJWT } = options.apis;

  return NextAuth({
    // https://next-auth.js.org/configuration/providers
    providers: [
      CredentialsProvider({
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
          try {
            const jwt = await login(credentials);
            const user = await getUser(jwt.access_token);

            user.jwt = jwt;
            return user;
          } catch (error) {
            console.log('Failed to login', { error });

            return null;
          }
        },
      }),
    ],
    // The secret should be set to a reasonably long random string.
    // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
    // a separate secret is defined explicitly for encrypting the JWT.
    secret: process.env.SECRET,

    session: {
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
      error: '/error', // Error code passed in query string as ?error=
      // verifyRequest: '/auth/verify-request', // Used for check email page
      // newUser: null // If set, new users will be directed here on first sign in
    },

    // Callbacks are asynchronous functions you can use to control what happens
    // when an action is performed.
    // https://next-auth.js.org/configuration/callbacks
    callbacks: {
      async signIn() {
        return true;
      },
      async redirect({ url, baseUrl }) {
        // Allows relative callback URLs
        if (url.startsWith('/')) {
          return `${baseUrl}${url}`;
        }
        // Allows callback URLs on the same origin
        else if (new URL(url).origin === baseUrl) {
          return url;
        }
        return baseUrl;
      },
      async session({ session, token }) {
        // @ts-ignore
        session.accessToken = token.accessToken;
        // @ts-ignore
        session.user = token.user;

        // @ts-ignore
        console.log('session will be expired at', new Date(token.accessTokenExpires).toISOString());

        return session;
      },
      async jwt({ token, user, trigger, session }) {
        // @ts-ignore
        // TODO: should implement refreshAccessToken after supported
        if (user?.jwt) {
          // After login, we can get user right away. But the user will be empty in the future.
          // @ts-ignore
          const nextAuthToken = user.jwt as LaravelJWT;
          const transformedToken = transformToken(nextAuthToken);
          // @ts-ignore
          delete user.jwt;
          const newUser = trigger === 'update' && session?.user ? session.user : user;

          return {
            ...transformedToken,
            user: newUser,
          };
        }

        /**
         * Takes a token, and returns a new token with updated
         * `accessToken` and `accessTokenExpires`. If an error occurs,
         * returns the old token and an error property
         */
        const refreshAccessToken = async (token: NextAuthToken) => {
          try {
            const refreshedToken = await refreshJWT(token.accessToken);
            const user = await getUser(refreshedToken.access_token);
            const transformedToken = transformToken(refreshedToken);

            return {
              ...transformedToken,
              user,
            };
          } catch (error) {
            console.log('Failed to refresh access token', { error });

            throw error;
          }
        };

        const nextAuthToken = token as NextAuthToken;

        if (tokenWillExpire(nextAuthToken)) {
          // Access token has expired, try to update it
          return refreshAccessToken(nextAuthToken);
        }

        if (trigger === 'update' && session?.user) {
          token.user = session.user;
        }

        return token;
      },
    },

    // Events are useful for logging
    // https://next-auth.js.org/configuration/events
    events: {},

    // You can set the theme to 'light', 'dark' or use 'auto' to default to the
    // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
    theme: {
      colorScheme: 'light',
    },

    // Enable debug messages in the console if you are having problems
    debug: true,
  });
}

function tokenWillExpire(token: NextAuthToken) {
  const remaining = token.accessTokenExpires - Date.now();
  // TODO: should extract to env
  const lessThanOneDay = remaining < 60 * 60 * 24 * 1000;

  return lessThanOneDay;
}

function transformToken(token: LaravelJWT) {
  return {
    accessToken: token.access_token,
    accessTokenExpires: Date.now() + token.expires_in * 1000,
  };
}
