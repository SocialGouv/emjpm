import { hide } from "redux-modal";

import apiFetch from "../../communComponents/Api";

export const MANDATAIRE_MOUNT = "MANDATAIRE_MOUNT";
export const MANDATAIRE_PROFILE_UPDATED = "MANDATAIRE_PROFILE_UPDATED";
export const PROFILE_UPDATED = "PROFILE_UPDATED";
export const FINESS_UPDATED = "FINESS_UPDATED";
export const TIS_UPDATED = "TIS_UPDATED";

/* ---------- API */

const fetchProfile = () => apiFetch(`/mandataires/1`);

const updateMandataireApi = data =>
  apiFetch(`/mandataires/1`, {
    method: "PUT",
    body: JSON.stringify({
      ...data,
      zip: data.zip || "",
      secretariat: data.secretariat || false,
      nb_secretariat: data.nb_secretariat || 0
    })
  });

const fetchAllTis = () => apiFetch("/mandataires/tis");
const fetchAllFiness = () =>
  apiFetch("/mandataires/1/etablissements").then(data => data.filter((_, i) => i < 1000));

/* ---------- ACTIONS CREATORS */

//todo: bofbof
export const mandataireMount = () => dispatch =>
  fetchProfile()
    .then(json => dispatch(mandataireProfileUpdated(json)))
    .then(() => {
      fetchAllFiness().then(etablissements => dispatch(finessUpdated(etablissements)));
    })
    .then(() => {
      fetchAllTis().then(tis => dispatch(tisUpdated(tis)));
    });

export const updateMandataire = data => dispatch => {
  return updateMandataireApi(data)
    .then(json => {
      dispatch(hide(data.type === "service" ? "EditService" : "EditMandataire"));
      dispatch(mandataireProfileUpdated(json));
    })
    .catch(e => {
      alert("Impossible de soumettre les données");
      throw e;
    });
};

/* ----------- PLAIN ACTIONS  */

export const mandataireProfileUpdated = data => ({
  type: MANDATAIRE_PROFILE_UPDATED,
  data
});

export const finessUpdated = data => ({
  type: FINESS_UPDATED,
  data
});

export const tisUpdated = data => ({
  type: TIS_UPDATED,
  data
});
