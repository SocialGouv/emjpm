import { format } from "date-fns";

// move me in the good folder
export const formatMesureList = mesureList => {
  const mesures = mesureList.map(mesure => {
    const {
      residence,
      code_postal,
      numero_dossier,
      antenne_id,
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
      longitude
    } = mesure;

    return {
      age: annee ? annee : "nc",
      antenneId: antenne_id ? antenne_id : null,
      cabinet: cabinet ? cabinet : null,
      civilite: civilite ? civilite : "H",
      codePostal: code_postal ? code_postal : "non renseigné",
      dateOuverture: date_ouverture ? date_ouverture : "non renseigné",
      dateOuvertureFormated: date_ouverture
        ? format(new Date(date_ouverture), "dd/MM/yyyy")
        : "non renseigné",
      href: `/services/mesure/${id}/`,
      id: id,
      isUrgent: is_urgent,
      judgmentDate: judgment_date ? format(new Date(judgment_date), "dd/MM/yyyy") : "non renseigné",
      numeroDossier: numero_dossier ? numero_dossier : "non renseigné",
      numeroRg: numero_rg ? numero_rg : "RG-00000000",
      residence: residence ? residence : "non renseigné",
      status: status ? status : "non renseigné",
      tiId: ti ? ti.id : null,
      tribunal: ti ? ti.etablissement : "Tribunal non renseigné",
      type: type ? type : "type de mesure non renseigné",
      ville: ville ? ville : "ville non renseigné",
      latitude: latitude || 45.5,
      longitude: longitude || 0.5
    };
  });
  return mesures;
};

export const formatUserTribunalList = tribunalList => {
  return tribunalList.map(tribunal => {
    return {
      label: tribunal.ti.etablissement,
      value: tribunal.ti.id
    };
  });
};
