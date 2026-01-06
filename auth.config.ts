import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/admins-panel-resttt/login",
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isAdminPath = nextUrl.pathname.startsWith("/admins-panel-resttt");
            const isLoginPage = nextUrl.pathname === "/admins-panel-resttt/login";

            if (!isAdminPath || isLoginPage) return true;

            const isLoggedIn = !!auth?.user;
            const role = (auth?.user as any)?.role;
            const isAdmin = role === "ADMIN" || role === "admin";

            return isLoggedIn && isAdmin;
        },

        async jwt({ token, user }) {
            // If user is present (on sign in), attach role to token
            if (user) token.role = (user as any).role;
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                (session.user as any).role = token.role as string | undefined;
            }
            return session;
        },
    },
    providers: [], // extended in auth.ts
} satisfies NextAuthConfig;
