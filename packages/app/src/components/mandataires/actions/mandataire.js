import { hide } from "redux-modal";

import apiFetch from "../../communComponents/Api";

export const MANDATAIRE_MOUNT = "MANDATAIRE_MOUNT";
export const FINESS_UPDATED = "FINESS_UPDATED";
export const TIS_UPDATED = "TIS_UPDATED";
export const MANDATAIRE_PROFILES_UPDATED = "MANDATAIRE_PROFILES_UPDATED";
export const CHANGE_MANDATAIRE_ID = "CHANGE_MANDATAIRE_ID";
export const ANTENNES_UPDATED = "ANTENNES_UPDATED";
export const CHANGE_MANDATAIRE_ID_INIT = "CHANGE_MANDATAIRE_ID_INIT";
export const USER_PROFILE_UPDATED = "USER_PROFILE_UPDATED";
export const MANDATAIRE_PROFILE_UPDATED = "MANDATAIRE_PROFILE_UPDATED";
/* ---------- API */
export const fetchUserProfiles = () => apiFetch(`/users/1`);
export const fetchProfiles = () => apiFetch(`/mandataires/all`);

const updateMandataireApi = data =>
  apiFetch(`/mandataires/1`, {
    body: JSON.stringify({
      ...data,
      adresse: data.adresse || "",
      code_postal: data.code_postal || "",
      dispo_max: data.dispo_max || 0,
      genre: data.genre || "",
      nb_secretariat: data.nb_secretariat || 0,
      secretariat: data.secretariat || false,
      telephone: data.telephone || "",
      telephone_portable: data.telephone_portable || "",
      ville: data.ville || "",
      zip: data.zip || ""
    }),
    method: "PUT"
  });

const fetchAllTis = () => apiFetch("/mandataires/tis");
const fetchAllFiness = () =>
  apiFetch("/mandataires/1/etablissements").then(data => data.filter((_, i) => i < 1000));

/* ---------- ACTIONS CREATORS */

//todo: bofbof
export const mandataireMount = () => async dispatch => {
  const userProfiles = await fetchUserProfiles();
  await dispatch(userProfileUpdated(userProfiles));

  const finess = await fetchAllFiness();
  await dispatch(finessUpdated(finess));

  const tis = await fetchAllTis();
  await dispatch(tisUpdated(tis));

  const profiles = await fetchProfiles();
  await dispatch(mandataireProfilesUpdated(profiles));
  await dispatch(changeMandataireIdDisplayInit(profiles));
};

export const updateMandataire = data => async dispatch => {
  try {
    await updateMandataireApi(data);
    const profile = await fetchProfiles();
    await dispatch(hide("EditMandataire"));
    await dispatch(mandataireProfilesUpdated(profile));
  } catch (e) {
    alert("Impossible de soumettre les données");
    throw e;
  }
};

export const changeMandataireId = data => dispatch => {
  return dispatch(changeMandataireIdDisplay(data));
};

/* ----------- PLAIN ACTIONS  */

export const changeMandataireIdDisplay = data => ({ data, type: CHANGE_MANDATAIRE_ID });

export const userProfileUpdated = data => ({
  data,
  type: USER_PROFILE_UPDATED
});

export const changeMandataireIdDisplayInit = data => ({
  data,
  type: CHANGE_MANDATAIRE_ID_INIT
});

export const mandataireProfileUpdated = data => ({
  data,
  type: MANDATAIRE_PROFILE_UPDATED
});

export const finessUpdated = data => ({
  data,
  type: FINESS_UPDATED
});

export const tisUpdated = data => ({
  data,
  type: TIS_UPDATED
});

export const mandataireProfilesUpdated = data => ({
  data,
  type: MANDATAIRE_PROFILES_UPDATED
});
