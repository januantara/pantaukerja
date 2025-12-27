import { pgTable, uuid, timestamp, text, varchar } from "drizzle-orm/pg-core";
import { applications } from "./application";

export const interviews = pgTable("interviews", {
    id: uuid("id").defaultRandom().primaryKey(),
    applicationId: uuid("application_id").notNull().references(() => applications.id),
    type: varchar("type").notNull().default("HR Interview"),
    datetime: timestamp("datetime").notNull(),
    location: varchar("location").notNull(),
    meetingLink: varchar("meeting_link").notNull(),
    notes: text("notes"),
})  