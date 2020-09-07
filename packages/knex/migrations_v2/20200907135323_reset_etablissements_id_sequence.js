exports.up = async function (knex) {
  await knex.raw("ALTER SEQUENCE etablissements_id_seq RESTART WITH 100000");
};

exports.down = function (knex) {};
