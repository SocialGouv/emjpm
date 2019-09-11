exports.up = async function(knex) {
  return knex.raw(`
insert into service_admin (user_id, service_id) select id, service_id from users where service_id is not null;
alter table users drop service_id CASCADE;
  `);
};

exports.down = function(knex) {
  return knex.schema.alterTable("users", function(table) {
    table.integer("service_id").unique();
    table
      .foreign("service_id")
      .references("id")
      .inTable("services");
  });
};
