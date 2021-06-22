CREATE TABLE "public"."impersonate_log" ("id" serial NOT NULL, "admin_user_id" integer NOT NULL, "user_id" integer NOT NULL, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
