import apiFetch from "../../communComponents/Api";

export const COORDINATES_UPDATED = "COORDINATES_UPDATED";
/* ---------- API */

const fetchpostCode = codePostal =>
  apiFetch("/mandataires/PosteCode", {
    method: "POST",
    body: JSON.stringify({
      codePoste: codePostal
    })
  });
/* ---------- ACTIONS CREATORS */

export const zoomCodePostal = codePostal => dispatch => {
  if (!codePostal || !codePostal.trim()) {
    return Promise.resolve(null);
  }

  fetchpostCode(codePostal)
    .then(mesure => {
      dispatch(coordinates(mesure));
    })
    .catch(e => {
      console.log(e);
    });
};

/* ----------- PLAIN ACTIONS  */

export const coordinates = mesure => ({
  type: COORDINATES_UPDATED,
  mesure
});
