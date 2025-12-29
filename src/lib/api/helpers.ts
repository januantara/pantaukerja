import { NextRequest, NextResponse } from "next/server";
import { auth } from "~/lib/auth";

// Response helpers
export const unauthorized = () =>
    NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export const notFound = (message = "Not found") =>
    NextResponse.json({ error: message }, { status: 404 });

export const success = <T>(data: T, status = 200) =>
    NextResponse.json(data, { status });

// Auth helper
export async function getAuthUserId(request: NextRequest): Promise<string | null> {
    const session = await auth.api.getSession({ headers: request.headers });
    return session?.user?.id ?? null;
}

// Wrapper for authenticated routes
export async function withAuth<T>(
    request: NextRequest,
    handler: (userId: string) => Promise<T>
): Promise<NextResponse | T> {
    const userId = await getAuthUserId(request);
    if (!userId) return unauthorized();
    return handler(userId);
}
