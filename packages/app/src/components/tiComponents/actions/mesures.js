import { hide } from "redux-modal";
import piwik from "react-piwik";

import apiFetch from "../../communComponents/Api";

export const MESURE_UPDATED = "MESURE_UPDATED";

// ------------ API STUFF

const updateMesureApi = data =>
  apiFetch(`/mandataires/1/mesures/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data)
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

// ------------ PLAIN ACTIONS

export const mesureUpdated = data => ({
  type: MESURE_UPDATED,
  data
});

