exports.up = async function (knex) {
  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.string("user_type").defaultTo(null);
  });
  await knex.raw(`
    update public.enquete_reponses er
    set user_type = subquery.type
    from (SELECT u.type, er2.id as er2_id FROM public.enquete_reponses er2 join public.mandataires m on m.id = er2.mandataire_id join public.users u on u.id = m.user_id) as subquery
    WHERE er.id = subquery.er2_id;
    `);
  await knex.raw(`
    update public.enquete_reponses
    set user_type = 'service'
    WHERE user_type is null;
    `);
  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.string("user_type").nullable(false).alter();
  });
};

exports.down = async function (knex) {
  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.dropColumn("user_type");
  });
};
