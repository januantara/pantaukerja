import { NextRequest } from "next/server";
import { db } from "~/db";
import { interviews, applications } from "~/db/schema";
import { eq } from "drizzle-orm";
import { withAuth, success, notFound, unauthorized } from "~/lib/api/helpers";

// Verify interview belongs to user
async function verifyOwnership(interviewId: string, userId: string) {
    const [interview] = await db
        .select({ id: interviews.id, applicationId: interviews.applicationId })
        .from(interviews)
        .innerJoin(applications, eq(interviews.applicationId, applications.id))
        .where(eq(interviews.id, interviewId))
        .limit(1);

    if (!interview) return { error: "not_found" as const };

    const application = await db.query.applications.findFirst({
        where: eq(applications.id, interview.applicationId)
    });

    if (!application || application.userId !== userId) {
        return { error: "unauthorized" as const };
    }

    return { interview };
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return withAuth(request, async (userId) => {
        const { id } = await params;
        const result = await verifyOwnership(id, userId);

        if ('error' in result) {
            return result.error === "not_found" ? notFound("Interview not found") : unauthorized();
        }

        const body = await request.json();
        const [updated] = await db
            .update(interviews)
            .set({
                applicationId: body.applicationId,
                type: body.type,
                datetime: new Date(body.datetime),
                location: body.location,
                meetingLink: body.meetingLink || "",
                notes: body.notes,
            })
            .where(eq(interviews.id, id))
            .returning();

        return success(updated);
    });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return withAuth(request, async (userId) => {
        const { id } = await params;
        const result = await verifyOwnership(id, userId);

        if ('error' in result) {
            return result.error === "not_found" ? notFound("Interview not found") : unauthorized();
        }

        await db.delete(interviews).where(eq(interviews.id, id));
        return success({ success: true });
    });
}
