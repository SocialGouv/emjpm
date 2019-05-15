import { hide } from "redux-modal";

import apiFetch from "../../communComponents/Api";

export const USER_PROFILE_UPDATED = "USER_PROFILE_UPDATED";

/* ---------- API */

const fetchProfile = () => apiFetch(`/users/1`);

const updateUserApi = data =>
  apiFetch(`/users/1`, {
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
/* ---------- ACTIONS CREATORS */

export const profileTi = () => dispatch =>
  fetchProfile().then(json => dispatch(userProfileUpdated(json)));

export const updateUser = data => dispatch => {
  return updateUserApi(data)
    .then(json => {
      dispatch(hide("EditUser"));
      dispatch(userProfileUpdated(json));
    })
    .catch(e => {
      alert("Impossible de soumettre les données");
      throw e;
    });
};

/* ----------- PLAIN ACTIONS  */

export const userProfileUpdated = data => ({
  type: USER_PROFILE_UPDATED,
  data
});
