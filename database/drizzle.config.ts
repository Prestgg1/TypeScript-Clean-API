import type { Config } from "drizzle-kit";
export default {
  schema: "./schemas/*",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;