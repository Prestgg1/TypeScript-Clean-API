import { singleton } from "tsyringe";
import { eq } from "drizzle-orm";
import type {  Material } from "@askorg/shared/DTOs";
import { db } from "../db";
import { material } from "../schemas/material.schema";
import { InternalServerError, NotFoundError } from "@askorg/shared/Exceptions";

@singleton()
export class MaterialRepository {
    async findAll(): Promise<Material[]> {
        const result = await db
            .select().from(material);
        return result;
    }


    async findById(id: number): Promise<Material> {
        const result = await db
            .select()
            .from(material)
            .where(eq(material.id, id));
        if (!result[0]) {
            throw new NotFoundError("Material not found");
        };
        return result[0];
    }

    async create(file_url: string): Promise<Material> {
        const result = await db.insert(material).values({ pdf: file_url }).returning();
        if (!result[0]) {
            throw new InternalServerError("Failed to create material");
        }
        return result[0];
    }

    async delete(id: number): Promise<Material | null> {
        const result = await db.delete(material).where(eq(material.id, id)).returning();
        return result[0] as Material ?? null;
    }
}