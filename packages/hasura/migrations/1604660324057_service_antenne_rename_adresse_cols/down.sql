
alter table "public"."service_antenne" rename column "adresse" to "address";

alter table "public"."service_antenne" rename column "code_postal" to "address_zip_code";

alter table "public"."service_antenne" rename column "ville" to "address_city";
