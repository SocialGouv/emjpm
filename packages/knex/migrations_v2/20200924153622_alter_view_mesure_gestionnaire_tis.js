exports.up = function (knex) {
  knex.raw(`CREATE OR REPLACE VIEW public.view_mesure_gestionnaire_tis
AS SELECT concat(u.type, '-', m.id) AS id,
    NULL::integer AS service_id,
    m.id AS mandataire_id,
        CASE
            WHEN u.type::text = 'individuel'::text THEN 'MANDATAIRE_IND'::text
            ELSE 'MANDATAIRE_PRE'::text
        END AS discriminator,
    uti.ti_id,
    u.nom as name
   FROM users u,
    user_tis uti,
    mandataires m
  WHERE u.id = m.user_id 
  AND u.id = uti.user_id
UNION
 SELECT concat('service-', sti.service_id) AS id,
    sti.service_id,
    NULL::integer AS mandataire_id,
    'SERVICE'::text AS discriminator,
    sti.ti_id,
    s.etablissement as name
   FROM service_tis sti, services s 
   where s.id = sti.service_id;`);
};

exports.down = function (knex) {
  knex.raw(`CREATE OR REPLACE VIEW public.view_mesure_gestionnaire_tis 
AS SELECT concat(u.type, '-', m.id) AS id,
       NULL::integer AS service_id,
       m.id AS mandataire_id,
           CASE
               WHEN ((u.type)::text = 'individuel'::text) THEN 'MANDATAIRE_IND'::text
               ELSE 'MANDATAIRE_PRE'::text
           END AS discriminator,
       uti.ti_id
      FROM public.users u,
       public.user_tis uti,
       public.mandataires m
     WHERE ((u.id = m.user_id) AND (u.id = uti.user_id))
   UNION
    SELECT concat('service-', sti.service_id) AS id,
       sti.service_id,
       NULL::integer AS mandataire_id,
       'SERVICE'::text AS discriminator,
       sti.ti_id
      FROM public.service_tis sti;`);
};
