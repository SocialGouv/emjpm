const { onUpdateTrigger } = require('../../knexfile')


exports.up = function(knex, Promise) {
  return knex.schema
    .alterTable("mandataires", function(table) {
    })
    .then(() => knex.raw(onUpdateTrigger("mandataires")));
};

exports.down = function(knex, Promise) {
  return Promise.resolve();
};
