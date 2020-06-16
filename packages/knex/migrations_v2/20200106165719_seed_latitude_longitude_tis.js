exports.up = function (knex) {
  return knex.raw(`
    update tis set code_postal = trim(code_postal);
    update tis set latitude = geo.latitude, longitude = geo.longitude FROM geolocalisation_code_postal geo WHERE tis.code_postal is not null and geo.code_postal = tis.code_postal;
  `);
};

exports.down = function (knex) {
  return knex.raw(`
    update tis set latitude = null, longitude = null;
  `);
};
