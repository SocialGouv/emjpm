exports.up = function (knex) {
  return knex.schema.alterTable("mesures", function (table) {
    table.date("annee");
    table.string("type");
    table.date("date_ouverture");
    table.string("residence");
    table.string("civilite");
    table.float("latitude").alter();
    table.float("longitude").alter();
    table.dateTime("postDate").defaultTo(knex.fn.now()).alter();
  });
};

exports.down = function (knex) {
  const alterTable = () =>
    knex.schema.alterTable("mesures", function (table) {
      table.float("latitude").notNullable().alter();
      table.float("longitude").notNullable().alter();
      table.dateTime("postDate").alter();
    });

  return knex
    .table("mesures")
    .where("latitude", null)
    .update({ latitude: 0 })
    .then(() =>
      knex
        .table("mesures")
        .where("longitude", null)
        .update({ longitude: 0 })
        .then(() => {
          alterTable();
        })
    );
};
