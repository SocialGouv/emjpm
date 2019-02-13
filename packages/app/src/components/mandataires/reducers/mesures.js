const MESURES_INITIAL_STATE = {
  // store last udpate of the data. hack to be able to force update views when this change
  lastUpdate: null,
  // hold mesure created form API return status+message
  mesureCreatedStatus: null,
  mesureCreatedMessage: null
};

const mesuresReducer = (state = MESURES_INITIAL_STATE, action) => {
  switch (action.type) {
    case "MESURE_CREATE":
      return {
        ...state,
        mesureCreatedStatus: null,
        mesureCreatedMessage: null
      };
    case "MESURE_UPDATED":
    case "MESURE_REACTIVATED":
    case "MESURE_CLOSED":
      return {
        ...state,
        lastUpdate: new Date()
      };
    case "MESURE_CREATED":
      return {
        ...state,
        mesureCreatedStatus: "success",
        mesureCreatedMessage: null,
        lastUpdate: new Date()
      };
    case "MESURE_CREATED_ERROR":
      return {
        ...state,
        mesureCreatedStatus: "error",
        mesureCreatedMessage: action.message,
        lastUpdate: new Date()
      };
    default:
      return state;
  }
};

export default mesuresReducer;
