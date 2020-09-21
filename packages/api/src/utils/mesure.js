const { format } = require("date-fns");

function sanitizeMesureProperties(mesure) {
  return {
    id: mesure.id,
    created_at: mesure.created_at,
    annee_naissance: mesure.annee_naissance
      ? parseInt(mesure.annee_naissance)
      : undefined,
    date_nomination: mesure.date_nomination
      ? format(mesure.date_nomination, "yyyy-MM-dd")
      : mesure.date_nomination,
    date_fin_mesure: mesure.date_fin_mesure
      ? format(mesure.date_fin_mesure, "yyyy-MM-dd")
      : mesure.date_fin_mesure,
    numero_dossier: mesure.numero_dossier,
    numero_rg: mesure.numero_rg,
    antenne_id: mesure.antenne_id,
    latitude: mesure.latitude,
    longitude: mesure.longitude,
    civilite: mesure.civilite,
    cause_sortie: mesure.cause_sortie,
    date_premier_mesure: mesure.date_premier_mesure
      ? format(mesure.date_premier_mesure, "yyyy-MM-dd")
      : mesure.date_premier_mesure,
    date_protection_en_cours: mesure.date_protection_en_cours
      ? format(mesure.date_protection_en_cours, "yyyy-MM-dd")
      : mesure.date_protection_en_cours,
    resultat_revision: mesure.resultat_revision,
    etats: mesure.etats
      ? mesure.etats.map((etat) => {
          return {
            date_changement_etat: etat.date_changement_etat
              ? format(etat.date_changement_etat, "yyyy-MM-dd")
              : etat.date_changement_etat,
            nature_mesure: etat.nature_mesure,
            champ_mesure: etat.champ_mesure,
            lieu_vie: etat.lieu_vie,
            code_postal: etat.code_postal,
            ville: etat.ville,
            pays: etat.pays,
            type_etablissement: etat.type_etablissement,
            etablissement_siret: etat.etablissement_siret,
          };
        })
      : [],
    ressources: mesure.ressources
      ? mesure.ressources.map((ressource) => {
          return {
            annee: ressource.annee,
            niveau_ressource: ressource.niveau_ressource,
            prestations_sociales: ressource.prestations_sociales,
          };
        })
      : [],
  };
}

module.exports = { sanitizeMesureProperties };
