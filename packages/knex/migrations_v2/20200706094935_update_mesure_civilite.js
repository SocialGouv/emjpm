const table = "mesure_protection_etat";

exports.up = async function (knex) {
  return knex.raw(`
CREATE TYPE civilite_type AS ENUM ('madame', 'monsieur');
ALTER TABLE mesures ADD civilite2 civilite_type;

UPDATE mesures set civilite2 = 'monsieur' where civilite in ('H', 'M');
UPDATE mesures set civilite2 = 'madame' where civilite in ('F', 'f');

ALTER TABLE mesures DROP COLUMN civilite;
ALTER TABLE mesures RENAME civilite2 TO civilite;
  `);
};

exports.down = async function (knex) {
  return knex.raw(`
ALTER TABLE mesures ADD civilite2 varchar(255);
UPDATE mesures set civilite2 = 'H'  where civilite = 'monsieur';
UPDATE mesures set civilite2 = 'F'  where civilite = 'madame';

ALTER TABLE mesures DROP COLUMN civilite;
ALTER TABLE mesures RENAME civilite2 TO civilite;

DROP TYPE civilite_type;

  `);
};


