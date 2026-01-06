import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

// Create middleware-only auth instance without Node.js dependencies
const { auth } = NextAuth(authConfig);

export default auth;

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
