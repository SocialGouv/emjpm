exports.up = function (knex) {
  return knex.raw(`
  update mesures set residence = 'domicile' where residence= 'à domicile';
  update mesures set residence = 'en établissement' where residence= 'en ã©tablissement';
  update mesures set residence = 'en établissement avec conservation du domicile' where residence= 'en ã©tablissement avec conservation du domicile';
  update mesures set residence = 'en établissement' where residence= 'en etablissement';
  update mesures set residence = 'en établissement avec conservation du domicile' where residence= 'en etablissement avec conservation du domicile';
  update mesures set residence = 'en établissement' where residence= 'en �tablissement';
  update mesures set residence = 'en établissement avec conservation du domicile' where residence= 'en �tablissement avec conservation du domicile';
  update mesures set residence = null where residence= 'non renseigné';
  update mesures set residence = null where residence= 'non reseigné';
  update mesures set residence = null where residence= 'autre';
  update mesures set residence = null where residence= 'autres';
  `);
};

exports.down = function (knex) {};
