const tribunaux = require("../seeds/tribunaux");

exports.up = async function (knex) {
  await knex.raw(`
alter table tis add ville2 varchar;
update tis set ville2 = ville;
update tis set ville2 = replace(ville2, ' ', '');
update tis set ville2 = replace(ville2, '-', '');
update tis set ville2 = lower(ville2);
update tis set ville2 = replace(ville2, 'cedex', '');
  `);

  for (const tribunal of tribunaux) {
    let ville2 = tribunal.ville.replace(" ", "").replace("-", "");
    ville2 = ville2.toLowerCase();
    const ti = await knex("tis").where("ville2", ville2).select("id");
    if (ti.length == 1) {
      await knex.raw(
        `update tis set siret = '${tribunal.siret}' where id = ${ti[0].id};`
      );
    }
  }

  return knex.raw(`
alter table tis drop ville2;
  `);
};

exports.down = function () {
  return Promise.resolve();
};
