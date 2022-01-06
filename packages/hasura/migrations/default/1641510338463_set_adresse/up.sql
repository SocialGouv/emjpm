UPDATE mandataires SET adresse = TRIM(CONCAT(COALESCE(location_adresse, ''), ' ', COALESCE(location_code_postal, ''), ' ', COALESCE(location_ville, '')));
