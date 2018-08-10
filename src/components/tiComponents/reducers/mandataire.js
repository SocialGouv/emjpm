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
    case "MESURES_SHOW ":
      return {
        ...state,
        datamesure: action.data
      };
    case "SERVICES_SHOW":
      return {
        ...state,
        services: action.data
      };
    default:
      return state;
  }
};

export default mandataireReducer;
