exports.up = function(knex) {
  return knex.raw(`
    CREATE INDEX geolocalisation_code_postal_code_postal_idx ON public.geolocalisation_code_postal (code_postal);
    CREATE INDEX mesures_numero_rg_idx ON public.mesures (numero_rg,service_id,mandataire_id,ti_id);
    CREATE UNIQUE INDEX tis_siret_idx ON public.tis (siret);
  `);
};

exports.down = function(knex) {
  return knex.raw(`
    DROP INDEX geolocalisation_code_postal_code_postal_idx;
    DROP INDEX mesures_numero_rg_idx;
    DROP INDEX tis_siret_idx;
`);
};
