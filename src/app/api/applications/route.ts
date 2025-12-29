import { NextRequest } from "next/server";
import { db } from "~/db";
import { applications } from "~/db/schema";
import { eq } from "drizzle-orm";
import { withAuth, success } from "~/lib/api/helpers";

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

        const [newApplication] = await db.insert(applications).values({
            userId,
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
        }).returning();

        return success(newApplication, 201);
    });
}