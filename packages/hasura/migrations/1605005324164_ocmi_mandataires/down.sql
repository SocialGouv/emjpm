
ALTER TABLE "public"."ocmi_mandataires" ADD COLUMN "id" int4;
ALTER TABLE "public"."ocmi_mandataires" ALTER COLUMN "id" DROP NOT NULL;

alter table "public"."ocmi_mandataires" drop constraint "ocmi_mandataires_pkey";
alter table "public"."ocmi_mandataires"
    add constraint "ocmi_mandataires_pkey" 
    primary key ( "id" );

DROP TABLE "public"."ocmi_mandataires";
