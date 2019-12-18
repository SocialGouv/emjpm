module.exports.VIEW_MESURE_GESTIONNAIRE = `
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
  `;

module.exports.VIEW_DEPARTMENT_AVAILIBILITY = `
CREATE VIEW view_department_availability AS
 SELECT department_id, sum(mesures_awaiting) mesures_awaiting, sum(mesures_in_progress) mesures_in_progress, sum(mesures_max) mesures_max
  FROM view_mesure_gestionnaire
  GROUP BY department_id
  `;
