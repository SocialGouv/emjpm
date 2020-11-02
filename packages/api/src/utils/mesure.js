const { format } = require("date-fns");

function sanitizeMesureProperties(mesure) {
  return {
    annee_naissance: mesure.annee_naissance
      ? parseInt(mesure.annee_naissance)
      : undefined,
    antenne_id: mesure.antenne_id,
    cause_sortie: mesure.cause_sortie,
    civilite: mesure.civilite,
    created_at: mesure.created_at,
    date_fin_mesure: mesure.date_fin_mesure
      ? format(mesure.date_fin_mesure, "yyyy-MM-dd")
      : mesure.date_fin_mesure,
    date_nomination: mesure.date_nomination
      ? format(mesure.date_nomination, "yyyy-MM-dd")
      : mesure.date_nomination,
    date_premier_mesure: mesure.date_premier_mesure
      ? format(mesure.date_premier_mesure, "yyyy-MM-dd")
      : mesure.date_premier_mesure,
    date_protection_en_cours: mesure.date_protection_en_cours
      ? format(mesure.date_protection_en_cours, "yyyy-MM-dd")
      : mesure.date_protection_en_cours,
    etats: mesure.etats
      ? mesure.etats.map((etat) => {
          return {
            champ_mesure: etat.champ_mesure,
            code_postal: etat.code_postal,
            date_changement_etat: etat.date_changement_etat
              ? format(etat.date_changement_etat, "yyyy-MM-dd")
              : etat.date_changement_etat,
            lieu_vie: etat.lieu_vie,
            nature_mesure: etat.nature_mesure,
            pays: etat.pays,
            type_etablissement: etat.type_etablissement,
            ville: etat.ville,
          };
        })
      : [],
    id: mesure.id,
    latitude: mesure.latitude,
    longitude: mesure.longitude,
    numero_dossier: mesure.numero_dossier,
    numero_rg: mesure.numero_rg,
    ressources: mesure.ressources
      ? mesure.ressources.map((ressource) => {
          return {
            annee: ressource.annee,
            niveau_ressource: ressource.niveau_ressource,
            prestations_sociales: ressource.prestations_sociales,
          };
        })
      : [],
    resultat_revision: mesure.resultat_revision,
    tribunal_siret: mesure.tis ? mesure.tis.siret : null,
  };
}

module.exports = { sanitizeMesureProperties };
