CREATE TABLE "public"."info_finance_annee"("type" text NOT NULL, "annee" integer NOT NULL, "montant" numeric NOT NULL, "id" serial NOT NULL, PRIMARY KEY ("id") , UNIQUE ("type", "annee"));
