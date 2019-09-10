exports.up = async function(knex) {
  await knex.raw(`
DROP VIEW IF EXISTS view_department_availability
  `);
  await knex.raw(`
DROP VIEW IF EXISTS view_mesure_gestionnaire
  `);

  await knex.raw(`
CREATE VIEW view_mesure_gestionnaire AS
  SELECT ser.id service_id
  , NULL mandataire_id
  , 'SERVICE' discriminator
  , dep.id department_id
  , dep.nom dep_nom
  , ser.dispo_max mesures_max
  , sum(ant.mesures_awaiting) mesures_awaiting
  , sum(ant.mesures_in_progress) mesures_in_progress
  , (ser.dispo_max - sum(ant.mesures_awaiting) - sum(ant.mesures_in_progress)) remaining_capacity
  FROM services ser, service_antenne ant, departements dep
  WHERE ser.id = ant.service_id
  AND dep.id = ser.department_id
  GROUP BY ser.id, dep.id, dep.nom, ser.dispo_max
  UNION
  SELECT NULL service_id
    , man.id mandataire_id
    , case when u.type = 'individuel' then 'MANDATAIRE_IND' else 'MANDATAIRE_PRE' end discriminator
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
    SELECT department_id, sum(mesures_awaiting) mesures_awaiting, sum(mesures_in_progress) mesures_in_progress, sum(mesures_max) mesures_max
     FROM view_mesure_gestionnaire
     GROUP BY department_id
    `);
};

exports.down = async function(knex) {
  await knex.raw(`
DROP VIEW IF EXISTS view_department_availability
  `);

  await knex.raw(`
DROP VIEW IF EXISTS view_mesure_gestionnaire
  `);

  await knex.raw(`
CREATE VIEW view_mesure_gestionnaire AS
  SELECT ser.id service_id, NULL mandataire_id,  'SERVICE' discriminator, dep.id department_id, dep.nom dep_nom, ser.dispo_max mesures_max, sum(ant.mesures_awaiting) mesures_awaiting, sum(ant.mesures_in_progress) mesures_in_progress
    FROM services ser, service_antenne ant, departements dep
     WHERE ser.id = ant.service_id
     AND dep.id = ser.department_id
     GROUP BY ser.id, dep.id, dep.nom, ser.dispo_max
  union
  SELECT NULL service_id, man.id mandataire_id, 'MANDATAIRE_IND' discriminator, dep.id department_id, dep.nom dep_nom, man.dispo_max mesures_max, man.mesures_en_attente mesures_awaiting, man.mesures_en_cours mesures_in_progress
    FROM mandataires man, departements dep, users u
     WHERE dep.id = man.department_id
     AND man.user_id = u.id
     AND u.type = 'individuel'
  union
   SELECT NULL service_id, man.id mandataire_id, 'MANDATAIRE_PRE' discriminator, dep.id department_id, dep.nom dep_nom, man.dispo_max mesures_max, man.mesures_en_attente mesures_awaiting, man.mesures_en_cours mesures_in_progress
    FROM mandataires man, departements dep, users u
     WHERE dep.id = man.department_id
     AND man.user_id = u.id
     AND u.type = 'prepose'
  `);

  return knex.raw(`
CREATE VIEW view_department_availability AS
      SELECT department_id, sum(mesures_awaiting) mesures_awaiting, sum(mesures_in_progress) mesures_in_progress, sum(mesures_max) mesures_max
       FROM view_mesure_gestionnaire
       GROUP BY department_id
      `);
};
