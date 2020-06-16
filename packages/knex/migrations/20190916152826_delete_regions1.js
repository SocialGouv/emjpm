exports.up = function (knex) {
  return knex.raw(`
  drop table if exists regions1;
  `);
};

exports.down = function () {
  return Promise.resolve();
};
