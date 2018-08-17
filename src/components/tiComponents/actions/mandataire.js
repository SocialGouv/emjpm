import apiFetch from "../../communComponents/Api";
import queryString from "query-string";
import { hide } from "redux-modal/lib/index";
import { mesureClosed } from "../../mandataires/actions/mesures";

export const MANDATAIRES_UPDATED = "MANDATAIRES_UPDATED";
export const MESURES_SHOW = "MESURES_SHOW";
export const SERVICES_SHOW = "SERVICES_SHOW";
export const UPDATE_FILTERS = "UPDATE_FILTERS";
export const FICHE_CLOSED = "FICHE_CLOSED";

export const MANDATAIRE_ETABLISSEMENT = "MANDATAIRE_ETABLISSEMENT";
export const MANDATAIRE_TIS = "MANDATAIRE_TIS";
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
        dispatch(mesuresShow(mesures));
      });
    })
    .then(() => {
      fetchServices().then(mesures => dispatch(servicesShow(mesures)));
    });

export const changeTypeOfMandatairesFilters = filters => {
  return dispatch => {
    const stringified = queryString.stringify(filters);
    return apiFetch(`/mesures/popup?${stringified}`)
      .then(mesures => {
        dispatch(updateFilters(filters, mesures));
      })
      .catch(e => {
        console.log(e);
      });
  };
};

export const openFichMandataireModal = mandataire => {
  console.log("Mandataire", mandataire);
  return dispatch => {
    return apiFetch(`/mandataires/${mandataire.id}/tisEtablissement`)
      .then(json => dispatch(etablissement(json)))
      .then(() =>
        apiFetch(`/mandataires/${mandataire.id}/tis-by-mandataire`).then(tisByMandataire =>
          dispatch(tis(tisByMandataire))
        )
      )
      .catch(e => {
        console.log(e);
      });
  };
};

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

export const updateFilters = (filters, dataMesure) => ({
  type: UPDATE_FILTERS,
  filters,
  dataMesure
});

export const ficheClose = (filters, filterData) => ({
  type: FICHE_CLOSED,
  filters,
  filterData
});

export const etablissement = etablissement => ({
  type: MANDATAIRE_ETABLISSEMENT,
  etablissement
});

export const tis = allTisForOneMandataire => ({
  type: MANDATAIRE_TIS,
  allTisForOneMandataire
});
