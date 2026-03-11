import { singleton } from "tsyringe";
import { and, asc, desc, eq, like, sql } from "drizzle-orm";
import { posts, categories } from "../schemas";
import type { CreatePostDto, Post, PostQueryDto, UpdatePostDto } from "@askorg/shared/DTOs";
import { db } from "../db";

@singleton()
export class PostRepository {
  async count(query: PostQueryDto = {}): Promise<number> {
    const { category, search } = query;
    const conditions = [];

    if (category) conditions.push(eq(categories.slug, category));
    if (search) conditions.push(like(posts.title, `%${search}%`));

    let qb = db
      .select({ count: sql<number>`cast(count(*) as int)` })
      .from(posts)
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .$dynamic();

    if (conditions.length > 0) qb = qb.where(and(...conditions));

    const result = await qb;
    return result[0]?.count ?? 0;
  }

  async findAll(query: PostQueryDto = {}): Promise<any[]> {




    const { category, limit, search, offset, sort } = query;

    const conditions = [];

    if (category) {
      conditions.push(eq(categories.slug, category));
    }

    if (search) {
      conditions.push(like(posts.title, `%${search}%`));
    }
    let queryBuilder = db
      .select({
        post: posts,
        category: categories,
      })
      .from(posts)
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .$dynamic();

    if (conditions.length > 0) {
      queryBuilder = queryBuilder.where(and(...conditions));
    }

    if (sort !== undefined) {
      queryBuilder = queryBuilder.orderBy(sort ? desc(posts.createdAt) : asc(posts.createdAt));
    } else {
      queryBuilder = queryBuilder.orderBy(desc(posts.createdAt));
    }

    if (limit) {
      queryBuilder = queryBuilder.limit(limit);
    }

    if (offset) {
      queryBuilder = queryBuilder.offset(offset);
    }

    const result = await queryBuilder;

    return result.map((row) => ({
      ...row.post,
      category: row.category ?? undefined,
    }));
  }

  async findById(id: number): Promise<any> {
    const result = await db
      .select({
        post: posts,
        category: categories,
      })
      .from(posts)
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(eq(posts.id, id));

    if (!result[0]) return null;
    const { post, category } = result[0];
    return { ...post, category: category ?? undefined };
  }

  async findBySlug(slug: string): Promise<any> {
    const result = await db
      .select({
        post: posts,
        category: categories,
      })
      .from(posts)
      .leftJoin(categories, eq(posts.categoryId, categories.id))
      .where(eq(posts.slug, slug));

    if (!result[0]) return null;
    const { post, category } = result[0];
    return { ...post, category: category ?? undefined };
  }

  async create(dto: CreatePostDto, slug: string): Promise<Post | null> {
    const result = await db.insert(posts).values({ ...dto, slug }).returning();
    return result[0] ?? null;
  }

  async update(id: number, dto: UpdatePostDto): Promise<Post | null> {
    const result = await db
      .update(posts)
      .set({ ...dto, updatedAt: new Date() })
      .where(eq(posts.id, id))
      .returning();
    return result[0] ?? null;
  }

  async delete(id: number): Promise<Post | null> {
    const result = await db.delete(posts).where(eq(posts.id, id)).returning();
    return result[0] ?? null;
  }
}
