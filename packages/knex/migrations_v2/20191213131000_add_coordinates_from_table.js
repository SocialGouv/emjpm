exports.up = async function (knex) {
  await knex.raw(`
update mesures set code_postal = null where length(code_postal) <> 5;
    `);
  await knex.raw(`
update mesures set code_postal = trim(code_postal);
update mandataires set code_postal = trim(code_postal);
update services set code_postal = trim(code_postal);
    `);

  return knex.raw(`
update mesures set latitude = geo.latitude, longitude = geo.longitude FROM geolocalisation_code_postal geo WHERE mesures.code_postal is not null and geo.code_postal = mesures.code_postal;
update mandataires set latitude = geo.latitude, longitude = geo.longitude FROM geolocalisation_code_postal geo WHERE mandataires.code_postal is not null and geo.code_postal = mandataires.code_postal;
update services set latitude = geo.latitude, longitude = geo.longitude FROM geolocalisation_code_postal geo WHERE services.code_postal is not null and geo.code_postal = services.code_postal;
  `);
};

exports.down = function (knex) {
  return knex.raw(`
update mesures set latitude = null, longitude = null;
update mandataires set latitude = null, longitude = null;
update services set latitude = null, longitude = null;
  `);
};
