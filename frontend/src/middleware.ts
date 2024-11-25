import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/sessions/sessions";
import { cookies } from "next/headers";

const protectedRoutes: string[] = ["/", "/dashboard"];
const publicRoutes: string[] = ["/login", "/register"];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtectedRoute && !session?.sub) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.sub && !path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}
