import { pgTable, uuid, varchar, timestamp, text } from "drizzle-orm/pg-core";

export const applications = pgTable("applications", {
    id: uuid("id").defaultRandom().primaryKey(),
    company: varchar("company").notNull(),
    position: varchar("position").notNull(),
    location: varchar("location").notNull(),
    status: varchar("status").notNull(),
    appliedDate: timestamp("applied_date").notNull().defaultNow(),
    jobUrl: varchar("job_url").notNull(),
    jobDescription: text("job_description"),
    hrName: varchar("hr_name").notNull(),
    hrEmail: varchar("hr_email").notNull(),
    hrPhone: varchar("hr_phone").notNull(),
    notes: text("notes"),
})