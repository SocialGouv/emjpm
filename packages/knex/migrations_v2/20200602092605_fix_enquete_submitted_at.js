exports.up = function(knex) {
  return knex.schema.alterTable("enquete_reponses", table => {
    table
      .timestamp("submitted_at")
      .defaultTo(null)
      .alter();
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("enquete_reponses", table => {
    table
      .timestamp("submitted_at")
      .defaultTo(knex.fn.now())
      .alter();
  });
};
