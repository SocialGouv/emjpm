import { mesureFormatter as formatter } from "@emjpm/core";
import { format } from "date-fns";

const formatMesureListItems = (mesureList) => {
  const mesures = mesureList.map((mesure) => {
    const {
      lieu_vie,
      code_postal,
      numero_dossier,
      antenne_id,
      nature_mesure,
      champ_mesure,
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
      age: annee_naissance ? annee_naissance : null,
      antenneId: antenne_id ? antenne_id : null,
      cabinet: cabinet ? cabinet : null,
      champMesure: formatter.formatChampMesure(champ_mesure),
      civilite: civilite ? civilite : null,
      codePostal: code_postal ? code_postal : null,
      dateNomination: date_nomination ? date_nomination : null,
      dateNominationFormated: date_nomination
        ? format(new Date(date_nomination), "dd/MM/yyy")
        : null,
      id: id,
      isUrgent: is_urgent,
      judgmentDate: judgment_date ? format(new Date(judgment_date), "dd/MM/yyy") : null,
      lieuVie: formatter.formatLieuVie(lieu_vie),
      natureMesure: formatter.formatNatureMesure(nature_mesure),
      numeroDossier: numero_dossier ? numero_dossier : "-",
      numeroRg: numero_rg ? numero_rg : null,
      status: status ? formatter.formatStatus(status) : null,
      tribunal: ti.etablissement,
      ville: ville ? ville : null,
    };
  });
  return mesures;
};

export { formatMesureListItems };
