
CREATE TABLE "public"."mesure_en_attente_reouverture" ("id" serial NOT NULL, "mesure_id" integer NOT NULL, "annee_naissance" text NOT NULL, "cabinet" text NOT NULL, "champ_mesure" text NOT NULL, "civilite" text NOT NULL, "judgment_date" date NOT NULL, "magistrat_id" integer NOT NULL, "mandataire_id" integer NOT NULL, "service_id" integer NOT NULL, "ti_id" integer NOT NULL, "is_urgent" boolean DEFAULT false, "antenne_id" integer, "nature_mesure" text, PRIMARY KEY ("id") , FOREIGN KEY ("mesure_id") REFERENCES "public"."mesures"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("champ_mesure") REFERENCES "public"."champ_mesure"("value") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("magistrat_id") REFERENCES "public"."magistrat"("id") ON UPDATE set null ON DELETE set null, FOREIGN KEY ("mandataire_id") REFERENCES "public"."mandataires"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("service_id") REFERENCES "public"."services"("id") ON UPDATE cascade ON DELETE cascade, FOREIGN KEY ("ti_id") REFERENCES "public"."tis"("id") ON UPDATE restrict ON DELETE restrict, FOREIGN KEY ("antenne_id") REFERENCES "public"."service_antenne"("id") ON UPDATE set null ON DELETE set null, FOREIGN KEY ("nature_mesure") REFERENCES "public"."nature_mesure"("value") ON UPDATE restrict ON DELETE restrict);


alter table "public"."mesure_en_attente_reouverture" alter column "cabinet" drop not null;

alter table "public"."mesure_en_attente_reouverture" alter column "annee_naissance" drop not null;

alter table "public"."mesure_en_attente_reouverture" alter column "champ_mesure" drop not null;

alter table "public"."mesure_en_attente_reouverture" alter column "civilite" drop not null;

alter table "public"."mesure_en_attente_reouverture" alter column "judgment_date" drop not null;

alter table "public"."mesure_en_attente_reouverture" alter column "magistrat_id" drop not null;

alter table "public"."mesure_en_attente_reouverture" alter column "mandataire_id" drop not null;

alter table "public"."mesure_en_attente_reouverture" alter column "service_id" drop not null;

alter table "public"."mesure_en_attente_reouverture" alter column "ti_id" drop not null;

alter table "public"."mesure_en_attente_reouverture"
  add constraint "mesure_en_attente_reouverture_civilite_fkey"
  foreign key ("civilite")
  references "public"."civilite"
  ("value") on update restrict on delete restrict;

