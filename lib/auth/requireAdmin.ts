import { auth } from "@/auth";

export async function requireAdmin() {
    const session = await auth();
    const role = (session?.user as any)?.role;

    const isAdmin = role === "ADMIN" || role === "admin";
    if (!session?.user || !isAdmin) {
        throw new Error("Unauthorized");
    }

    return session;
}
