import { format } from "date-fns";

export const formatMandatairesMesureList = (mesureList) => {
  const mesures = mesureList.map((mesure) => {
    const {
      lieu_vie,
      code_postal,
      numero_dossier,
      antenne_id,
      type,
      ville,
      status,
      id,
      ti,
      annee_naissance,
      civilite,
      date_nomination,
      is_urgent,
      judgment_date,
      numero_rg,
      cabinet,
    } = mesure;

    return {
      judgmentDate: judgment_date ? format(new Date(judgment_date), "dd/MM/yyy") : null,
      isUrgent: is_urgent,
      age: annee_naissance ? annee_naissance : null,
      antenneId: antenne_id ? antenne_id : null,
      cabinet: cabinet ? cabinet : null,
      civilite: civilite ? civilite : null,
      codePostal: code_postal ? code_postal : null,
      dateNomination: date_nomination ? date_nomination : null,
      dateNominationFormated: date_nomination
        ? format(new Date(date_nomination), "dd/MM/yyy")
        : null,
      href: `/services/mesure/${id}/`,
      id: id,
      tribunal: ti.etablissement,
      numeroDossier: numero_dossier ? numero_dossier : null,
      numeroRg: numero_rg ? numero_rg : null,
      lieuVie: lieu_vie ? lieu_vie : null,
      status: status ? status : null,
      type: type ? type : null,
      ville: ville ? ville : null,
    };
  });
  return mesures;
};
