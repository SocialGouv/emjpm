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
      codePostal: code_postal ? code_postal : "non renseigné",
      dateNomination: date_nomination ? date_nomination : "non renseigné",
      dateNominationFormated: date_nomination
        ? format(new Date(date_nomination), "dd/MM/yyyy")
        : "non renseigné",
      href: `/services/mesure/${id}/`,
      id: id,
      isUrgent: is_urgent,
      judgmentDate: judgment_date ? format(new Date(judgment_date), "dd/MM/yyyy") : "non renseigné",
      latitude: latitude || 45.5,
      lieu_vie: lieu_vie ? lieu_vie : "non renseigné",
      longitude: longitude || 0.5,
      nature_mesure: nature_mesure ? nature_mesure : "",
      numeroDossier: numero_dossier ? numero_dossier : "non renseigné",
      numeroRg: numero_rg ? numero_rg : "RG-00000000",
      pays,
      status: status ? status : "non renseigné",
      tiId: ti ? ti.id : null,
      tribunal: ti ? ti.etablissement : "Tribunal non renseigné",
      ville: ville ? ville : "ville non renseigné",
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
