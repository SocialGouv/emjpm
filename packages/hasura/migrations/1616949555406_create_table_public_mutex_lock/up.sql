CREATE TABLE "public"."mutex_lock"("id" serial NOT NULL, "key" text NOT NULL, "expiration" timestamptz, PRIMARY KEY ("id") , UNIQUE ("key"));
