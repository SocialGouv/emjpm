import { hide } from "redux-modal";
import Router from "next/router";

import apiFetch from "../../communComponents/Api";

export const MANDATAIRE_MOUNT = "MANDATAIRE_MOUNT";
export const MANDATAIRE_PROFILE_UPDATED = "MANDATAIRE_PROFILE_UPDATED";
export const PROFILE_UPDATED = "PROFILE_UPDATED";
export const FINESS_UPDATED = "FINESS_UPDATED";
export const TIS_UPDATED = "TIS_UPDATED";
export const SERVICE_PROFILE_UPDATED = "SERVICE_PROFILE_UPDATED";
export const MANDATAIRE_PROFILES_UPDATED = "MANDATAIRE_PROFILES_UPDATED";

/* ---------- API */

const fetchProfile = () => apiFetch(`/mandataires/1`);
const fetchService = () => apiFetch(`/mandataires/service`);

const createMandataireApi = data =>
  apiFetch(`/mandataires`, {
    method: "POST",
    body: JSON.stringify({
      ...data
    })
  });

const updateServiceApi = data =>
  apiFetch(`/mandataires/service/1`, {
    method: "PUT",
    body: JSON.stringify({
      ...data,
      zip: data.zip || "",
      genre: data.genre || "",
      secretariat: data.secretariat || false,
      nb_secretariat: data.nb_secretariat || 0,
      telephone: data.telephone || "",
      telephone_portable: data.telephone_portable || "",
      adresse: data.adresse || "",
      code_postal: data.code_postal || "",
      dispo_max: data.dispo_max || 0,
      ville: data.ville || ""
    })
  });

const updateMandataireApi = data =>
  apiFetch(`/mandataires/1`, {
    method: "PUT",
    body: JSON.stringify({
      ...data,
      zip: data.zip || "",
      genre: data.genre || "",
      secretariat: data.secretariat || false,
      nb_secretariat: data.nb_secretariat || 0,
      telephone: data.telephone || "",
      telephone_portable: data.telephone_portable || "",
      adresse: data.adresse || "",
      code_postal: data.code_postal || "",
      dispo_max: data.dispo_max || 0,
      ville: data.ville || ""
    })
  });

const fetchAllTis = () => apiFetch("/mandataires/tis");
const fetchAllFiness = () =>
  apiFetch("/mandataires/1/etablissements").then(data => data.filter((_, i) => i < 1000));

/* ---------- ACTIONS CREATORS */

//todo: bofbof
export const mandataireMount = () => dispatch => {
  fetchProfile().then(json => {
    dispatch(mandataireProfileUpdated(json));
    if (json.type === "service") {
      fetchAllFiness()
        .then(etablissements => dispatch(finessUpdated(etablissements)))
        .then(() => {
          fetchAllTis().then(tis => dispatch(tisUpdated(tis)));
        })
        .then(() => {
          fetchService().then(json => dispatch(serviceProfileUpdated(json)));
        });
    } else {
      fetchAllFiness()
        .then(etablissements => dispatch(finessUpdated(etablissements)))
        .then(() => {
          fetchAllTis().then(tis => dispatch(tisUpdated(tis)));
        });
    }
  });
};

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

export const updateService = data => dispatch => {
  return updateServiceApi(data)
    .then(() => fetchService())
    .then(json => {
      dispatch(hide("EditServiceSiege"));
      dispatch(serviceProfileUpdated(json));
    })
    .catch(e => {
      alert("Impossible de soumettre les données");
      throw e;
    });
};

export const addAntennesToMAndataires = data => dispatch => {
  return createMandataireApi(data)
    .then(() => fetchProfile())
    .then(json => {
      dispatch(hide("AddAntennes"));
      dispatch(mandataireProfileUpdated(json));
    })
    .then(() => Router.push("/mandataires"));
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

export const serviceProfileUpdated = data => ({
  type: SERVICE_PROFILE_UPDATED,
  data
});
