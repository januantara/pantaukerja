import { NextRequest, NextResponse } from "next/server";
import { db } from "~/db";
import { applications, interviews } from "~/db/schema";
import { eq, and } from "drizzle-orm";
import { withAuth, success, notFound } from "~/lib/api/helpers";
import { extractApplicationFields } from "~/lib/applicationStatus";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return withAuth(request, async (userId) => {
        const { id } = await params;
        const body = await request.json();
        const applicationData = extractApplicationFields(body);

        const [updated] = await db
            .update(applications)
            .set(applicationData)
            .where(and(eq(applications.id, id), eq(applications.userId, userId)))
            .returning();

        if (!updated) {
            return notFound("Application not found");
        }

        return success(updated);
    });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return withAuth(request, async (userId) => {
        const { id } = await params;

        // First, verify that the application belongs to the user
        const [application] = await db
            .select()
            .from(applications)
            .where(and(eq(applications.id, id), eq(applications.userId, userId)));

        if (!application) {
            return notFound("Application not found");
        }

        // Delete all related interviews first (cascade delete manually)
        await db
            .delete(interviews)
            .where(eq(interviews.applicationId, id));

        // Then delete the application
        await db
            .delete(applications)
            .where(and(eq(applications.id, id), eq(applications.userId, userId)));

        return success({ message: "Application and related interviews deleted" });
    });
}

