exports.up = function(knex, Promise) {
  /*
    - ajouter une colonne users.type :
      - admin
      - individuel
      - prepose
      - service
      - ti
    - ajouter une colonne users.last_login (datetime)
    - ajouter une colonne users.active (boolean)

    - admin=true -> type=admin
    - admin=false, mandataire=ƒalse, service=true -> type=ti
    - admin=false, mandataire=true, service=true -> type=service
    - admin=false, mandataire=true, service=false -> type=mandataire
    - admin=false, mandataire=false, service=false -> type=ti


    code:
      - update last_login
  */

  return (
    knex.schema
      // ajoutes les colonnes necessaires
      .alterTable("users", function(table) {
        table.string("type", 20);
        table.dateTime("last_login");
        table.boolean("active").defaultTo(false);
      })
      // met à jour la table user.
      // utilise Promise.all pour gérer les requetes async
      .then(() => {
        return knex
          .select()
          .table("users")
          .then(users => {
            return Promise.all(
              users.map(user => {
                if (user.admin) {
                  // type=admin
                  return knex
                    .table("userers")
                    .where({ id: user.id })
                    .update({
                      type: "admin",
                      active: true
                    });
                } else if (!user.admin && !user.mandataire && user.service) {
                  // type=ti
                  return knex
                    .table("users")
                    .where({ id: user.id })
                    .update({
                      type: "ti",
                      active: true
                    });
                } else if (!user.admin && user.mandataire && user.service) {
                  // type=service
                  return knex
                    .table("users")
                    .where({ id: user.id })
                    .update({
                      type: "service",
                      active: true
                    });
                } else if (!user.admin && user.mandataire && !user.service) {
                  // type=mandataire
                  return knex
                    .table("users")
                    .where({ id: user.id })
                    .update({
                      type: "individuel",
                      active: true
                    });
                } else if (!user.admin && !user.mandataire && !user.service) {
                  // type=ti
                  return knex
                    .table("users")
                    .where({ id: user.id })
                    .update({
                      type: "ti",
                      active: true
                    });
                }
              })
            );
          });
      })
      .then(() => {
        return knex.schema.alterTable("users", function(table) {
          table.dropColumn("admin");
          table.dropColumn("mandataire");
          table.dropColumn("service");
        });
      })
  );
};

exports.down = function(knex, Promise) {
  return knex.schema
    .alterTable("users", function(table) {
      table.dropColumn("type");
      table.dropColumn("last_login");
      table.dropColumn("active");
    })
    .then(() => {
      knex.schema.alterTable("users", function(table) {
        table.boolean("admin");
        table.boolean("mandataire");
        table.boolean("service");
      });
    });
};
