import z from "zod";

export type interviewType =
    | 'hr-interview'
    | 'technical-test'
    | 'user-interview'
    | 'final-interview';

// Interview schema for form validation
export const interviewSchema = z.object({
    applicationId: z
        .string()
        .min(1, "Application is required"),
    type: z
        .enum(['hr-interview', 'technical-test', 'user-interview', 'final-interview']),
    datetime: z
        .date(),
    location: z
        .string()
        .min(1, "Location is required"),
    meetingLink: z
        .string()
        .url("Invalid URL")
        .or(z.literal("")),
    notes: z
        .string()
        .optional()
});

export type NewInterview = z.infer<typeof interviewSchema>;

// Interview type with id (from database)
export type Interview = NewInterview & {
    id: string;
};

// Interview with application details for display
export type InterviewWithApplication = Interview & {
    application: {
        id: string;
        company: string;
        position: string;
    };
};
