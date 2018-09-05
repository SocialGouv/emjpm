const ON_MESURE_COUNT = `

`;

const DROP_ON_MESURE_COUNT = `DROP FUNCTION on_update_timestamp`;

exports.up = knex => knex.raw(ON_MESURE_COUNT);
exports.down = knex => knex.raw(DROP_ON_MESURE_COUNT);
