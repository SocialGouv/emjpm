const MESURES_INITIAL_STATE = {
  // store last udpate of the data. hack to be able to force update views when this change
  lastUpdate: null
};

const mesuresReducer = (state = MESURES_INITIAL_STATE, action) => {
  switch (action.type) {
    case "MESURE_UPDATED":
      return {
        ...state,
        lastUpdate: new Date()
      };
    default:
      return state;
  }
};

export default mesuresReducer;
