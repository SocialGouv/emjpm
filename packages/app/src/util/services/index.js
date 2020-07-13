import { format } from "date-fns";

// move me in the good folder
export const formatMesureList = (mesureList) => {
  const mesures = mesureList.map((mesure) => {
    const {
      lieu_vie,
      code_postal,
      numero_dossier,
      antenne_id,
      nature_mesure,
      champ_protection,
      ville,
      status,
      id,
      annee_naissance,
      civilite,
      date_nomination,
      numero_rg,
      is_urgent,
      judgment_date,
      cabinet,
      ti,
      latitude,
      longitude,
      pays,
    } = mesure;

    return {
      age: annee_naissance ? annee_naissance : "nc",
      antenneId: antenne_id ? antenne_id : null,
      cabinet: cabinet ? cabinet : null,
      champ_protection: champ_protection ? champ_protection : "",
      civilite: civilite ? civilite : null,
      codePostal: code_postal ? code_postal : "",
      dateNomination: date_nomination ? date_nomination : "",
      dateNominationFormated: date_nomination
        ? format(new Date(date_nomination), "dd/MM/yyyy")
        : "",
      href: `/services/mesure/${id}/`,
      id: id,
      isUrgent: is_urgent,
      judgmentDate: judgment_date ? format(new Date(judgment_date), "dd/MM/yyyy") : "",
      latitude: latitude || 45.5,
      lieu_vie: lieu_vie ? lieu_vie : "",
      longitude: longitude || 0.5,
      nature_mesure: nature_mesure ? nature_mesure : "",
      numeroDossier: numero_dossier ? numero_dossier : "",
      numeroRg: numero_rg ? numero_rg : "",
      pays,
      status: status ? status : "",
      tiId: ti ? ti.id : null,
      tribunal: ti ? ti.etablissement : "Tribunal ",
      ville: ville ? ville : "ville ",
    };
  });

  return mesures;
};

export const formatAntenneOptions = (antennes) => {
  return antennes.map((antenne) => ({
    label: antenne.name,
    value: antenne.id,
  }));
};
