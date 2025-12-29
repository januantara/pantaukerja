import { NextRequest, NextResponse } from "next/server";
import { db } from "~/db";
import { applications, interviews } from "~/db/schema";
import { eq, and } from "drizzle-orm";
import { withAuth, success } from "~/lib/api/helpers";

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return withAuth(request, async (userId) => {
        try {
            const { id } = await params;
            const body = await request.json();

            const [updated] = await db
                .update(applications)
                .set({
                    company: body.company,
                    position: body.position,
                    location: body.location,
                    salary: body.salary,
                    status: body.status,
                    appliedDate: new Date(body.appliedDate),
                    jobUrl: body.jobUrl,
                    jobDescription: body.jobDescription,
                    hrName: body.hrName,
                    hrEmail: body.hrEmail,
                    hrPhone: body.hrPhone,
                    notes: body.notes,
                })
                .where(and(eq(applications.id, id), eq(applications.userId, userId)))
                .returning();

            if (!updated) {
                return NextResponse.json({ error: "Application not found" }, { status: 404 });
            }

            return success(updated);
        } catch (error) {
            console.error("Error updating application:", error);
            return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
        }
    });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    return withAuth(request, async (userId) => {
        try {
            const { id } = await params;

            // First, verify that the application belongs to the user
            const [application] = await db
                .select()
                .from(applications)
                .where(and(eq(applications.id, id), eq(applications.userId, userId)));

            if (!application) {
                return NextResponse.json({ error: "Application not found" }, { status: 404 });
            }

            // Delete all related interviews first (cascade delete manually)
            await db
                .delete(interviews)
                .where(eq(interviews.applicationId, id));

            // Then delete the application
            const [deleted] = await db
                .delete(applications)
                .where(and(eq(applications.id, id), eq(applications.userId, userId)))
                .returning();

            return success({ message: "Application and related interviews deleted" });
        } catch (error) {
            console.error("Error deleting application:", error);
            return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
        }
    });
}

