const table = "mesure_protection";

exports.up = async function (knex) {
  return knex.raw(`
  update mesures set residence = 'en établissement' where residence = 'ehpad';
  update mesures set residence = null where residence = 'non renseigné';
  update mesures set residence = 'en établissement' where residence = 'en t�ablissement';
  update mesures set residence = null where residence = 'autres';
  update mesures set residence = 'en établissement' where residence = 'en étbablissement';
  update mesures set residence = 'en établissement' where residence = 'en �tablissemn';
  update mesures set residence = 'en établissement' where residence = 'epsm';
    `);
};

exports.down = async function () {};
