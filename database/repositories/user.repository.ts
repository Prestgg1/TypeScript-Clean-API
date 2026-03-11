// database/src/repositories/user.repository.ts
import { singleton } from "tsyringe";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../schemas";
import type { User } from "@askorg/shared/DTOs";

@singleton()
export class UserRepository {
 async findByEmail(email: string): Promise<User | null> {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  return result[0] ?? null;
}

  async findById(id: number): Promise<User | null> {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return result[0] ?? null;
  }

  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    await db
      .update(users)
      .set({
        refresh_token: refreshToken,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id));
  }
}