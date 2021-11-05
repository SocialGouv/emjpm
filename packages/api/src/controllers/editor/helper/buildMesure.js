const { MESURE_PROTECTION_STATUS } = require("@emjpm/biz");
const { getDepartementByCodePostal } = require("~/utils/code-postal");
const { normalizeNumeroRG } = require("~/utils/numero-rg");

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
  editorId,
}) {
  const code_postal = lastEtat.code_postal || datas.code_postal;
  let departement_code = departement ? departement.id : null;
  if (!departement_code && code_postal) {
    departement_code = getDepartementByCodePostal(code_postal);
  }

  const date_fin_mesure =
    datas.date_fin_mesure !== "0000-00-00" ? datas.date_fin_mesure : null;

  let status = MESURE_PROTECTION_STATUS.en_cours;
  if (date_fin_mesure) {
    if (new Date(date_fin_mesure) <= new Date()) {
      status = MESURE_PROTECTION_STATUS.eteinte;
    }
  }

  return {
    annee_naissance: datas.annee_naissance,
    antenne_id: antenneId,
    cabinet: datas.tribunal_cabinet,
    cause_sortie: datas.cause_sortie,
    champ_mesure: lastEtat.champ_mesure,
    civilite: datas.civilite,
    code_postal,
    date_fin_mesure,
    date_nomination:
      datas.date_nomination !== "0000-00-00" ? datas.date_nomination : null,
    date_premier_mesure:
      datas.date_premier_mesure !== "0000-00-00"
        ? datas.date_premier_mesure
        : null,
    date_protection_en_cours: datas.date_protection_en_cours,
    departement_code,
    editor_id: editorId,
    [`${type}_id`]: serviceOrMandataire.id,
    latitude: latitude,
    lieu_vie: lastEtat.lieu_vie,
    longitude: longitude,
    nature_mesure: lastEtat.nature_mesure,
    numero_dossier: datas.numero_dossier,
    numero_rg: normalizeNumeroRG(datas.numero_rg),
    pays: lastEtat.pays,
    resultat_revision: datas.resultat_revision,
    status,
    ti_id: ti.id,
    type_etablissement: lastEtat.type_etablissement,
    ville: lastEtat.ville || datas.ville,
  };
}

module.exports = buildMesure;
