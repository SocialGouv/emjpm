import { format } from "date-fns";

export const formatMesure = (mesure) => {
  const {
    lieu_vie,
    code_postal,
    numero_dossier,
    departement,
    nature_mesure,
    champ_protection,
    ville,
    status,
    id,
    annee_naissance,
    antenne_id,
    civilite,
    date_nomination,
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
    age: annee_naissance ? annee_naissance : "nc",
    realAge: annee_naissance ? currentYear - annee_naissance : "nc",
    antenne: service_antenne ? service_antenne.name : null,
    cabinet: cabinet ? cabinet : null,
    civilite: civilite ? civilite : null,
    codePostal: code_postal ? code_postal : "",
    dateNomination: date_nomination ? date_nomination : "",
    dateNominationFormated: date_nomination ? format(new Date(date_nomination), "dd/MM/yyyy") : "",
    href: `/services/mesure/${id}/`,
    id: id,
    antenneId: antenne_id,
    isUrgent: is_urgent,
    service: { service_id: service_id },
    mandataire: { mandataire_id: mandataire_id },
    judgmentDate: judgment_date ? format(new Date(judgment_date), "dd/MM/yyyy") : "",
    numeroDossier: numero_dossier ? numero_dossier : "",
    numeroRg: numero_rg ? numero_rg : "",
    lieuVie: lieu_vie ? lieu_vie : "",
    status: status ? currentStatus : "",
    tiId: ti ? ti.id : null,
    tribunal: ti ? ti.etablissement : "Tribunal ",
    natureMesure: nature_mesure ? nature_mesure : "",
    champProtection: champ_protection ? champ_protection : "",
    ville: ville ? ville : "ville ",
    pays,
  };
};
