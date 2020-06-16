exports.seed = function (knex) {
  return knex("editors")
    .del()
    .then(function () {
      return knex("editors").insert([
        { name: "test-editor", api_token: "test-token" },
      ]);
    });
};
