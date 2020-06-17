exports.up = async function (knex) {
  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.string("status").defaultTo("draft");
  });
  await knex.raw(`
    update enquete_reponses set status = 'submitted' where status = 'draft' and submitted_at is not null;
  `);
};

exports.down = async function (knex) {
  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.dropColumn("status");
  });
};
