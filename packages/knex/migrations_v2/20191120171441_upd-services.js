exports.up = async function (knex) {
  await knex.schema.alterTable("services", function (table) {
    table.integer("mesures_in_progress");
    table.integer("mesures_awaiting");
  });
  return knex.raw(`
update services s set mesures_in_progress = (select count(m.id) from mesures m where m.service_id = s.id and m.status = 'Mesure en cours');
update services s set mesures_awaiting = (select count(m.id) from mesures m where m.service_id = s.id and m.status = 'Mesure en attente');
  `);
};

exports.down = function (knex) {
  return knex.schema.alterTable("services", function (table) {
    table.dropColumn("mesures_in_progress");
    table.dropColumn("mesures_awaiting");
  });
};
