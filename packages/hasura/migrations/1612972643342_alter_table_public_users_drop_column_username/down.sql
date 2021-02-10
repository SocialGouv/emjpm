ALTER TABLE "public"."users" ADD COLUMN "username" varchar;
ALTER TABLE "public"."users" ALTER COLUMN "username" DROP NOT NULL;
ALTER TABLE "public"."users" ADD CONSTRAINT users_username_unique UNIQUE (username);
