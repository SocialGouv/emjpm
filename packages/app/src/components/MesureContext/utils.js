import { convertTokens, legacyParse } from "@date-fns/upgrade/v2";
import { format } from "date-fns";

export const formatMesure = mesure => {
  const {
    residence,
    code_postal,
    numero_dossier,
    type,
    ville,
    status,
    id,
    annee,
    civilite,
    date_ouverture,
    numero_rg,
    is_urgent,
    judgment_date,
    cabinet,
    ti,
    latitude,
    longitude,
    service_antenne,
    service_id
  } = mesure;
  const formatedDate = format(legacyParse(date_ouverture), convertTokens("DD/MM/YYYY"));
  const formatedJudgementDate = format(legacyParse(judgment_date), convertTokens("DD/MM/YYYY"));

  let currentStatus;
  if (status === "Eteindre mesure") {
    currentStatus = "Mesure éteinte";
  } else {
    currentStatus = status;
  }

  const currentYear = new Date().getFullYear();

  return {
    latitude: latitude,
    longitude: longitude,
    age: annee ? annee : "nc",
    realAge: annee ? currentYear - annee : "nc",
    antenne: service_antenne ? service_antenne.name : null,
    cabinet: cabinet ? cabinet : null,
    civilite: civilite ? civilite : "H",
    codePostal: code_postal ? code_postal : "non reseigné",
    dateOuverture: date_ouverture ? date_ouverture : "non reseigné",
    dateOuvertureFormated: date_ouverture ? formatedDate : "non reseigné",
    href: `/services/mesure/${id}/`,
    id: id,
    isUrgent: is_urgent,
    service: { service_id: service_id },
    judgmentDate: judgment_date ? formatedJudgementDate : "non reseigné",
    numeroDossier: numero_dossier ? numero_dossier : "non reseigné",
    numeroRg: numero_rg ? numero_rg : "RG-00000000",
    residence: residence ? residence : "non reseigné",
    status: status ? currentStatus : "non reseigné",
    tiId: ti ? ti.id : null,
    tribunal: ti ? ti.etablissement : "Tribunal non reseigné",
    type: type ? type : "type de mesure non reseigné",
    ville: ville ? ville : "ville non reseigné"
  };
};
