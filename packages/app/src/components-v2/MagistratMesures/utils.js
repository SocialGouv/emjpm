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
      civilite: civilite ? civilite : null,
      dateOuvertureFormated: date_ouverture ? formatedDate : null,
      dateOuverture: date_ouverture ? date_ouverture : null,
      href: `/services/mesure/${id}/`,
      id: id,
      numeroRg: numero_rg ? numero_rg : null,
      status: status ? status : null,
      type: type ? type : null,
      ville: ville ? ville : null,
      residence: residence ? residence : null,
      codePostal: code_postal ? code_postal : null,
      numeroDossier: numero_dossier ? numero_dossier : null,
      antenneId: antenne_id ? antenne_id : null,
      cabinet: cabinet ? cabinet : null
    };
  });
  return mesures;
};
