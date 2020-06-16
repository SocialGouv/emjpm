exports.up = function (knex) {
  // set all users active
  return knex.table("users").update({
    active: true,
  });
};

exports.down = function (knex) {
  return knex.table("users").update({
    active: false,
  });
};
