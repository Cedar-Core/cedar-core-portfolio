import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/db/prisma";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        console.log("🔐 Authorize called with:", { email: credentials?.email });

        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          console.log("❌ Validation failed:", parsed.error);
          return null;
        }

        const { email, password } = parsed.data;

        const user = await prisma.user.findUnique({
          where: { email },
          include: { role: true },
        });

        if (!user) {
          console.log("❌ User not found");
          return null;
        }

        console.log("✅ User found:", {
          email: user.email,
          role: user.role?.name,
        });

        const ok = await bcrypt.compare(password, user.password);

        if (!ok) {
          console.log("❌ Password mismatch");
          return null;
        }

        console.log("✅ Password matched");

        return {
          id: user.id,
          email: user.email,
          role: user.role?.name ?? null,
        };
      },
    }),
  ],
});
