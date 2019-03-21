import { hide } from "redux-modal";

import apiFetch from "../../communComponents/Api";

export const MANDATAIRE_MOUNT = "MANDATAIRE_MOUNT";
export const MANDATAIRE_PROFILE_UPDATED = "MANDATAIRE_PROFILE_UPDATED";
export const PROFILE_UPDATED = "PROFILE_UPDATED";
export const FINESS_UPDATED = "FINESS_UPDATED";
export const TIS_UPDATED = "TIS_UPDATED";
export const ANTENNES_UPDATED = "ANTENNES_UPDATED";
export const MANDATAIRE_PROFILES_UPDATED = "MANDATAIRE_PROFILES_UPDATED";
export const SERVICE_PROFILE_UPDATED = "SERVICE_PROFILE_UPDATED";
/* ---------- API */

const fetchProfile = () => apiFetch(`/mandataires/1`);
const fetchProfiles = () => apiFetch(`/mandataires/all`);

const fetchAntennes = () => apiFetch(`/mandataires/antennes`);
const fetchService = () => apiFetch(`/mandataires/service`);

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

const createMandataireApi = data =>
  apiFetch(`/mandataires/1`, {
    method: "PUT",
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
    })
    .then(() => {
      fetchAntennes().then(antennes => dispatch(AntennesUpdated(antennes)));
    })
    .then(() => {
      fetchProfiles().then(json => dispatch(mandataireProfilesUpdated(json)));
    })
    .then(() => {
      fetchService().then(json => dispatch(serviceProfileUpdated(json)));
    });

export const updateMandataire = data => dispatch => {
  if (data.type === "service") {
    return updateMandataireApi(data)
      .then(() => fetchProfiles())
      .then(json => {
        dispatch(hide("EditService"));
        dispatch(mandataireProfilesUpdated(json));
      })
      .catch(e => {
        alert("Impossible de soumettre les données");
        throw e;
      });
  } else {
    return updateMandataireApi(data)
      .then(json => {
        dispatch(hide("EditMandataire"));
        dispatch(mandataireProfileUpdated(json));
      })
      .catch(e => {
        alert("Impossible de soumettre les données");
        throw e;
      });
  }
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
    .then(() => fetchProfiles())
    .then(json => {
      dispatch(hide("AddAntennes"));
      dispatch(mandataireProfilesUpdated(json));
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

export const serviceProfileUpdated = data => ({
  type: SERVICE_PROFILE_UPDATED,
  data
});

export const mandataireProfilesUpdated = data => ({
  type: MANDATAIRE_PROFILES_UPDATED,
  data
});

export const AntennesUpdated = data => ({
  type: ANTENNES_UPDATED,
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
