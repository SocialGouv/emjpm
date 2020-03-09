exports.up = async knex => {
  const departements = knex.select("id", "code").from("departements");
  if (departements) {
    const tis = await knex.select("id", "code").from("tis");
    if (tis) {
      await knex.transaction(async trx => {
        tis.forEach(async ti => {
          const { id, code_postal } = ti;
          const twoDigitsZipCode = code_postal.substr(0, 2);

          // TODO: traiter le cas de la corse (2A & 2B)
          const departement = departements.find(
            d => d.code === twoDigitsZipCode
          );

          await knex("departements")
            .where({ id: id })
            .update({ departement_id: departement.id })
            .transacting(trx);
        });
      });
    }
  }
};

exports.down = async knex => {
  await knex("tis").update({ departement_id: null });
};
