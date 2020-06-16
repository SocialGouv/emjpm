exports.up = async function (knex) {
  await knex.raw(`
  alter table geolocalisation_code_postal alter column cities type varchar(255);
  alter table geolocalisation_code_postal drop constraint codepostallatlngs_code_postal_unique;
  `);
  return knex.schema
    .alterTable("services", function (table) {
      table.float("latitude");
      table.float("longitude");
    })
    .alterTable("mandataires", function (table) {
      table.float("latitude");
      table.float("longitude");
    })
    .alterTable("mesures", function (table) {
      table.float("latitude");
      table.float("longitude");
    })
    .alterTable("geolocalisation_code_postal", function (table) {
      table.string("insee");
    });
};

exports.down = async function (knex) {
  await knex.raw(`
  alter table geolocalisation_code_postal drop column cities;
  alter table geolocalisation_code_postal add column cities text[];
  `);
  return knex.schema
    .alterTable("services", function (table) {
      table.dropColumn("latitude");
      table.dropColumn("longitude");
    })
    .alterTable("mandataires", function (table) {
      table.dropColumn("latitude");
      table.dropColumn("longitude");
    })
    .alterTable("mesures", function (table) {
      table.dropColumn("latitude");
      table.dropColumn("longitude");
    })
    .alterTable("geolocalisation_code_postal", function (table) {
      table.unique("code_postal");
      table.dropColumn("insee");
    });
};
