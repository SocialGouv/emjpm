exports.up = async function (knex) {
  await knex.schema.createTable("mandataire_tis", (table) => {
    table.increments("id").primary();
    table.integer("mandataire_id").references("id").inTable("mandataires");
    table.integer("ti_id").references("id").inTable("tis");
    table.datetime("created_at");
  });
  return knex.raw(`
INSERT INTO mandataire_tis (mandataire_id, ti_id, created_at)
 SELECT m.id, ut.ti_id, ut.created_at
  FROM user_tis ut, users u, mandataires m
  WHERE ut.user_id = u.id and u.id = m.user_id;
  `);
};

exports.down = function () {};
