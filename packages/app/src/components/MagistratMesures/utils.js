import { convertTokens, legacyParse } from "@date-fns/upgrade/v2";
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
      ti,
      annee,
      civilite,
      date_ouverture,
      is_urgent,
      judgment_date,
      numero_rg,
      cabinet
    } = mesure;

    const formatedDate = format(legacyParse(date_ouverture), convertTokens("DD/MM/YYYY"));
    const formatedjudgmentDate = format(legacyParse(judgment_date), convertTokens("DD/MM/YYYY"));
    return {
      judgmentDate: judgment_date ? formatedjudgmentDate : null,
      isUrgent: is_urgent,
      age: annee ? annee : null,
      antenneId: antenne_id ? antenne_id : null,
      cabinet: cabinet ? cabinet : null,
      civilite: civilite ? civilite : null,
      codePostal: code_postal ? code_postal : null,
      dateOuverture: date_ouverture ? date_ouverture : null,
      dateOuvertureFormated: date_ouverture ? formatedDate : null,
      href: `/services/mesure/${id}/`,
      id: id,
      tribunal: ti.etablissement,
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
