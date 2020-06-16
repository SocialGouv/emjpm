exports.up = async (knex) => {
  await knex.schema.createTable("magistrat", (table) => {
    table.increments();
    table
      .integer("user_id")
      .unique()
      .notNullable()
      .references("id")
      .inTable("users");
    table.integer("ti_id").notNullable().references("id").inTable("tis");
  });
  await knex.raw(`
DELETE FROM user_role where user_id IN (
  SELECT users.id FROM users WHERE users.type = 'ti' and users.id NOT IN (
    SELECT user_tis.user_id FROM user_tis
  )
);

DELETE FROM users WHERE users.type = 'ti' and users.id NOT IN (
  SELECT user_tis.user_id FROM user_tis
);

INSERT INTO magistrat (user_id, ti_id)
  SELECT users.id, user_tis.ti_id
    FROM users, user_tis
    WHERE users.id = user_tis.user_id
    AND users.type = 'ti';

DELETE FROM user_tis where user_tis.user_id IN (select id FROM users WHERE users.type = 'ti')
`);
};

exports.down = (knex) => {
  return knex.schema.dropTable("magistrat");
};
