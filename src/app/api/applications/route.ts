import { NextRequest, NextResponse } from "next/server";
import { db } from "~/db";
import { applications } from "~/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "~/lib/auth";


export async function GET(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers
    });

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const userId = session.user.id;
    const applicationsData = await db.query.applications.findMany({
        where: eq(applications.userId, userId)
    });

    return NextResponse.json(applicationsData);
}

export async function POST(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers
    });

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    const userId = session.user.id;
    const body = await request.json();

    const newApplication = await db.insert(applications).values({
        userId,
        company: body.company,
        position: body.position,
        location: body.location,
        salary: body.salary,
        status: body.status,
        appliedDate: body.appliedDate,
        jobUrl: body.jobUrl,
        jobDescription: body.jobDescription,
        hrName: body.hrName,
        hrEmail: body.hrEmail,
        hrPhone: body.hrPhone,
        notes: body.notes,
    }).returning();

    return NextResponse.json(newApplication, { status: 201 });
}