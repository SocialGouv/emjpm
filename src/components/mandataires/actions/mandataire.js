import apiFetch from "../../communComponents/Api";

export const MANDATAIRE_MOUNT = "MANDATAIRE_MOUNT";
export const MANDATAIRE_PROFILE_UPDATED = "MANDATAIRE_PROFILE_UPDATED";
export const PROFILE_UPDATED = "PROFILE_UPDATED";

const fetchProfile = () => apiFetch(`/mandataires/1`);

/* ACTIONS CREATORS */

export const mandataireMount = () => dispatch =>
  fetchProfile().then(json => dispatch(updateMandataireProfile(json)));

export const updateProfile = data => dispatch => {
  //todo
  console.log("updateProfile", data);
  return Promise.resolve();
  updateProfileApi(data)
    .then(json => {
      //dispatch(hide("EditMesure"));
      dispatch(profileUpdated(json));
    })
    .catch(e => {
      console.log(e);
      alert("Impossible de soumettre les données");
      throw e;
    });
};

/* ACTIONS  */

export const updateMandataireProfile = data => ({
  type: MANDATAIRE_PROFILE_UPDATED,
  data
});

export const profileUpdated = data => ({
  type: PROFILE_UPDATED,
  data
});
