exports.up = async function (knex) {
  await knex.schema.alterTable("enquete_reponses", (table) => {
    table.timestamp("uploaded_on").nullable();
  });
};

exports.down = async function (knex) {};
