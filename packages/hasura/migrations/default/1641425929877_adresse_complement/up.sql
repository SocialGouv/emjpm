UPDATE services ser SET adresse_complement = (SELECT adresse_complement FROM liste_blanche WHERE siret = ser.siret LIMIT 1);
UPDATE mandataires man SET adresse_complement = (SELECT adresse_complement FROM liste_blanche WHERE siret = man.siret LIMIT 1);
