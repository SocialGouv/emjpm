exports.up = async function(knex) {
  await knex.schema.alterTable("user_antenne", function(table) {
    table.unique(["user_id", "antenne_id"]);
  });
  return knex.raw(`
insert into user_antenne (user_id, antenne_id) select sa.user_id, se.id from service_admin sa, service_antenne se where sa.service_id = se.service_id;
  `);
};

exports.down = function(knex) {
  return knex.schema.alterTable("user_antenne", function(table) {
    table.dropUnique(["user_id", "antenne_id"]);
  });
};
