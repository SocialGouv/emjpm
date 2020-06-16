exports.up = async function (knex) {
  await knex.schema.createTable("service_personnels", function (table) {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("service_id")
      .references("id")
      .inTable("services")
      .notNullable();
    table.float("nombre_postes_delegues_etp");
    table.integer("nombre_delegues");
    table.float("nombre_poste_autre_personnel_etp");
    table.integer("nombre_delegues_cnc");
    table.integer("nombre_delegues_cnc_pjm");
    table.integer("nombre_delegues_cnc_maj");
    table.integer("nombre_delegues_cnc_dpf");
    table.integer("nombre_delegues_en_formation");
    table.integer("nombre_delegues_non_formes");
  });
  return knex.raw(`
  insert into service_personnels (service_id) (select id from services);
  `);
};

exports.down = async function (knex) {
  await knex.raw(`
  DROP TABLE service_personnels;
  `);
};
