import type { jobStatus, NewApplication } from "~/types/applications";

/**
 * Status color mapping for badges
 */
const STATUS_COLORS: Record<string, string> = {
    applied: "",
    "hr-interview": "bg-blue-500/10 text-blue-500 border-blue-500/20",
    "technical-test": "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
    "user-interview": "bg-orange-500/10 text-orange-500 border-orange-500/20",
    offered: "bg-green-500/10 text-green-500 border-green-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
};

export const getStatusColor = (status: string): string => STATUS_COLORS[status] ?? "";

/**
 * Status options for select components
 */
export const STATUS_OPTIONS: { value: jobStatus; label: string }[] = [
    { value: "applied", label: "Applied" },
    { value: "hr-interview", label: "HR Interview" },
    { value: "technical-test", label: "Technical Test" },
    { value: "user-interview", label: "User Interview" },
    { value: "offered", label: "Offered" },
    { value: "rejected", label: "Rejected" },
];

/**
 * Default form values for new application
 */
export const DEFAULT_APPLICATION: NewApplication = {
    company: "",
    position: "",
    location: "",
    salary: "",
    status: "applied",
    appliedDate: new Date(),
    jobUrl: "",
    jobDescription: "",
    hrName: "",
    hrEmail: "",
    hrPhone: "",
    notes: "",
};

/**
 * Extract application fields from request body
 * Normalizes appliedDate to Date object
 */
export const extractApplicationFields = (body: Record<string, unknown>) => ({
    company: body.company as string,
    position: body.position as string,
    location: (body.location as string) ?? null,
    salary: (body.salary as string) ?? null,
    status: body.status as jobStatus,
    appliedDate: new Date(body.appliedDate as string),
    jobUrl: (body.jobUrl as string) ?? null,
    jobDescription: (body.jobDescription as string) ?? null,
    hrName: (body.hrName as string) ?? null,
    hrEmail: (body.hrEmail as string) ?? null,
    hrPhone: (body.hrPhone as string) ?? null,
    notes: (body.notes as string) ?? null,
});
