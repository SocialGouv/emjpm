const { MESURE_PROTECTION_STATUS } = require("@emjpm/core");

function buildMesure({
  datas,
  antenneId,
  serviceOrMandataire,
  lastEtat,
  latitude,
  longitude,
  departement,
  type,
  ti,
}) {
  return {
    annee_naissance: datas.annee_naissance,
    antenne_id: antenneId,
    cabinet: datas.tribunal_cabinet,
    cause_sortie: datas.cause_sortie,
    champ_mesure: lastEtat.champ_mesure,
    civilite: datas.civilite,
    code_postal: lastEtat.code_postal,
    date_fin_mesure: datas.date_fin_mesure,
    date_nomination: datas.date_nomination,
    department_id: departement.id,
    latitude: latitude,
    longitude: longitude,
    lieu_vie: lastEtat.lieu_vie,
    [`${type}_id`]: serviceOrMandataire.id,
    ti_id: ti.id,
    ville: lastEtat.ville,
    date_premier_mesure: datas.date_premier_mesure,
    date_protection_en_cours: datas.date_protection_en_cours,
    status: MESURE_PROTECTION_STATUS.en_cours,
    numero_dossier: datas.numero_dossier,
    numero_rg: datas.numero_rg,
    pays: lastEtat.pays,
    type_etablissement: lastEtat.type_etablissement,
    resultat_revision: datas.resultat_revision,
    nature_mesure: lastEtat.nature_mesure,
  };
}

module.exports = buildMesure;
