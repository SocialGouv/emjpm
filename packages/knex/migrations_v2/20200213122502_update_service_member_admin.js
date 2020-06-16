exports.up = async function (knex) {
  await knex.raw(`
update service_members set is_admin = true where is_admin = false;
    `);
};

exports.down = async function () {
  return Promise.resolve();
};
