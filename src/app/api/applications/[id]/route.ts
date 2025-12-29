import { NextRequest } from "next/server";
import { db } from "~/db";
import { applications } from "~/db/schema";
import { eq, and } from "drizzle-orm";
import { withAuth, success, notFound } from "~/lib/api/helpers";

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return withAuth(request, async (userId) => {
        const { id } = await params;

        const deleted = await db.delete(applications)
            .where(and(eq(applications.id, id), eq(applications.userId, userId)))
            .returning();

        if (!deleted.length) return notFound("Application not found");

        return success({ success: true });
    });
}
