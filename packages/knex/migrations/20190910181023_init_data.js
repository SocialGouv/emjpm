exports.up = async function(knex) {
  return knex.raw(`
  UPDATE mandataires SET mesures_en_attente = 0 where mesures_en_attente is NULL;
  ALTER TABLE mandataires ALTER COLUMN mesures_en_attente SET default 0;
  ALTER TABLE mandataires ALTER COLUMN mesures_en_attente SET NOT NULL;

  UPDATE mandataires SET mesures_en_cours = 0 where mesures_en_cours is NULL;
  ALTER TABLE mandataires ALTER COLUMN mesures_en_cours SET default 0;
  ALTER TABLE mandataires ALTER COLUMN mesures_en_cours SET NOT NULL;

  `);
};

exports.down = function(knex) {
  return knex.raw(`
  ALTER TABLE mandataires ALTER COLUMN mesures_en_attente DROP NOT NULL;
  ALTER TABLE mandataires ALTER COLUMN mesures_en_cours DROP NOT NULL;
  `);
};
