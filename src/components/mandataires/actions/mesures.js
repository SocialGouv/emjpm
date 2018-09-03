import { hide } from "redux-modal";

import apiFetch from "../../communComponents/Api";
import { mandatairesUpdated } from "../../tiComponents/actions/mandataire";

export const MESURE_CREATE = "MESURE_CREATE";
export const MESURE_CREATED = "MESURE_CREATED";
export const MESURE_CREATED_ERROR = "MESURE_CREATED_ERROR";
export const MESURE_UPDATED = "MESURE_UPDATED";
export const MESURE_CLOSED = "MESURE_CLOSED";
export const MESURE_REACTIVATED = "MESURE_REACTIVATED";

// ------------ API STUFF

const updateMesureApi = data =>
  apiFetch(`/mandataires/1/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });

const closeMesureApi = data =>
  apiFetch(`/mandataires/1/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      status: "Eteindre mesure",
      extinction: data.date
    })
  });
const attenteMesureApi = data =>
  apiFetch(`/mandataires/1/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      ...data,
      status: "Mesure en cours"
    })
  });

const reactivateMesureApi = data =>
  apiFetch(`/mandataires/1/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify({
      status: "Mesure en cours",
      extinction: null
    })
  }).then(json =>
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
  apiFetch("/mandataires/1/mesures-en-attente", {
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
    })
    .catch(e => {
      console.log(e);
      alert("Impossible de soumettre les données");
      throw e;
    });

export const updateMesureAttente = data => dispatch => {
  attenteMesureApi(data)
    .then(() => fetchUpdateMesureAttente(data))
    .then(json => {
      dispatch(hide("ValiderMesureEnAttente"));
      dispatch(mesureUpdated(json));
    })
    .catch(e => {
      console.log(e);
      alert("Impossible de soumettre les données");
      throw e;
    });
};

export const closeMesure = data => dispatch =>
  closeMesureApi(data)
    .then(json => {
      dispatch(hide("CloseMesure"));
      dispatch(mesureClosed(json));
    })
    .catch(e => {
      console.log(e);
      alert("Impossible de soumettre les données");
      throw e;
    });

export const reactivateMesure = data => dispatch =>
  reactivateMesureApi(data)
    .then(json => {
      dispatch(hide("ReactivateMesure"));
      dispatch(mesureReactivated(json));
    })
    .catch(e => {
      console.log(e);
      alert("Impossible de soumettre les données");
      throw e;
    });

export const createMesureSave = data => dispatch =>
  createMesureApi(data)
    .then(json => {
      dispatch(mesureCreated(json));
    })
    .catch(e => {
      console.log("ERROR", e);
      dispatch(mesureCreatedError(e.message));
      throw e;
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
