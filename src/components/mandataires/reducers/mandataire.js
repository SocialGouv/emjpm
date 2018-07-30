const MANDATAIRE_INITIAL_STATE = {
  profile: {
    mesures_en_cours: 0
  }
};

const mandataireReducer = (state = MANDATAIRE_INITIAL_STATE, action) => {
  switch (action.type) {
    case "MANDATAIRE_PROFILE_UPDATED":
      return {
        ...state,
        profile: action.data
      };
    case "MESURE_REACTIVATED":
    case "MESURE_CREATED":
      return {
        ...state,
        profile: {
          ...state.profile,
          mesures_en_cours: state.profile.mesures_en_cours + 1
        }
      };
    case "MESURE_CLOSED":
      return {
        ...state,
        profile: {
          ...state.profile,
          mesures_en_cours: state.profile.mesures_en_cours - 1
        }
      };
    default:
      return state;
  }
};

export default mandataireReducer;
