import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
    pages: {
        signIn: "/admins-panel-resttt/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminPath = nextUrl.pathname.startsWith("/admins-panel-resttt");
            const isLoginPage = nextUrl.pathname === "/admins-panel-resttt/login";

            if (isAdminPath && !isLoginPage) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            }
            return true;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role as string;
            }
            return session;
        },
    },
    providers: [], // Add providers with empty arrays for now, will be extended in auth.ts
} satisfies NextAuthConfig;
