/* eslint-disable sort-keys-fix/sort-keys-fix */
module.exports = {
  mandataires: "select * from mandataires",
  users:
    "select id,created_at,type,active,nom,prenom,cabinet,email,genre from users",
  regions: "select * from regions",
  departements: "select * from departements",
  services:
    "select s.*,sd.departement_code from services s join service_departements sd on s.id = sd.service_id",
  mid: "select * from mandataire_individuel_departements",
  mesures: "select * from mesures",
  mesure_etat: "select * from mesure_etat",
  mesure_ressources: "select * from mesure_ressources",
  mrps: "select * from mesure_ressources_prestations_sociales",
};
