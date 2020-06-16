exports.seed = function (knex) {
  return knex("role")
    .del()
    .then(function () {
      return knex("role").insert([
        { name: "admin" },
        { name: "individuel" },
        { name: "prepose" },
        { name: "ti" },
        { name: "service" },
        { name: "direction" },
        { name: "direction_national" },
        { name: "direction_regional" },
        { name: "direction_departemental" },
      ]);
    });
};
