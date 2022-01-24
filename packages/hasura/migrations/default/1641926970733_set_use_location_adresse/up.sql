UPDATE mandataires SET use_location_adresse = TRUE WHERE NULLIF(adresse,'') IS NULL;
UPDATE services SET use_location_adresse = TRUE WHERE NULLIF(adresse,'') IS NULL;
