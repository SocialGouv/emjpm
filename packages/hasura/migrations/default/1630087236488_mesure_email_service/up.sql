CREATE FUNCTION mesure_email_service(mesure_row mesures)
RETURNS TEXT AS $$
  SELECT services.email FROM services WHERE services.id = mesure_row.service_id
$$ LANGUAGE sql STABLE;
