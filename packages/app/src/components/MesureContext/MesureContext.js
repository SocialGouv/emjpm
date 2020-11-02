import { useQuery } from "@apollo/react-hooks";
import { format } from "date-fns";
import React, { createContext, Fragment } from "react";

import { MESURE_CONTEXT_QUERY } from "./queries";

export const Context = createContext({});

export const Provider = (props) => {
  const { children, mesureId } = props;

  const { data } = useQuery(MESURE_CONTEXT_QUERY, {
    fetchPolicy: "cache-and-network",
    variables: {
      id: mesureId,
    },
  });

  if (!data) {
    return <Fragment>loading</Fragment>;
  }

  const [mesure] = data.mesures;
  const formatedMesure = formatMesure(mesure);
  return <Context.Provider value={formatedMesure}>{children}</Context.Provider>;
};

export const { Consumer } = Context;

function formatMesure(mesure) {
  const {
    lieu_vie,
    code_postal,
    numero_dossier,
    departement,
    nature_mesure,
    champ_mesure,
    ville,
    status,
    id,
    annee_naissance,
    antenne_id,
    civilite,
    date_nomination,
    numero_rg,
    is_urgent,
    judgment_date,
    cabinet,
    ti,
    latitude,
    longitude,
    service_antenne,
    service_id,
    mandataire_id,
    pays,
  } = mesure;

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
      ? format(new Date(date_nomination), "dd/MM/yyyy")
      : "",
    departementId: departement ? departement.id : null,
    id: id,
    isUrgent: is_urgent,
    judgmentDate: judgment_date
      ? format(new Date(judgment_date), "dd/MM/yyyy")
      : "",
    latitude: latitude,
    lieuVie: lieu_vie ? lieu_vie : "",
    longitude: longitude,
    mandataire: { mandataire_id: mandataire_id },
    mandataireId: mandataire_id,
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
    ville: ville ? ville : "ville ",
  };
}
