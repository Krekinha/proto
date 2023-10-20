import { baseUrl } from "@/utils/constants";
import { User } from "@/utils/types";
import { Secret } from "jsonwebtoken";
import NextAuth, {
} from "next-auth";
import { getToken } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  //export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {},
        senha: {},
      },

      async authorize(credentials, req) {
        if (!credentials?.email && !credentials?.senha) {
          throw new Error("Email e senha requerido");
        }

        const url = `${baseUrl()}/api/users/login`;
        return await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json;charset=UTF-8" },
          body: JSON.stringify({
            email: credentials?.email,
            senha: credentials?.senha,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            //const authorization = { id: res.token };

            //console.log(authorization);
            console.log("authorize: ", res);

            if (res) {
              return res;
            } else {
              throw new Error("Usuário não encontrado");
            }
          })
          .catch((e) => {
            console.log("error auth", e);
            throw new Error(e.message);
          });
      },
    }),
  ],

  session: {
    strategy: "jwt",
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 60 * 60, // (1 hora)   ----- 30 * 24 * 60 * 60, (30 days)
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `jwt: true` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    secret: process.env.JWT_SIGININ_PRIVATE_KEY,
    maxAge: 60 * 60, // (1 hora)   ------- 60 * 60 * 24, (1 dia)
    // A secret to use for key generation (you should set this explicitly)
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // secret: process.env.SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},

    // if using `NEXTAUTH_SECRET` env variable, we detect it, and you won't actually need to `secret`
    // const token = await getToken({ req })
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    signIn: "/auth", // Displays signin buttons
    signOut: "/", // Displays form with sign out button
    error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      //console.log("SIGNIN", user, account, profile, email, credentials);
      //console.log("SIGNIN_USER", user);
      //console.log("SIGNIN_ACCOUNT", account);
      //console.log("SIGNIN_PROFILE", profile);
      /*console.log("SIGNIN_EMAIL", email);
      console.log("SIGNIN_CREDENTIALS", credentials);*/
      return true;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signin
      console.log("jwt-token: ", token);
      //console.log("jwt-account: ", account);
      console.log("jwt-USER: ", user);
      //console.log("jwt-PROFILE: ", profile);
      //console.log("jwt-ISNEWUSER: ", isNewUser);

      user && (token.user = user);
      return token;
    },
    async session({ session, token, user }) {
      //session.accessToken  = token.accessToken;
      //session.userId = user.id;
      session = token.user as any;
      console.log("SESSION_SESSION: ", session);
      //console.log("SESSION_TOKEN: ", token);
      //console.log("SESSION_USER: ", user);

      return session;
    },

    // async redirect({ url, baseUrl }) { return baseUrl },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {
    async signIn({ isNewUser, user, account, profile }) {
      //console.log("LOGADO", user, profile, account);
    },
  },
  /*async signOut(message) { /!* on signout *!/
    },
    async createUser(message) { /!* user created *!/
    },
    async linkAccount(message) { /!* account linked to a user *!/
    },
    async session(message) { /!* session is active *!/
    },
    async error(message) { /!* error in authentication flow *!/
    }*/

  // You can set the theme to 'light', 'dark' or use 'auto' to default to the
  // whatever prefers-color-scheme is set to in the browser. Default is 'auto'
  theme: {
    colorScheme: "light",
  },

  // Enable debug messages in the console if you are having problems
  debug: true,
});
// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
//export default NextAuth(authOptions);
export { handler as GET, handler as POST };
