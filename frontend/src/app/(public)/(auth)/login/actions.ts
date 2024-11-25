"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Login(credentials: { email: string; password: string }) {
  try {
    const res = await fetch("http://localhost:8080/api/auth/signin", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const data = await res.json();
      const { access_token } = data;
      const cookieStore = await cookies();
      cookieStore.set("session", access_token);
      redirect("/dashboard");
    }
  } catch (error) {
    throw new Error("Login failed");
  }
}
