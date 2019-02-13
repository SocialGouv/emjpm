import apiFetch from "../../communComponents/Api";
import { hide, show } from "redux-modal";

export const MANDATAIRES_UPDATED = "MANDATAIRES_UPDATED";
export const MESURES_SHOW = "MESURES_SHOW";
export const SERVICES_SHOW = "SERVICES_SHOW";
export const UPDATE_FILTERS = "UPDATE_FILTERS";
export const FICHE_CLOSED = "FICHE_CLOSED";

export const MANDATAIRE_ETABLISSEMENT = "MANDATAIRE_ETABLISSEMENT";
export const MANDATAIRE_TIS = "MANDATAIRE_TIS";
export const UPDATE_FILTERS_MANDATAIRES = "UPDATE_FILTERS_MANDATAIRES";

/* ---------- API */

const fetchMandataires = () => apiFetch(`/mandataires`);
const fetchMesures = () => apiFetch("/mesures/popup");
const fetchServices = () => apiFetch("/mandataires/services");
const fetchUpdateMesureAttente = data =>
  apiFetch("/mandataires/1/mesures-en-attente", {
    method: "PUT",
    body: JSON.stringify({
      ...data
    })
  });

const createMesureApi = data => {
  return apiFetch(`/mandataires/1/mesures`, {
    method: "POST",
    body: JSON.stringify({
      ...data,
      date_ouverture: new Date(),
      status: "Mesure en attente"
    })
  });
};
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

export const openFicheMandataireModal = mandataire => {
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

export const openValidationModal = ({ formData }) => {
  return dispatch => {
    return createMesureApi(formData)
      .then(() => {
        dispatch(hide("ModalMesureReservation"));
        dispatch(show("ModalMesureValidation"));
      })
      .then(() =>
        fetchUpdateMesureAttente(formData).then(() =>
          fetchMandataires().then(json => dispatch(mandatairesUpdated(json)))
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

export const updateFilters = filters => ({
  type: UPDATE_FILTERS,
  filters
});

export const updateFiltersMandataire = filters => ({
  type: UPDATE_FILTERS_MANDATAIRES,
  filters
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
