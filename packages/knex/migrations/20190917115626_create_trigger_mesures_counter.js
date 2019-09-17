exports.up = function(knex) {
  return knex.raw(`
CREATE TRIGGER on_mesures_change
	AFTER update or insert or delete ON mesures
	FOR EACH ROW
	EXECUTE PROCEDURE update_mesure_counter();

CREATE OR REPLACE FUNCTION update_mesure_counter()
  RETURNS trigger AS $$
  BEGIN
	IF OLD.mandataire_id is not null THEN
		UPDATE mANDataires SET mesures_en_cours = (
			SELECT count(mesures.id) FROM mesures WHERE mesures.mandataire_id = mANDataires.id AND mesures.status = 'Mesure en cours'
		) WHERE id = OLD.mandataire_id;
		UPDATE mANDataires SET mesures_en_attente = (
			SELECT count(mesures.id) FROM mesures WHERE mesures.mandataire_id = mANDataires.id AND mesures.status = 'Mesure en attente'
		) WHERE id = OLD.mandataire_id;
	END IF;
	IF OLD.antenne_id is not null THEN
		UPDATE service_antenne SET mesures_in_progress = (
			SELECT count(mesures.id) FROM mesures WHERE mesures.antenne_id = service_antenne.id AND mesures.status = 'Mesure en cours'
		) WHERE id = OLD.antenne_id;
		UPDATE service_antenne SET mesures_awaiting = (
			SELECT count(mesures.id) FROM mesures WHERE mesures.antenne_id = service_antenne.id AND mesures.status = 'Mesure en attente'
		) WHERE id = OLD.antenne_id;
	END IF;
	return OLD;
  END;
$$ language 'plpgsql';
  `);
};

exports.down = function(knex) {
  return knex.raw(`
DROP TRIGGER on_mesures_change ON mesures;
DROP FUNCTION update_mesure_counter;
  `);
};
