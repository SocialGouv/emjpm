const MANDATAIRE_INITIAL_STATE = {
  data: [],
  datamesure: [],
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
        data: action.data
      };
    case "MESURES_SHOW":
      return {
        ...state,
        datamesure: action.datamesure
      };
    case "SERVICES_SHOW":
      return {
        ...state,
        services: action.services
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
    case "UPDATE_FILTERS":
      return { filters: action.filters, datamesure: action.dataMesure };
    default:
      return state;
  }
};

export default mandataireReducer;
