exports.up = async function (knex) {
  return knex.schema.createTable("processus_states", (table) => {
    table.increments("id");
    table.string("processus_key");
    table.datetime("start_date");
    table.datetime("end_date");
  });
};

exports.down = async function (knex) {
};
