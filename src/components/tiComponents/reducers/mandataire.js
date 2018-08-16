const MANDATAIRE_INITIAL_STATE = {
  data: [],
  dataFilters: [],
  datamesure: [],
  datamesureFilters: [],
  services: [],
  filters: "",
  filterData: [],
  currentEtablissementsForSelectedMandataire: "",
  allTisForOneMandataire: ""
};

const mandataireReducer = (state = MANDATAIRE_INITIAL_STATE, action) => {
  switch (action.type) {
    case "MANDATAIRES_UPDATED":
      return {
        ...state,
        filters: "",
        data: action.data,
        dataFilters: action.data
      };
    case "MESURES_SHOW":
      return {
        ...state,
        filters: "",
        datamesure: action.datamesure,
        datamesureFilters: action.datamesure
      };
    case "SERVICES_SHOW":
      return {
        ...state,
        services: action.services
      };
    case "UPDATE_FILTERS_MANDATAIRES":
      return {
        ...state,
        filters: action.filters,
        dataFilters: action.data
      };
    case "MANDATAIRE_TIS":
      return {
        ...state,
        allTisForOneMandataire: action.allTisForOneMandataire
      };
    case "MANDATAIRE_ETABLISSEMENT":
      return {
        ...state,
        currentEtablissementsForSelectedMandataire: action.etablissement
      };
    case "MESURE_CREATE":
      return {
        ...state
      };
    case "UPDATE_FILTERS":
      return { ...state, filters: action.filters, datamesureFilters: action.dataMesure };
    default:
      return state;
  }
};

export default mandataireReducer;
