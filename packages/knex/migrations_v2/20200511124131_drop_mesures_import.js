exports.up = function (knex) {
  return knex.schema.dropTable("mesures_import");
};

exports.down = function (knex) {
  return knex.raw(`
  CREATE TABLE public.mesures_import (
    id serial NOT NULL,
    created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
    processed_at timestamptz NULL,
    content jsonb NULL,
    file_name varchar(255) NOT NULL,
    file_size int4 NOT NULL,
    file_type varchar(255) NOT NULL,
    status varchar(255) NOT NULL,
    user_id int4 NULL,
    antenne_id int4 NULL,
    service_id int4 NULL,
    CONSTRAINT mesures_import_pkey PRIMARY KEY (id)
  );
  
  ALTER TABLE public.mesures_import ADD CONSTRAINT mesures_import_antenne_id_foreign FOREIGN KEY (antenne_id) REFERENCES service_antenne(id);
  ALTER TABLE public.mesures_import ADD CONSTRAINT mesures_import_service_id_foreign FOREIGN KEY (service_id) REFERENCES services(id);
  ALTER TABLE public.mesures_import ADD CONSTRAINT mesures_import_user_id_foreign FOREIGN KEY (user_id) REFERENCES users(id);`);
};
