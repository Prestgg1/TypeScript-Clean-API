import type { Config } from "drizzle-kit";
export default {
  out: "./migrations",
  dialect: "postgresql",
  schema: "./schemas/index.ts",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;