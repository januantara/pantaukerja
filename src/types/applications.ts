import z from "zod";

export type jobStatus =
    | 'applied'
    | 'hr-interview'
    | 'technical-test'
    | 'user-interview'
    | 'offered'
    | 'rejected';

// application schema
export const applicationSchema = z.object({
    company: z
        .string()
        .min(1, "Company name required"),
    position: z
        .string()
        .min(1, "Position name required"),
    location: z
        .string()
        .optional(),
    status: z
        .enum(['applied', 'hr-interview', 'technical-test', 'user-interview', 'offered', 'rejected']),
    appliedDate: z
        .date(),
    jobUrl: z
        .string()
        .min(1, "Job URL required")
        .url("Invalid URL"),
    jobDescription: z
        .string()
        .optional(),
    hrName: z
        .string()
        .optional(),
    hrEmail: z
        .string()
        .optional(),
    hrPhone: z
        .string()
        .optional(),
    notes: z
        .string()
        .optional()
})

export type NewApplication = z.infer<typeof applicationSchema>;

