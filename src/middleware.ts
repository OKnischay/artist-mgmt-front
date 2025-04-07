import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware running for page navigation:", request.nextUrl.pathname);
  
  const token = request.cookies.get("access_token");
  if (!token) {
    console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/artists",
    "/artists/add",
    "/albums",
    "/albums/add",
    "/songs",
    "/songs/add",
    "/users",
    "/users/add",
  ],
};