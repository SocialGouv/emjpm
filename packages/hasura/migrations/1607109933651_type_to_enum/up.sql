


CREATE TABLE "public"."champ_mesure"("value" text, "label" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO champ_mesure (value, label) VALUES
  ('protection_bien', 'protection des biens'),
  ('protection_personne', 'protection de la personne'),
  ('protection_bien_personne', 'protection des biens et de la personne');

ALTER TABLE "public"."mesure_etat" ALTER COLUMN "champ_mesure" TYPE text;

alter table "public"."mesure_etat"
           add constraint "mesure_etat_champ_mesure_fkey"
           foreign key ("champ_mesure")
           references "public"."champ_mesure"
           ("value") on update restrict on delete restrict;

CREATE TABLE "public"."nature_mesure"("value" text NOT NULL, "label" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO nature_mesure (value, label) VALUES
  ('curatelle_simple', 'curatelle simple'),
  ('curatelle_renforcee', 'curatelle renforcée'),
  ('tutelle', 'tutelle'),
  ('sauvegarde_justice', 'sauvegarde justice avec mandat spécial'),
  ('mesure_accompagnement_judiciaire', 'mesure d''accompagnement judiciaire'),
  ('subroge_curateur', 'subrogé curateur'),
  ('subroge_tuteur', 'subrogé tuteur'),
  ('mandat_protection_future', 'mandat protection future'),
  ('mesure_ad_hoc', 'mesure ad hoc');

ALTER TABLE "public"."mesure_etat" ALTER COLUMN "nature_mesure" TYPE text;

alter table "public"."mesure_etat"
           add constraint "mesure_etat_nature_mesure_fkey"
           foreign key ("nature_mesure")
           references "public"."nature_mesure"
           ("value") on update restrict on delete restrict;

ALTER TABLE "public"."mesure_etat" ALTER COLUMN "lieu_vie" TYPE text;

ALTER TABLE "public"."mesure_etat" ALTER COLUMN "type_etablissement" TYPE text;

CREATE TABLE "public"."lieu_vie_majeur"("value" text NOT NULL, "label" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO lieu_vie_majeur (value, label) VALUES
  ('domicile', 'domicile'),
  ('etablissement', 'établissement'),
  ('etablissement_conservation_domicile', 'établissement avec conservation domicile'),
  ('sdf', 'SDF');

CREATE TABLE "public"."type_etablissement"("value" text NOT NULL, "label" text NOT NULL, PRIMARY KEY ("value") );

INSERT INTO type_etablissement (value, label) VALUES
  ('etablissement_handicapes', 'établissement ou service pour handicapés'),
  ('etablissement_personne_agee', 'établissement pour personnes agées'),
  ('etablissement_conservation_domicile', 'établissement avec conservation domicile'),
  ('autre_etablissement_s_ms', 'autre établissement social ou médico-social'),
  ('etablissement_hospitalier', 'établissement hospitalier'),
  ('etablissement_psychiatrique', 'établissement psychiatrique'),
  ('autre_etablissement', 'autre établissement');

alter table "public"."mesure_etat"
           add constraint "mesure_etat_lieu_vie_fkey"
           foreign key ("lieu_vie")
           references "public"."lieu_vie_majeur"
           ("value") on update restrict on delete restrict;

alter table "public"."mesure_etat"
           add constraint "mesure_etat_type_etablissement_fkey"
           foreign key ("type_etablissement")
           references "public"."type_etablissement"
           ("value") on update restrict on delete restrict;

ALTER TABLE "public"."mesures" ALTER COLUMN "type_etablissement" TYPE text;

ALTER TABLE "public"."mesures" ALTER COLUMN "champ_mesure" TYPE text;

ALTER TABLE "public"."mesures" ALTER COLUMN "cause_sortie" TYPE text;

ALTER TABLE "public"."mesures" ALTER COLUMN "status" TYPE text;

ALTER TABLE "public"."mesures" ALTER COLUMN "nature_mesure" TYPE text;

alter table "public"."mesures"
           add constraint "mesures_champ_mesure_fkey"
           foreign key ("champ_mesure")
           references "public"."champ_mesure"
           ("value") on update restrict on delete restrict;

ALTER TABLE "public"."mesures" ALTER COLUMN "lieu_vie" TYPE text;

alter table "public"."mesures"
           add constraint "mesures_lieu_vie_fkey"
           foreign key ("lieu_vie")
           references "public"."lieu_vie_majeur"
           ("value") on update restrict on delete restrict;

alter table "public"."mesures"
           add constraint "mesures_nature_mesure_fkey"
           foreign key ("nature_mesure")
           references "public"."nature_mesure"
           ("value") on update restrict on delete restrict;

alter table "public"."mesures"
           add constraint "mesures_type_etablissement_fkey"
           foreign key ("type_etablissement")
           references "public"."type_etablissement"
           ("value") on update restrict on delete restrict;

ALTER TABLE "public"."mesures" ALTER COLUMN "resultat_revision" TYPE text;

CREATE TABLE "public"."resultat_revision"("value" text NOT NULL, "label" text NOT NULL, PRIMARY KEY ("value") );

insert into resultat_revision values ('mainlevee','mainlevée'),
('reconduction','reconduction de la mesure'),
('aggravation','aggravation'),
('allegement','allégement'),
('dessaisissement_famille','désaissement en faveur de la famille'),
('dessaisissement_autre_mjpm','désaississement en faveur d''un autre MJPM');

alter table "public"."mesures"
           add constraint "mesures_resultat_revision_fkey"
           foreign key ("resultat_revision")
           references "public"."resultat_revision"
           ("value") on update restrict on delete restrict;

CREATE TABLE "public"."cause_sortie"("value" text NOT NULL, "label" text NOT NULL, PRIMARY KEY ("value") );

alter table "public"."cause_sortie" rename to "cause_sortie_mesure";

insert into cause_sortie_mesure values ('mainlevee','mainlevée'),
('deces','décès'),
('caducite','caducité'),
('dessaisissement_famille','désaissement en faveur de la famille'),
('dessaisissement_autre_mjpm','désaississement en faveur d''un autre MJPM');

alter table "public"."mesures"
           add constraint "mesures_cause_sortie_fkey"
           foreign key ("cause_sortie")
           references "public"."cause_sortie_mesure"
           ("value") on update restrict on delete restrict;

alter table "public"."resultat_revision" rename to "resultat_revision_mesure";

drop type cause_sortie_type;
drop type resultat_revision_type;
drop type nature_mesure_type;
drop type champ_mesure_type;
drop type type_etablissement_type;

CREATE TABLE "public"."civilite"("value" text NOT NULL, PRIMARY KEY ("value") );

insert into civilite (value) values ('madame'),('monsieur');

CREATE TABLE "public"."mesure_status"("value" text NOT NULL, PRIMARY KEY ("value") );

insert into mesure_status (value) values ('en_attente'),('en_cours'),('eteinte');

alter table "public"."mesures"
           add constraint "mesures_status_fkey"
           foreign key ("status")
           references "public"."mesure_status"
           ("value") on update restrict on delete restrict;

ALTER TABLE "public"."mesures" ALTER COLUMN "civilite" TYPE text;

alter table "public"."mesures"
           add constraint "mesures_civilite_fkey"
           foreign key ("civilite")
           references "public"."civilite"
           ("value") on update restrict on delete restrict;
