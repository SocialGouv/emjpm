CREATE OR REPLACE FUNCTION mesure_email_magistrat(mesure_row mesures)
RETURNS TEXT AS $$
  SELECT users.email FROM users, magistrat WHERE magistrat.id = mesure_row.magistrat_id AND users.id = magistrat.user_id
$$ LANGUAGE sql STABLE;
