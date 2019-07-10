exports.up = function(knex) {
  return knex("role").insert([
    { name: "admin" },
    { name: "individuel" },
    { name: "prepose" },
    { name: "ti" },
    { name: "service" }
  ]);
};

exports.down = function(knex) {
  return knex("role").del();
};
