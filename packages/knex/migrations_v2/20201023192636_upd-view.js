exports.up = async function (knex) {
  await knex.raw(`
DROP VIEW IF EXISTS view_department_availability
  `);
  await knex.raw(`
DROP VIEW IF EXISTS view_mesure_gestionnaire
  `);

  await knex.raw(`
  CREATE VIEW view_mesure_gestionnaire AS
  SELECT concat('service-', ser.id) id
  , ser.id service_id
  , NULL mandataire_id
  , 'SERVICE' discriminator
  , ser.etablissement nom
  , dep.id department_id
  , dep.nom dep_nom
  , ser.dispo_max mesures_max
  , ser.mesures_awaiting
  , ser.mesures_in_progress
  , (ser.dispo_max - ser.mesures_awaiting - ser.mesures_in_progress) remaining_capacity
  FROM services ser, departements dep
  WHERE dep.id = ser.department_id
  GROUP BY ser.id, dep.id, dep.nom, ser.dispo_max
  UNION
  SELECT concat(u.type, '-', man.id) id
    , NULL service_id
    , man.id mandataire_id
    , case when u.type = 'individuel' then 'MANDATAIRE_IND' else 'MANDATAIRE_PRE' end discriminator
    , CONCAT(u.nom, ' ', u.prenom) nom
    , dep.id department_id
    , dep.nom dep_nom
    , man.dispo_max mesures_max
    , man.mesures_en_attente mesures_awaiting
    , man.mesures_en_cours mesures_in_progress
    , (man.dispo_max - man.mesures_en_attente - man.mesures_en_cours) remaining_capacity
  FROM mandataires man, departements dep, users u
   WHERE dep.id = man.department_id
   AND man.user_id = u.id
`);

  return knex.raw(`
CREATE VIEW view_department_availability AS
    SELECT v.department_id, d.id_region region_id, sum(v.mesures_awaiting) mesures_awaiting, sum(v.mesures_in_progress) mesures_in_progress, sum(v.mesures_max) mesures_max
     FROM view_mesure_gestionnaire v, departements d
     where v.department_id = d.id
     GROUP BY v.department_id, d.id_region
    `);
};

exports.down = function () {};
