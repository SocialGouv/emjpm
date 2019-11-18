import ReactPiwik from "react-piwik";
import { hide } from "redux-modal";

import apiFetch from "../../communComponents/Api";
import { fetchProfiles, mandataireProfilesUpdated } from "./mandataire";

export const MESURE_CREATE = "MESURE_CREATE";
export const MESURE_CREATED = "MESURE_CREATED";
export const MESURE_CREATED_ERROR = "MESURE_CREATED_ERROR";
export const MESURE_UPDATED = "MESURE_UPDATED";
export const MESURE_CLOSED = "MESURE_CLOSED";
export const MESURE_REACTIVATED = "MESURE_REACTIVATED";

// ------------ API STUFF

const updateMesureApi = data =>
  apiFetch(`/mandataires/${data.mandataire_id}/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

const closeMesureApi = data =>
  apiFetch(`/mandataires/${data.mandataire_id}/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...data,
      status: "Eteindre mesure"
    })
  });
const attenteMesureApi = data =>
  apiFetch(`/mandataires/${data.mandataire_id}/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...data,
      status: "Mesure en cours"
    })
  });

const reactivateMesureApi = data =>
  apiFetch(`/mandataires/${data.mandataire_id}/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      status: "Mesure en cours",
      extinction: null
    })
  }).then(() =>
    // todo: move to trigger
    apiFetch(`/mandataires/1/capacite`, {
      method: "PUT"
    })
  );

// todo : better API
const createMesureApi = data =>
  apiFetch(`/mandataires/1/mesures`, {
    method: "POST",
    body: JSON.stringify({
      ...data,
      status: "Mesure en cours"
    })
  });

const fetchUpdateMesureAttente = data =>
  apiFetch(`/mandataires/${data.mandataire_id}/mesures-en-attente`, {
    method: "PUT",
    body: JSON.stringify({
      ...data
    })
  });
// -------- ACTIONS CREATORS

export const updateMesure = data => dispatch =>
  updateMesureApi(data)
    .then(json => {
      dispatch(hide("EditMesure"));
      dispatch(mesureUpdated(json));
      ReactPiwik.push(["trackEvent", "Mesures", "Updated", data.id]);
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.error(error);
      /* eslint-enable no-console */
      alert("Impossible de soumettre les données");
      throw error;
    });

export const updateMesureAttente = data => dispatch => {
  attenteMesureApi(data)
    .then(() => fetchUpdateMesureAttente(data))
    .then(() => fetchProfiles())
    .then(json => {
      dispatch(hide("ValiderMesureEnAttente"));
      dispatch(mandataireProfilesUpdated(json));
      dispatch(mesureUpdated(json));
      ReactPiwik.push(["trackEvent", "Mesures", "Validated", data.id]);
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.error(error);
      /* eslint-enable no-console */
      alert("Impossible de soumettre les données");
      throw error;
    });
};

export const closeMesure = data => dispatch =>
  closeMesureApi(data)
    .then(() => fetchProfiles())
    .then(json => {
      dispatch(hide("CloseMesure"));
      dispatch(mandataireProfilesUpdated(json));
      dispatch(mesureClosed(json));
      ReactPiwik.push(["trackEvent", "Mesures", "Closed", data.id]);
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.error(error);
      /* eslint-enable no-console */
      alert("Impossible de soumettre les données");
      throw error;
    });

export const reactivateMesure = data => dispatch =>
  reactivateMesureApi(data)
    .then(() => fetchProfiles())
    .then(json => {
      dispatch(hide("ReactivateMesure"));
      dispatch(mandataireProfilesUpdated(json));
      dispatch(mesureReactivated(json));
      ReactPiwik.push(["trackEvent", "Mesures", "Reactivated", data.id]);
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.error(error);
      /* eslint-enable no-console */
      alert("Impossible de soumettre les données");
      throw error;
    });

export const createMesureSave = data => dispatch =>
  createMesureApi(data)
    .then(() => fetchProfiles())
    .then(json => {
      dispatch(mandataireProfilesUpdated(json));
      dispatch(mesureCreated(json));
      ReactPiwik.push(["trackEvent", "Mesures", "Created"]);
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.log("ERROR", error);
      /* eslint-enable no-console */
      dispatch(mesureCreatedError(error.message));
      throw error;
    });

// ------------ PLAIN ACTIONS

export const createMesure = () => ({
  type: MESURE_CREATE
});

export const mesureCreated = data => ({
  type: MESURE_CREATED,
  data
});

export const mesureCreatedError = message => ({
  type: MESURE_CREATED_ERROR,
  message
});

export const mesureUpdated = data => ({
  type: MESURE_UPDATED,
  data
});

export const mesureClosed = data => ({
  type: MESURE_CLOSED,
  data
});

export const mesureReactivated = data => ({
  type: MESURE_REACTIVATED,
  data
});
