

CREATE TABLE "public"."prestations_sociales"("value" text NOT NULL, PRIMARY KEY ("value") , UNIQUE ("value"));

ALTER TABLE "public"."mesure_ressources" DROP COLUMN "prestations_sociales" CASCADE;

CREATE TABLE "public"."mesure_ressources_prestations_sociales"("id" serial NOT NULL, "mesure_ressources_id" integer NOT NULL, "prestations_sociales" text NOT NULL, PRIMARY KEY ("id") , FOREIGN KEY ("mesure_ressources_id") REFERENCES "public"."mesure_ressources"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("prestations_sociales") REFERENCES "public"."prestations_sociales"("value") ON UPDATE restrict ON DELETE restrict, UNIQUE ("mesure_ressources_id", "prestations_sociales"));

ALTER TABLE "public"."mesure_ressources" ALTER COLUMN "niveau_ressource" TYPE numeric;
