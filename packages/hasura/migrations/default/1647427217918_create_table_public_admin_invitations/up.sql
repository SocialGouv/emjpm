CREATE TABLE "public"."admin_invitations" ("id" serial NOT NULL, "email" text NOT NULL, "token" text, "sent_at" timestamptz, "created_at" timestamptz NOT NULL DEFAULT now(), PRIMARY KEY ("id") );
