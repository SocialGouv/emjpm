CREATE FUNCTION mesure_email_mandataire(mesure_row mesures)
RETURNS TEXT AS $$
  SELECT users.email FROM users, mandataires WHERE mandataires.id = mesure_row.mandataire_id AND users.id = mandataires.user_id
$$ LANGUAGE sql STABLE;
