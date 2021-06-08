INSERT INTO service_departements (service_id, departement_code) (SELECT id, departement_code FROM services WHERE departement_code IS NOT NULL);
