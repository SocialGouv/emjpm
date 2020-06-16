function getRegionCode(zipcode) {
  if (!zipcode || zipcode.length !== 5) {
    return "";
  } else {
    if (zipcode.startsWith("20")) {
      // Corse
      return parseInt(zipcode) < 20200 ? "2A" : "2B";
    } else if (zipcode.startsWith("97") || zipcode.startsWith("98")) {
      // Dom-Tom
      return zipcode.substring(0, 3);
    } else {
      return zipcode.substring(0, 2);
    }
  }
}

exports.up = async (knex) => {
  const departements = await knex("departements").select("id", "code");
  if (departements) {
    const tis = await knex.select("id", "code_postal").from("tis");
    if (tis) {
      tis.forEach(async (ti) => {
        const { id, code_postal } = ti;
        const regionCode = getRegionCode(code_postal);
        const departement = departements.find((d) => d.code === regionCode);
        if (departement) {
          await knex("tis")
            .where({ id })
            .update({ departement_id: departement.id });
        }
      });
    }
  }
};

exports.down = async (knex) => {
  await knex("tis").update({ departement_id: null });
};
