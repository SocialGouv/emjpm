module.exports.VIEW_MESURE_GESTIONNAIRE = `
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
  `;

module.exports.VIEW_DEPARTMENT_AVAILIBILITY = `
CREATE VIEW view_department_availability AS
 SELECT department_id, sum(mesures_awaiting) mesures_awaiting, sum(mesures_in_progress) mesures_in_progress, sum(mesures_max) mesures_max
  FROM view_mesure_gestionnaire
  GROUP BY department_id
  `;
