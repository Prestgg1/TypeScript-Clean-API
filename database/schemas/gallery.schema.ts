import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { posts } from "./post.schema";

// gallery tablosu
export const gallery = pgTable("gallery", {
    id: serial("id").primaryKey(),
    postId: integer("post_id").references(() => posts.id),
    url: text("url").notNull(),
    publicId: text("public_id").notNull(), // Cloudinary ID
    createdAt: timestamp("created_at").defaultNow(),
});