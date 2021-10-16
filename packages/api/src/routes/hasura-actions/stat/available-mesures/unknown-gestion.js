const knex = require("~/db/knex");

module.exports = async function availableMesureNbUnkownGestion({
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
        count(*)
      FROM
        view_mesure_gestionnaire_departement v
      WHERE
        v.departement_code = ? AND
        v.mesures_max <= 0
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
        count(*)
      FROM
        view_mesure_gestionnaire_departement v
        JOIN departements d ON (((v.departement_code) :: text = (d.id) :: text))
      WHERE
        d.id_region = ? AND
        (v.suspend_activity IS NOT TRUE AND v.mesures_max <= 0)
    `,
      [regionId]
    );
    nbGlobal = count;
  } else {
    const {
      rows: [{ count }],
    } = await knex.raw(`
      SELECT
        count(*)
      FROM
        view_mesure_gestionnaire v
      WHERE
        (v.suspend_activity IS NOT TRUE AND v.mesures_max <= 0)
    `);
    nbGlobal = count;
  }
  return nbGlobal || 0;
};
