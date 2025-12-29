import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const sessionCookie = request.cookies.get("better-auth.session_token");
    const isLoginPage = request.nextUrl.pathname === "/";

    // If user is on login page and has session, redirect to /track
    if (isLoginPage && sessionCookie) {
        return NextResponse.redirect(new URL("/track", request.url));
    }

    // If user is on protected route and has no session, redirect to /
    const isTrackRoute = request.nextUrl.pathname.startsWith("/track");
    if (isTrackRoute && !sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/track/:path*", "/"],
};
