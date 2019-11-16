//

import ReactPiwik from "react-piwik";

const MANDATAIRE_INITIAL_STATE = {
  finess: [],
  lastUpdate: null,
  mandataireId: null,
  profiles: {},
  service: {},
  tis: [],
  user: {}
};

const mandataireReducer = (state = MANDATAIRE_INITIAL_STATE, action) => {
  switch (action.type) {
    case "MANDATAIRE_PROFILE_UPDATED":
      // Track when mandataires are changing them maximum desired measures
      if (state.profile.dispo_max !== action.data.dispo_max) {
        ReactPiwik.push([
          "trackEvent",
          "Mandataire",
          "Updated profile",
          "Max desired measures",
          action.data.dispo_max
        ]);
      }

      return {
        ...state
      };
    case "CHANGE_MANDATAIRE_ID":
      return {
        ...state,
        lastUpdate: new Date(),
        mandataireId: action.data
      };
    case "CHANGE_MANDATAIRE_ID_INIT":
      return {
        ...state,
        lastUpdate: new Date(),
        mandataireId: action.data.id
      };
    case "MANDATAIRE_PROFILES_UPDATED":
      return {
        ...state,
        lastUpdate: new Date(),
        profiles: action.data
      };
    case "USER_PROFILE_UPDATED":
      return {
        ...state,
        lastUpdate: new Date(),
        user: action.data
      };
    case "FINESS_UPDATED":
      return {
        ...state,
        finess: action.data
      };

    case "TIS_UPDATED":
      return {
        ...state,
        tis: action.data
      };
    case "MESURE_REACTIVATED":
    case "MESURE_UPDATED":
    case "MESURE_CREATED":
      return {
        ...state,
        lastUpdate: new Date()
      };
    case "MESURE_CLOSED":
      return {
        ...state,
        lastUpdate: new Date()
      };
    default:
      return state;
  }
};

export default mandataireReducer;
