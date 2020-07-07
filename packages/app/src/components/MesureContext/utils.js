import { format } from "date-fns";
import { MESURE_PROTECTION } from "@emjpm/core";

export const formatMesure = (mesure) => {
  const {
    lieu_vie,
    code_postal,
    numero_dossier,
    departement,
    type,
    ville,
    status,
    id,
    annee,
    antenne_id,
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
    service_id,
    mandataire_id,
    pays,
  } = mesure;

  let currentStatus;

  if (status === "Eteindre mesure") {
    currentStatus = "Mesure éteinte";
  } else {
    currentStatus = status;
  }

  const currentYear = new Date().getFullYear();

  return {
    latitude: latitude,
    mandataireId: mandataire_id,
    serviceId: service_id,
    longitude: longitude,
    departmentId: departement ? departement.id : null,
    age: annee ? annee : "nc",
    realAge: annee ? currentYear - annee : "nc",
    antenne: service_antenne ? service_antenne.name : null,
    cabinet: cabinet ? cabinet : null,
    civilite: civilite ? civilite : "H",
    codePostal: code_postal ? code_postal : "non renseigné",
    dateOuverture: date_ouverture ? date_ouverture : "non renseigné",
    dateOuvertureFormated: date_ouverture
      ? format(new Date(date_ouverture), "dd/MM/yyyy")
      : "non renseigné",
    href: `/services/mesure/${id}/`,
    id: id,
    antenneId: antenne_id,
    isUrgent: is_urgent,
    service: { service_id: service_id },
    mandataire: { mandataire_id: mandataire_id },
    judgmentDate: judgment_date ? format(new Date(judgment_date), "dd/MM/yyyy") : "non renseigné",
    numeroDossier: numero_dossier ? numero_dossier : "non renseigné",
    numeroRg: numero_rg ? numero_rg : "RG-00000000",
    lieuVie: lieu_vie ? MESURE_PROTECTION.LIEU_VIE_MAJEUR.byKey[lieu_vie] : "",
    status: status ? currentStatus : "non renseigné",
    tiId: ti ? ti.id : null,
    tribunal: ti ? ti.etablissement : "Tribunal non renseigné",
    type: type ? type : "type de mesure non renseigné",
    ville: ville ? ville : "ville non renseigné",
    pays,
  };
};
