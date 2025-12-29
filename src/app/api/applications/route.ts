import { NextRequest } from "next/server";
import { db } from "~/db";
import { applications } from "~/db/schema";
import { eq } from "drizzle-orm";
import { withAuth, success } from "~/lib/api/helpers";
import { extractApplicationFields } from "~/lib/applicationStatus";

export async function GET(request: NextRequest) {
    return withAuth(request, async (userId) => {
        const data = await db.query.applications.findMany({
            where: eq(applications.userId, userId)
        });
        return success(data);
    });
}

export async function POST(request: NextRequest) {
    return withAuth(request, async (userId) => {
        const body = await request.json();
        const applicationData = extractApplicationFields(body);

        const [newApplication] = await db.insert(applications).values({
            userId,
            ...applicationData,
        }).returning();

        return success(newApplication, 201);
    });
}