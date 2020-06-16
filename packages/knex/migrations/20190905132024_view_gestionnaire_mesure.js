exports.up = async function (knex) {
  await knex.raw(`
DROP VIEW IF EXISTS view_department_availability
  `);
  await knex.raw(`
DROP VIEW IF EXISTS view_mesure_gestionnaire
  `);

  await knex.raw(`
CREATE VIEW view_mesure_gestionnaire AS
   SELECT ser.id source_id, 'SERVICE' discriminator, dep.id department_id, dep.nom dep_nom, ser.dispo_max mesures_max, sum(ant.mesures_awaiting) mesures_awaiting, sum(ant.mesures_in_progress) mesures_in_progress
   FROM services ser, service_antenne ant, departements dep
    WHERE ser.id = ant.service_id
    AND dep.code = substring(ser.code_postal, 0, 3)
    GROUP BY ser.id, dep.id, dep.nom, ser.dispo_max
 union
 SELECT man.id source_id, 'MANDATAIRE_IND' discriminator, dep.id department_id, dep.nom dep_nom, man.dispo_max mesures_max, man.mesures_en_attente mesures_awaiting, man.mesures_en_cours mesures_in_progress
   FROM mandataires man, departements dep, users u
    WHERE dep.code = substring(man.code_postal, 0, 3)
    AND man.user_id = u.id
    AND u.type = 'individuel'
 union
  SELECT man.id source_id, 'MANDATAIRE_PRE' discriminator, dep.id department_id, dep.nom dep_nom, man.dispo_max mesures_max, man.mesures_en_attente mesures_awaiting, man.mesures_en_cours mesures_in_progress
   FROM mandataires man, departements dep, users u
    WHERE dep.code = substring(man.code_postal, 0, 3)
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

exports.down = async function (knex) {
  await knex.raw(`
DROP VIEW IF EXISTS view_department_availability
  `);

  await knex.raw(`
DROP VIEW IF EXISTS view_mesure_gestionnaire
  `);

  await knex.raw(`
CREATE VIEW view_mesure_gestionnaire AS
  SELECT dep.id department_id, dep.nom dep_nom, 'ANTENNE' discriminator, ser.id source_id, ser.mesures_awaiting, ser.mesures_in_progress, ser.mesures_max
   FROM service_antenne ser, departements dep
    WHERE dep.code = substring(ser.address_zip_code, 0, 3)
 union
  SELECT dep.id department_id, dep.nom dep_nom, 'MANDATAIRE_IND' discriminator, man.id source_id, man.mesures_en_attente mesures_awaiting, man.mesures_en_cours mesures_in_progress, man.dispo_max mesures_max
   FROM mandataires man, departements dep, users u
    WHERE dep.code = substring(man.code_postal, 0, 3)
    AND man.user_id = u.id
    AND u.type = 'individuel'
 union
  SELECT dep.id department_id, dep.nom dep_nom, 'MANDATAIRE_PRE' discriminator, man.id source_id, man.mesures_en_attente mesures_awaiting, man.mesures_en_cours mesures_in_progress, man.dispo_max mesures_max
   FROM mandataires man, departements dep, users u
    WHERE dep.code = substring(man.code_postal, 0, 3)
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
