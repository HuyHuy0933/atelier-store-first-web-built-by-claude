import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

import { db } from "@/db";
import * as schema from "@/db/schema";

// BETTER_AUTH_SECRET and BETTER_AUTH_URL are read from the environment automatically.
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  // nextCookies must be the last plugin so cookies set in server actions are forwarded.
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
