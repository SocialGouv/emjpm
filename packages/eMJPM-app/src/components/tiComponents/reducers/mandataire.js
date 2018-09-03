const MANDATAIRE_INITIAL_STATE = {
  data: [],
  dataFilters: [],
  datamesure: [],
  datamesureFilters: [],
  services: [],
  filters: "",
  filterData: [],
  currentEtablissementsForSelectedMandataire: "",
  allTisForOneMandataire: "",
  lastUpdate: ""
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
    case "UPDATE_FILTERS":
      return {
        ...state,
        filters: action.filters,
        datamesureFilters: state.datamesure.filter(
          datum =>
            !action.filters ||
            datum.types.map(t => t.toLowerCase()).includes(action.filters.toLowerCase())
        ),
        dataFilters: state.data.filter(
          datum => !action.filters || datum.type.toLowerCase() === action.filters.toLowerCase()
        )
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
    default:
      return state;
  }
};

export default mandataireReducer;
