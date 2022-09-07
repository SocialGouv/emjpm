CREATE TABLE "public"."dpfi_departements" ("id" serial NOT NULL, "created_at" timestamptz DEFAULT CURRENT_TIMESTAMP, "departement_financeur" boolean, "departement_code" varchar, "liste_blanche_id" integer, PRIMARY KEY ("id") , FOREIGN KEY ("departement_code") REFERENCES "public"."departements"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("liste_blanche_id") REFERENCES "public"."liste_blanche"("id") ON UPDATE cascade ON DELETE cascade);
