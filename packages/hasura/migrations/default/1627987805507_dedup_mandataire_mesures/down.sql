-- Could not auto-generate a down migration.
-- Please write an appropriate down migration for the SQL below:
-- DELETE FROM mesures
WHERE id IN (
  SELECT id FROM mesures m 
  INNER JOIN (
    SELECT min(id) AS min_id, mandataire_id, numero_rg, ti_id, code_postal, annee_naissance, date_nomination, numero_dossier, lieu_vie, nature_mesure, champ_mesure, status, date_protection_en_cours
    FROM mesures
    WHERE mandataire_id IS NOT NULL AND numero_dossier IS NOT NULL AND numero_rg != ''
    GROUP BY mandataire_id, numero_rg, ti_id, code_postal, annee_naissance, date_nomination, numero_dossier, lieu_vie, nature_mesure, champ_mesure, status, date_protection_en_cours
    HAVING   COUNT(*) > 1
  ) m2 ON (
    m.mandataire_id = m2.mandataire_id AND m2.mandataire_id IS NOT NULL AND
    m.numero_rg = m2.numero_rg AND m2.numero_rg IS NOT NULL AND
    m.ti_id = m2.ti_id AND
    (m.code_postal IS NULL OR m.code_postal = m2.code_postal) AND
    (m.annee_naissance IS NULL OR m.annee_naissance = m2.annee_naissance) AND
    (m.date_nomination IS NULL OR m.date_nomination = m2.date_nomination) AND
    (m.numero_dossier IS NULL OR m.numero_dossier = m2.numero_dossier) AND
    (m.lieu_vie IS NULL OR m.lieu_vie = m2.lieu_vie) AND
    (m.nature_mesure IS NULL OR m.nature_mesure = m2.nature_mesure) AND
    (m.champ_mesure IS NULL OR m.champ_mesure = m2.champ_mesure) AND
    (m.status IS NULL OR m.status = m2.status) AND
    (m.date_protection_en_cours IS NULL OR m.date_protection_en_cours = m2.date_protection_en_cours)
  )
  WHERE m.id > m2.min_id
);
