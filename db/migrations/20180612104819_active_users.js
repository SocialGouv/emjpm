exports.up = function(knex, Promise) {
  // set all users active
  return knex.table("users").update({
    active: true
  });
};

exports.down = function(knex, Promise) {
  return knex.table("users").update({
    active: false
  });
};
