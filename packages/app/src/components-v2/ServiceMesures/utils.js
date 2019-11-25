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
      ti
    } = mesure;
    const formatedDate = format(date_ouverture, "DD/MM/YYYY");
    const formatedJudgementDate = format(judgment_date, "DD/MM/YYYY");
    return {
      age: annee ? annee : "nc",
      antenneId: antenne_id ? antenne_id : null,
      cabinet: cabinet ? cabinet : null,
      civilite: civilite ? civilite : "H",
      codePostal: code_postal ? code_postal : "non reseigné",
      dateOuverture: date_ouverture ? date_ouverture : "non reseigné",
      dateOuvertureFormated: date_ouverture ? formatedDate : "non reseigné",
      href: `/services/mesure/${id}/`,
      id: id,
      isUrgent: is_urgent,
      judgmentDate: judgment_date ? formatedJudgementDate : "non reseigné",
      numeroDossier: numero_dossier ? numero_dossier : "non reseigné",
      numeroRg: numero_rg ? numero_rg : "RG-00000000",
      residence: residence ? residence : "non reseigné",
      status: status ? status : "non reseigné",
      tiId: ti ? ti.id : null,
      tribunal: ti ? ti.etablissement : "Tribunal non reseigné",
      type: type ? type : "type de mesure non reseigné",
      ville: ville ? ville : "ville non reseigné"
    };
  });
  return mesures;
};

export const formatAntenneOptions = user_antennes => {
  return user_antennes.map(user_antenne => {
    return {
      label: user_antenne.service_antenne.name,
      value: user_antenne.service_antenne.id
    };
  });
};

export const formatTribunalList = tribunalList => {
  return tribunalList.map(tribunal => {
    return {
      label: tribunal.ti.etablissement,
      value: tribunal.ti.id
    };
  });
};
