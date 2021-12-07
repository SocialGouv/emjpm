WITH ct AS
(
  SELECT
    id,
    ROW_NUMBER() OVER (PARTITION BY mandataire_id, numero_rg ORDER BY id) rn
  FROM
    mesures
)
UPDATE
  mesures
SET
  numero_rg = numero_rg || CASE WHEN ct.rn = 1 THEN '' ELSE ('-' || (ct.rn-1)::text) END
FROM
  ct
WHERE
  ct.id = mesures.id
  AND mandataire_id IS NOT NULL;
WITH ct AS
(
  SELECT
    id,
    ROW_NUMBER() OVER (PARTITION BY mandataire_id, numero_rg ORDER BY id) rn
  FROM
    mesures
)
UPDATE
  mesures
SET
  numero_rg = numero_rg || CASE WHEN ct.rn = 1 THEN '' ELSE ('-' || (ct.rn-1)::text) END
FROM
  ct
WHERE
  ct.id = mesures.id
  AND mandataire_id IS NOT NULL;

alter table "public"."mesures" drop constraint if exists "mesures_mandataire_id_ti_id_numero_rg_key";
alter table "public"."mesures" add constraint "mesures_mandataire_id_ti_id_numero_rg_key" unique ("mandataire_id", "ti_id", "numero_rg");
