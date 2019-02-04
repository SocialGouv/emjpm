exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable("mandataires", function(table) {})
    .then(() => knex.raw(onUpdateTrigger("mandataires")));
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};

const onUpdateTrigger = table => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    WHEN (OLD. mesures_en_cours IS DISTINCT FROM NEW.mesures_en_cours)
    EXECUTE PROCEDURE on_update_timestamp();
  `;
