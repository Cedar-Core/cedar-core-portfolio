"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function authenticate(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    console.log("🔐 Authenticate action called with email:", email);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("✅ SignIn result:", result);
    return { success: true };
  } catch (error) {
    console.error("❌ Authentication error:", error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        case "CallbackRouteError":
          return { error: "Invalid email or password" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  await signOut({ redirectTo: "/admins-panel-resttt/login" });
}
