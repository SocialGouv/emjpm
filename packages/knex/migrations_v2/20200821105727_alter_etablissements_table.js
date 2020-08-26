exports.up = async function (knex) {
  await knex.schema.alterTable("etablissements", (table) => {
    table.integer("departement_id").references("id").inTable("departements");
  });

  await knex.raw(
    `UPDATE etablissements SET departement_id = d.id FROM (SELECT id, code FROM departements) AS d WHERE SUBSTRING(code_postal, 0, 4) = d.code AND departement_id is null and code_postal like '97%';`
  );
  await knex.raw(
    `UPDATE etablissements SET departement_id = d.id FROM (SELECT id, code FROM departements) AS d WHERE SUBSTRING(code_postal, 0, 3) = d.code AND departement_id is null;`
  );
  await knex.raw(
    `UPDATE etablissements SET departement_id = d.id FROM (SELECT id FROM departements where code = '2A') AS d WHERE code_postal like '20%' and cast(code_postal as integer) < 20200 AND departement_id is null;`
  );
  await knex.raw(
    `UPDATE etablissements SET departement_id = d.id FROM (SELECT id FROM departements where code = '2B') AS d WHERE code_postal like '20%' and cast(code_postal as integer) >= 20200 AND departement_id is null;`
  );
};

exports.down = async function (knex) {
  await knex.schema.table("etablissements", (table) => {
    table.dropColumn("departement_id");
  });
};
