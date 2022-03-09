import { useQuery } from "@apollo/client";
import { stdFormatter } from "@emjpm/biz";
import { createContext } from "react";
import useQueryReady from "~/hooks/useQueryReady";

import { MESURE_CONTEXT_QUERY } from "./queries";

export const Context = createContext({});

export function Provider(props) {
  const { children, mesureId } = props;
  const { data, loading, error } = useQuery(MESURE_CONTEXT_QUERY, {
    fetchPolicy: "cache-and-network",
    variables: {
      id: parseInt(mesureId),
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const [mesure] = data.mesures;
  const formatedMesure = formatMesure(mesure);
  return <Context.Provider value={formatedMesure}>{children}</Context.Provider>;
}

export const { Consumer } = Context;

function formatMesure(mesure) {
  const {
    lieu_vie,
    code_postal,
    numero_dossier,
    departement,
    ville,
    status,
    id,
    date_nomination,
    date_protection_en_cours,
    date_premier_mesure,
    numero_rg,
    ti,
    latitude,
    longitude,
    service_antenne,
    service_id,
    mandataire_id,
    pays,
    en_attente_reouverture,
    mesure_etats = [],
    mesure_ressources = [],
    mesure_en_attente_reouvertures = [],
    created_at,
    editor_id,
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

  const currentStatus = status;

  const currentYear = new Date().getFullYear();

  return {
    age: annee_naissance ? annee_naissance : "nc",
    antenne: service_antenne ? service_antenne.name : null,
    antenneId: antenne_id,
    cabinet: cabinet ? cabinet : null,
    champMesure: champ_mesure ? champ_mesure : "",
    civilite: civilite ? civilite : null,
    codePostal: code_postal ? code_postal : "",
    dateNomination: date_nomination ? date_nomination : "",
    dateNominationFormated: date_nomination
      ? stdFormatter.formatDateUI(date_nomination)
      : "",
    datePremierMesure: date_premier_mesure,
    datePremierMesureFormatted: date_premier_mesure
      ? stdFormatter.formatDateUI(date_premier_mesure)
      : "",
    dateProtectionEnCours: date_protection_en_cours,
    dateProtectionEnCoursFormatted: date_protection_en_cours
      ? stdFormatter.formatDateUI(date_protection_en_cours)
      : "",
    createdAtFormatted: created_at ? stdFormatter.formatDateUI(created_at) : "",
    departementCode: departement ? departement.id : null,
    id: id,
    isUrgent: is_urgent,
    judgmentDate: judgment_date,
    judgmentDateFormatted: judgment_date
      ? stdFormatter.formatDateUI(judgment_date)
      : "",
    latitude: latitude,
    lieuVie: lieu_vie ? lieu_vie : "",
    longitude: longitude,
    mandataire: { mandataire_id: mandataire_id },
    mandataireId: mandataire_id,
    mesureEtats: mesure_etats.map((etat) => ({
      champMesure: etat.champ_mesure,
      codePostal: etat.code_postal,
      dateChangementEtat: etat.date_changement_etat,
      dateChangementEtatFormatted: etat.date_changement_etat
        ? stdFormatter.formatDateUI(etat.date_changement_etat)
        : "",
      id: etat.id,
      lieuVie: etat.lieu_vie,
      natureMesure: etat.nature_mesure,
      pays: etat.pays,
      typeEtablissement: etat.type_etablissement,
      ville: etat.ville,
    })),
    mesureRessources: mesure_ressources.map((ressource) => ({
      annee: ressource.annee,
      id: ressource.id,
      niveauRessource: ressource.niveau_ressource,
      prestationsSociales: ressource.mesure_ressources_prestations_sociales.map(
        ({ prestations_sociales }) => prestations_sociales
      ),
    })),
    natureMesure: nature_mesure ? nature_mesure : "",
    numeroDossier: numero_dossier ? numero_dossier : "",
    numeroRg: numero_rg ? numero_rg : "",
    pays,
    realAge: annee_naissance ? currentYear - annee_naissance : "nc",
    service: { service_id: service_id },
    serviceId: service_id,
    status: status ? currentStatus : "",
    tiId: ti ? ti.id : null,
    tribunal: ti ? ti.etablissement : "Tribunal ",
    ville: ville ? ville : "",
    en_attente_reouverture: en_attente_reouverture,
    mesure_en_attente_reouvertures: mesure_en_attente_reouvertures,
    editor_id,
  };
}
