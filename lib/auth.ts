import { Pool } from "pg";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import { isAdminEmail } from "./admin";

// BetterAuth server instance. Backs onto the Supabase Postgres database (its
// own user/session/account/verification tables — generate them with
// `pnpm dlx @better-auth/cli generate`). Google is the only sign-in method, and
// a before-hook rejects any email that is not in the ADMIN_EMAILS allowlist so
// only approved admins can ever create a session.

const connectionString = process.env.DATABASE_URL;

// The Supabase pooler serves a cert Node won't verify against its default CA
// chain, so disable strict verification (the connection is still TLS-encrypted).
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

export const auth = betterAuth({
  database: pool,
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  databaseHooks: {
    user: {
      create: {
        // Reject non-allowlisted accounts at the source: no user row is ever
        // created, so they can never hold a session.
        before: async (user) => {
          if (!isAdminEmail(user.email)) {
            throw new APIError("FORBIDDEN", {
              message: "This account is not authorised for the admin dashboard.",
            });
          }
          return { data: user };
        },
      },
    },
  },
  plugins: [nextCookies()],
});
