CREATE TABLE "material" (
	"id" serial PRIMARY KEY NOT NULL,
	"pdf" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
