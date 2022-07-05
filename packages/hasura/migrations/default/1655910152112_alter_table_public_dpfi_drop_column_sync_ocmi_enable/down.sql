alter table "public"."dpfi" alter column "sync_ocmi_enable" set default false;
alter table "public"."dpfi" alter column "sync_ocmi_enable" drop not null;
alter table "public"."dpfi" add column "sync_ocmi_enable" bool;
