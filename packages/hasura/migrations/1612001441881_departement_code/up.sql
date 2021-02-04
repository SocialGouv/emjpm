-- departement_id
ALTER TABLE "public"."lb_departements" ADD COLUMN "departement_code" varchar(255) NULL;
ALTER TABLE "public"."lb_departements" DROP CONSTRAINT lb_departements_departement_id_fkey;

ALTER TABLE "public"."enquete_reponses" ADD COLUMN "departement_code" varchar(255) NULL;
ALTER TABLE "public"."enquete_reponses" DROP CONSTRAINT enquete_reponses_departement_id_fkey;

ALTER TABLE "public"."tis" ADD COLUMN "departement_code" varchar(255) NULL;
ALTER TABLE "public"."tis" DROP CONSTRAINT tis_departement_id_fkey;

ALTER TABLE "public"."etablissements" ADD COLUMN "departement_code" varchar(255) NULL;
ALTER TABLE "public"."etablissements" DROP CONSTRAINT etablissements_departement_id_fkey;

--department_id
ALTER TABLE "public"."services" ADD COLUMN "departement_code" varchar(255) NULL;
ALTER TABLE "public"."services" DROP CONSTRAINT services_department_id_fkey;

ALTER TABLE "public"."mandataires" ADD COLUMN "departement_code" varchar(255) NULL;
ALTER TABLE "public"."mandataires" DROP CONSTRAINT mandataires_department_id_fkey;

ALTER TABLE "public"."mesures" ADD COLUMN "departement_code" varchar(255) NULL;
ALTER TABLE "public"."mesures" DROP CONSTRAINT mesures_department_id_fkey;

ALTER TABLE "public"."direction" ADD COLUMN "departement_code" varchar(255) NULL;
ALTER TABLE "public"."direction" DROP CONSTRAINT direction_department_id_fkey;

-- migrate data
update "public"."lb_departements" set departement_code = (
    select dep.code from departements dep where dep.id = departement_id
) where departement_id is not null;
update "public"."enquete_reponses" set departement_code = (
    select dep.code from departements dep where dep.id = departement_id
) where departement_id is not null;
update "public"."tis" set departement_code = (
    select dep.code from departements dep where dep.id = departement_id
) where departement_id is not null;
update "public"."etablissements" set departement_code = (
    select dep.code from departements dep where dep.id = departement_id
) where departement_id is not null;

update "public"."services" set departement_code = (
    select dep.code from departements dep where dep.id = department_id
) where department_id is not null;
update "public"."mandataires" set departement_code = (
    select dep.code from departements dep where dep.id = department_id
) where department_id is not null;
update "public"."mesures" set departement_code = (
    select dep.code from departements dep where dep.id = department_id
) where department_id is not null;
update "public"."direction" set departement_code = (
    select dep.code from departements dep where dep.id = department_id
) where department_id is not null;

-- change column type
ALTER TABLE "public"."departements" DROP CONSTRAINT departements_pkey;
ALTER TABLE "public"."departements" DROP COLUMN id;
ALTER TABLE "public"."departements" RENAME code TO id;
ALTER TABLE "public"."departements" ADD CONSTRAINT departements_pkey PRIMARY KEY (id);

-- restore FK
ALTER TABLE "public"."lb_departements" ADD CONSTRAINT lb_departements_departement_code_fkey FOREIGN KEY (departement_code) REFERENCES departements (id);
ALTER TABLE "public"."enquete_reponses" ADD CONSTRAINT enquete_reponses_departement_code_fkey FOREIGN KEY (departement_code) REFERENCES departements (id);
ALTER TABLE "public"."tis" ADD CONSTRAINT tis_departement_code_fkey FOREIGN KEY (departement_code) REFERENCES departements (id);
ALTER TABLE "public"."etablissements" ADD CONSTRAINT etablissements_departement_code_fkey FOREIGN KEY (departement_code) REFERENCES departements (id);
ALTER TABLE "public"."services" ADD CONSTRAINT services_departement_code_fkey FOREIGN KEY (departement_code) REFERENCES departements (id);
ALTER TABLE "public"."mandataires" ADD CONSTRAINT mandataires_departement_code_fkey FOREIGN KEY (departement_code) REFERENCES departements (id);
ALTER TABLE "public"."mesures" ADD CONSTRAINT mesures_departement_code_fkey FOREIGN KEY (departement_code) REFERENCES departements (id);
ALTER TABLE "public"."direction" ADD CONSTRAINT direction_departement_code_fkey FOREIGN KEY (departement_code) REFERENCES departements (id);
