exports.up = async function (knex) {
  return knex.schema.createTable("processus_states", (table) => {
    table.string("id");
    table.datetime("start_date");
    table.datetime("end_date");
    table.primary("id");
  });
};

exports.down = async function (knex) {};
