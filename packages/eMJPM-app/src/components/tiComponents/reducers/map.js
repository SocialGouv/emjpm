const MAP_INITIAL_STATE = {
  coordinates: [2, 51.2]
};

const mapReducer = (state = MAP_INITIAL_STATE, action) => {
  switch (action.type) {
    case "COORDINATES_UPDATED":
      return {
        ...state,
        coordinates: [action.mesure.longitude, action.mesure.latitude]
      };
    default:
      return state;
  }
};

export default mapReducer;
