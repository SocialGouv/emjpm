exports.up = async function(knex) {
  await knex.schema.createTable("lb_users", function(table) {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("user_id")
      .references("id")
      .inTable("users");
    table.string("email");
    table.string("nom");
    table.string("prenom");
  });
  await knex.schema.createTable("lb_departements", function(table) {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("lb_user_id")
      .references("id")
      .inTable("lb_users");
    table
      .integer("departement_id")
      .references("id")
      .inTable("departements");
    table.boolean("individuel").defaultTo(false);
    table.boolean("prepose").defaultTo(false);
    table.boolean("service").defaultTo(false);
    table.boolean("ti").defaultTo(false);
  });
  await knex.schema.createTable("lb_structures", function(table) {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("lb_departement_id")
      .references("id")
      .inTable("lb_departements");
    table.string("type");
    table.string("nom");
  });
  return knex.schema.createTable("lb_tribunaux", function(table) {
    table.increments();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .integer("lb_departement_id")
      .references("id")
      .inTable("lb_departements");
    table.string("ville");
  });
};

exports.down = function(knex) {
  return knex.raw(`
  DROP TABLE lb_tribunaux;
  DROP TABLE lb_structures;
  DROP TABLE lb_departements;
  DROP TABLE lb_users;
  `);
};
