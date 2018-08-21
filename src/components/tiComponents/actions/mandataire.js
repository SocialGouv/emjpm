import apiFetch from "../../communComponents/Api";

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

export const filtersMesure = (filters, data, isMandataire) => {
  return dispatch => {
    if (isMandataire) {
      const dataFilter = data.filter(datum => datum.type === filters);
      return dispatch(updateFiltersMandataire(filters, dataFilter));
    } else {
      const dataFilter = data.filter(datum => datum.types.find(typedata => typedata === filters));
      return dispatch(updateFilters(filters, dataFilter));
    }
  };
};

export const openFichMandataireModal = mandataire => {
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

export const updateFiltersMandataire = (filters, data) => ({
  type: UPDATE_FILTERS_MANDATAIRES,
  filters,
  data
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
