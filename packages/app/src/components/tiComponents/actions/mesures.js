import { hide } from "redux-modal";
import piwik from "react-piwik";

import apiFetch from "../../communComponents/Api";
import {
  fetchUpdateMesureAttente,
} from "./mandataire";

import { mesureClosed } from "../../mandataires/actions/mesures";

export const MESURE_UPDATED = "MESURE_UPDATED";
export const MESURE_CLOSED = "MESURE_CLOSED";

// ------------ API STUFF

const updateMesureApi = data =>
  apiFetch(`/mandataires/1/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

const closeMesureApi = data =>
  apiFetch(`/mandataires/${data.mandataire_id}/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      status: "Annulation mesure juge",
      extinction: data.date
    })
  });

// -------- ACTIONS CREATORS

export const updateMesure = data => dispatch =>
  updateMesureApi(data)
    .then(json => {
      dispatch(hide("EditMesure"));
      dispatch(mesureUpdated(json));
      piwik.push(["trackEvent", "Mesures", "Updated", data.id]);
    })
    .catch(e => {
      console.log(e);
      alert("Impossible de soumettre les données");
      throw e;
    });

export const closeMesure = data => dispatch =>
  closeMesureApi(data)
    .then(json => {
      fetchUpdateMesureAttente({ mandataire_id: data.mandataire_id }).then(() => {
        dispatch(hide("CloseMesureAttente"));
        dispatch(mesureClosed(json));
      });
    })
    .catch(e => {
      console.log(e);
      alert("Impossible de soumettre les données");
      throw e;
    });

// ------------ PLAIN ACTIONS

export const mesureUpdated = data => ({
  type: MESURE_UPDATED,
  data
});
