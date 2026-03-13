import { singleton } from "tsyringe";
import { eq } from "drizzle-orm";
import { gallery, posts } from "../schemas";
import type { CreateGalleryDto, Gallery } from "@askorg/shared/DTOs";
import { db } from "../db";

@singleton()
export class GalleryRepository {
    async findAll(): Promise<Gallery[]> {
        const result = await db
            .select({
                gallery: gallery,
                post: posts,
            })
            .from(gallery)
            .leftJoin(posts, eq(gallery.postId, posts.id));

        return result.map((row) => ({
            ...row.gallery,
            post: row.post ?? undefined,
        })) as Gallery[];
    }

    async findById(id: number): Promise<Gallery | null> {
        const result = await db
            .select({
                gallery: gallery,
                post: posts,
            })
            .from(gallery)
            .leftJoin(posts, eq(gallery.postId, posts.id))
            .where(eq(gallery.id, id));

        if (!result[0]) return null;
        const { gallery: item, post } = result[0];
        return { ...item, post: post ?? undefined } as Gallery;
    }

    async findByPostId(postId: number): Promise<Gallery[]> {
        const result = await db
            .select({
                gallery: gallery,
                post: posts,
            })
            .from(gallery)
            .leftJoin(posts, eq(gallery.postId, posts.id))
            .where(eq(gallery.postId, postId));

        return result.map((row) => ({
            ...row.gallery,
            post: row.post ?? undefined,
        })) as Gallery[];
    }

    async create(dto: CreateGalleryDto): Promise<Gallery | null> {
        const result = await db.insert(gallery).values(dto).returning();
        return result[0] as Gallery ?? null;
    }

    async delete(id: number): Promise<Gallery | null> {
        const result = await db.delete(gallery).where(eq(gallery.id, id)).returning();
        return result[0] as Gallery ?? null;
    }
}