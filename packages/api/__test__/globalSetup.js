//

const knex = require("@emjpm/api/db/knex");

//

module.exports = async () => {
  await knex.migrate.latest();
  await knex.seed.run();

  // HACK(douglasduteil): destroy trailing knex connection.
  // Here we destroy the connection as it won't be used anymore.
  // As each test is sandboxed, this knex connection isn't shared outside.
  await knex.destroy();
};
