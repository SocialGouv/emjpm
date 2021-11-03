const knex = require("~/db/knex");

module.exports = async function availableMesureNbReal({
  departementCode,
  regionId,
}) {
  let nbGlobal;
  if (departementCode) {
    const {
      rows: [{ count }],
    } = await knex.raw(
      `
      SELECT
        sum(v.mesures_max) - sum(v.mesures_in_progress) - sum(v.mesures_awaiting) as count
      FROM
        view_mesure_gestionnaire_departement v
      WHERE
        v.departement_code = ? AND
        v.mesures_max > 0 AND
        v.suspend_activity IS NOT TRUE AND
        v.mesures_max::int - v.mesures_in_progress::int - v.mesures_awaiting::int > 0
    `,
      [departementCode]
    );
    nbGlobal = count;
  } else if (regionId) {
    const {
      rows: [{ count }],
    } = await knex.raw(
      `
      SELECT
        sum(v.mesures_max) - sum(v.mesures_in_progress) - sum(v.mesures_awaiting) as count
      FROM
        view_mesure_gestionnaire_departement v
        JOIN departements d ON (((v.departement_code) :: text = (d.id) :: text))
      WHERE
        d.id_region = ? AND
        v.mesures_max > 0 AND
        v.suspend_activity IS NOT TRUE AND
        v.mesures_max::int - v.mesures_in_progress::int - v.mesures_awaiting::int > 0
    `,
      [regionId]
    );
    nbGlobal = count;
  } else {
    const {
      rows: [{ count }],
    } = await knex.raw(`
      SELECT
        sum(v.mesures_max) - sum(v.mesures_in_progress) - sum(v.mesures_awaiting) as count
      FROM
        view_mesure_gestionnaire v
      WHERE
        v.mesures_max > 0 AND
        v.suspend_activity IS NOT TRUE AND
        v.mesures_max::int - v.mesures_in_progress::int - v.mesures_awaiting::int > 0
    `);
    nbGlobal = count;
  }
  return nbGlobal || 0;
};
