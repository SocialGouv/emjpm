UPDATE service_antenne SET departement_code = (SELECT departement_code FROM code_postal WHERE code_postal.code_postal = service_antenne.code_postal);
UPDATE service_antenne SET departement_code = SUBSTRING(service_antenne.code_postal, 0, 3) WHERE departement_code IS NULL;
