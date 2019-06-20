import apiFetch from "../../communComponents/Api";

export const COORDINATES_UPDATED = "COORDINATES_UPDATED";
/* ---------- API */

const fetchpostCode = codePostal => apiFetch(`/mandataires/postcode/${codePostal}`);
/* ---------- ACTIONS CREATORS */

export const zoomCodePostal = codePostal => dispatch => {
  if (!codePostal || !codePostal.trim()) {
    return Promise.resolve(null);
  } else if (!codePostal.match(/^(([0-8][0-9])|(9[0-5])|(2[AB]))[0-9]{3}$/)) {
    return alert("Code postal non valide");
  }
  fetchpostCode(codePostal)
    .then(mesure => {
      dispatch(coordinates(mesure));
    })
    .catch(error => {
      /* eslint-disable no-console */
      console.log(error);
      /* eslint-enable no-console */
    });
};

/* ----------- PLAIN ACTIONS  */

export const coordinates = mesure => ({
  type: COORDINATES_UPDATED,
  mesure
});
