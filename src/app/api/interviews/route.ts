import { NextRequest } from "next/server";
import { db } from "~/db";
import { interviews, applications } from "~/db/schema";
import { eq } from "drizzle-orm";
import { withAuth, success, notFound } from "~/lib/api/helpers";

// Sort interviews: Today first, upcoming middle, passed last
function sortInterviews<T extends { datetime: Date }>(data: T[]): T[] {
    const now = new Date();
    const todayStr = now.toDateString();

    const getPriority = (date: Date) => {
        if (date.toDateString() === todayStr) return 0;
        if (date > now) return 1;
        return 2;
    };

    return data.sort((a, b) => {
        const dateA = new Date(a.datetime);
        const dateB = new Date(b.datetime);
        const priorityA = getPriority(dateA);
        const priorityB = getPriority(dateB);

        if (priorityA !== priorityB) return priorityA - priorityB;
        return priorityA === 2
            ? dateB.getTime() - dateA.getTime()
            : dateA.getTime() - dateB.getTime();
    });
}

export async function GET(request: NextRequest) {
    return withAuth(request, async (userId) => {
        const data = await db
            .select({
                id: interviews.id,
                applicationId: interviews.applicationId,
                type: interviews.type,
                datetime: interviews.datetime,
                location: interviews.location,
                meetingLink: interviews.meetingLink,
                notes: interviews.notes,
                application: {
                    id: applications.id,
                    company: applications.company,
                    position: applications.position,
                }
            })
            .from(interviews)
            .innerJoin(applications, eq(interviews.applicationId, applications.id))
            .where(eq(applications.userId, userId));

        return success(sortInterviews(data));
    });
}

export async function POST(request: NextRequest) {
    return withAuth(request, async (userId) => {
        const body = await request.json();

        // Verify application belongs to user
        const application = await db.query.applications.findFirst({
            where: eq(applications.id, body.applicationId)
        });

        if (!application || application.userId !== userId) {
            return notFound("Application not found");
        }

        const [newInterview] = await db.insert(interviews).values({
            applicationId: body.applicationId,
            type: body.type,
            datetime: new Date(body.datetime),
            location: body.location,
            meetingLink: body.meetingLink || "",
            notes: body.notes,
        }).returning();

        return success(newInterview, 201);
    });
}
