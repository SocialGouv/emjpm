import apiFetch from "../../communComponents/Api";

export const MANDATAIRES_UPDATED = "MANDATAIRES_UPDATED";
export const MESURES_SHOW = "MESURES_SHOW";
export const SERVICES_SHOW = "SERVICES_SHOW";
/* ---------- API */

const fetchMandataires = () => apiFetch(`/mandataires`);
const fetchMesures = () => apiFetch("/mesures/popup");
const fetchServices = () => apiFetch("/mandataires/services");

/* ---------- ACTIONS CREATORS */

export const tiMount = () => dispatch =>
  fetchMandataires()
    .then(json => dispatch(mandatairesUpdated(json)))
    .then(() => {
      fetchMesures().then(mesures => {
        console.log("mesures", mesures);
        dispatch(mesuresShow(mesures));
      });
    })
    .then(() => {
      fetchServices().then(mesures => dispatch(servicesShow(mesures)));
    });

/* ----------- PLAIN ACTIONS  */

export const mandatairesUpdated = data => ({
  type: MANDATAIRES_UPDATED,
  data
});

export const mesuresShow = datamesure => ({
  type: MESURES_SHOW,
  datamesure
});

export const servicesShow = services => ({
  type: SERVICES_SHOW,
  services
});
