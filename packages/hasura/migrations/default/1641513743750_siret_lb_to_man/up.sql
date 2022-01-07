UPDATE liste_blanche SET siret = NULL WHERE siret = '';
UPDATE
    mandataires man
SET
    siret = COALESCE((SELECT siret FROM liste_blanche lb WHERE lb.id = man.liste_blanche_id), man.siret)
WHERE
    man.liste_blanche_id IS NOT NULL;
