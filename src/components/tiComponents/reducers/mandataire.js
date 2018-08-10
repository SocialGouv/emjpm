const MANDATAIRE_INITIAL_STATE = {
  data: [],
  datamesure: [],
  services: []
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
    default:
      return state;
  }
};

export default mandataireReducer;
