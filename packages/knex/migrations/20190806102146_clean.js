exports.up = async function (knex) {
  return knex.raw(
    `
    delete from user_role where user_id = 2;
    delete from users where id = 2;

    delete from service_tis where mandataire_id in (select id from mandataires where user_id is null);
    delete from mandataires where user_id is null;
    `
  );
};

exports.down = function () {
  return Promise.resolve();
};
