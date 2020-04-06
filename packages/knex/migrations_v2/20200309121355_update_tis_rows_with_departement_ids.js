const getRegionCode = require("../util/getRegionCode");

exports.up = async knex => {
  const departements = await knex("departements").select("id", "code");
  if (departements) {
    const tis = await knex.select("id", "code_postal").from("tis");
    if (tis) {
      tis.forEach(async ti => {
        const { id, code_postal } = ti;
        const regionCode = getRegionCode(code_postal);
        const departement = departements.find(d => d.code === regionCode);
        if (departement) {
          await knex("tis")
            .where({ id })
            .update({ departement_id: departement.id });
        }
      });
    }
  }
};

exports.down = async knex => {
  await knex("tis").update({ departement_id: null });
};
