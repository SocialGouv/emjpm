const {
  VIEW_MESURE_GESTIONNAIRE,
  VIEW_DEPARTMENT_AVAILIBILITY
} = require("../sql/views");

exports.up = async function(knex) {
  await knex.raw(`
DROP VIEW IF EXISTS view_department_availability
  `);
  await knex.raw(`
DROP VIEW IF EXISTS view_mesure_gestionnaire
  `);

  await knex.raw(VIEW_MESURE_GESTIONNAIRE);

  return knex.raw(VIEW_DEPARTMENT_AVAILIBILITY);
};

exports.down = async function(knex) {
  await knex.raw(`
DROP VIEW IF EXISTS view_department_availability
  `);

  await knex.raw(`
DROP VIEW IF EXISTS view_mesure_gestionnaire
  `);

  await knex.raw(`
CREATE VIEW view_mesure_gestionnaire AS
 SELECT dep.id department_id, dep.nom dep_nom, 'ANTENNE' discriminator, ser.id source_id, ser.mesures_awaiting, ser.mesures_in_progress, ser.mesures_max
  FROM service_antenne ser, departements dep
   WHERE dep.code = substring(ser.address_zip_code, 0, 3)
union
 SELECT dep.id department_id, dep.nom dep_nom,'MANDATAIRE' discriminator, man.id source_id, man.mesures_en_attente mesures_awaiting, man.mesures_en_cours mesures_in_progress, man.dispo_max mesures_max
  FROM mandataires man, departements dep
   WHERE dep.code = substring(man.code_postal, 0, 3)
  `);

  return knex.raw(VIEW_MESURE_GESTIONNAIRE);
};
