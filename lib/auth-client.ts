"use client";
import { createAuthClient } from "better-auth/react";

// Browser auth client for the dashboard sign-in button. Same-origin, so no
// baseURL is needed — it talks to /api/auth/[...all].
export const authClient = createAuthClient();

export const { signIn, signOut, useSession } = authClient;
