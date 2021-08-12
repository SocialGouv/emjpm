import { mesureFormatter as formatter } from "@emjpm/biz";
import { format } from "date-fns";

export default function formatMesureListItems(mesureList) {
  const mesures = mesureList.map((mesure) => {
    const {
      lieu_vie,
      code_postal,
      numero_dossier,
      ville,
      status,
      id,
      ti,
      date_nomination,
      numero_rg,
      en_attente_reouverture,
      mesure_en_attente_reouvertures = [],
    } = mesure;

    const {
      annee_naissance,
      cabinet,
      judgment_date,
      is_urgent,
      champ_mesure,
      nature_mesure,
      civilite,
      antenne_id,
    } = en_attente_reouverture ? mesure_en_attente_reouvertures[0] : mesure;

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
      judgmentDate: judgment_date
        ? format(new Date(judgment_date), "dd/MM/yyy")
        : null,
      lieuVie: formatter.formatLieuVie(lieu_vie),
      natureMesure: formatter.formatNatureMesure(nature_mesure),
      numeroDossier: numero_dossier ? numero_dossier : "-",
      numeroRg: numero_rg ? numero_rg : null,
      status: status ? formatter.formatStatus(status) : null,
      tribunal: ti ? ti.etablissement : "-",
      ville: ville ? ville : null,
    };
  });
  return mesures;
}
