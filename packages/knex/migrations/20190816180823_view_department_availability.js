exports.up = async function (knex) {
  return knex.raw(`
CREATE VIEW view_department_availability AS
 SELECT department_id, sum(mesures_awaiting) mesures_awaiting, sum(mesures_in_progress) mesures_in_progress, sum(mesures_max) mesures_max
  FROM view_mesure_gestionnaire
  GROUP BY department_id
  `);
};

exports.down = function (knex) {
  return knex.raw(`
DROP VIEW view_department_availability
  `);
};
