exports.up = function (knex) {
  return knex.raw(`
alter table tis alter column email drop not null;
alter table tis alter column telephone drop not null;
  `);
};

exports.down = function (knex) {
  return knex.raw(`
  alter table tis alter column email set not null;
  alter table tis alter column telephone set not null;
    `);
};
