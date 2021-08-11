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
