import { eq } from "drizzle-orm";
import { db } from "../db";
import { categories } from "../schemas";
import { InternalServerError } from "@askorg/shared/Exceptions";
import type { Category, CreateCategoryDto, UpdateCategoryDto } from "@askorg/shared/DTOs";

export class CategoryRepository {
  async findAll() {
    return db.select().from(categories);
  }

  async findById(id: number) {
    const result = await db.select().from(categories).where(eq(categories.id, id));

    return result[0] ?? null;
  }

  async findBySlug(slug: string) {
    const result = await db.select().from(categories).where(eq(categories.slug, slug));
    return result[0] ?? null;
  }

  async create(dto: CreateCategoryDto, slug: string): Promise<Category> {
    const result = await db.insert(categories).values({ ...dto, slug }).returning();
    if (!result[0]) {
      throw new InternalServerError("Məlumat bazaya yazıla bilmədi.");
    }
    return result[0];
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const result = await db
      .update(categories)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(categories.id, id))
      .returning();
    return result[0] ?? null;
  }

  async delete(id: number) {
    const result = await db.delete(categories).where(eq(categories.id, id)).returning();
    return result[0] ?? null;
  }
}