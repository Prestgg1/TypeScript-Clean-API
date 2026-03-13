import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const material = pgTable("material", {
    id: serial("id").primaryKey(),
    pdf: text("pdf").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});