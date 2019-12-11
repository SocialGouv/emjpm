import { format } from "date-fns";

export const formatMandatairesMesureList = mesureList => {
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
      cabinet
    } = mesure;
    const formatedDate = format(date_ouverture, "DD/MM/YYYY");
    return {
      age: annee ? annee : null,
      antenneId: antenne_id ? antenne_id : null,
      cabinet: cabinet ? cabinet : null,
      civilite: civilite ? civilite : null,
      codePostal: code_postal ? code_postal : null,
      dateOuverture: date_ouverture ? date_ouverture : null,
      dateOuvertureFormated: date_ouverture ? formatedDate : null,
      href: `/services/mesure/${id}/`,
      id: id,
      numeroDossier: numero_dossier ? numero_dossier : null,
      numeroRg: numero_rg ? numero_rg : null,
      residence: residence ? residence : null,
      status: status ? status : null,
      type: type ? type : null,
      ville: ville ? ville : null
    };
  });
  return mesures;
};
