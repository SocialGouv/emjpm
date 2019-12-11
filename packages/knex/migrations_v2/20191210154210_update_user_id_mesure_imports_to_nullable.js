exports.up = async function(knex) {
  await knex.raw(
    "alter table mesures_import alter column user_id drop not null"
  );
};

exports.down = async function(knex) {
  await knex.raw(
    "alter table mesures_import alter column user_id set not null"
  );
};
