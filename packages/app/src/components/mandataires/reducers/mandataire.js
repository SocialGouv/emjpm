//

import ReactPiwik from "react-piwik";

const MANDATAIRE_INITIAL_STATE = {
  finess: [],
  profiles: {},
  tis: [],
  service: {},
  mandataireId: null,
  lastUpdate: null,
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
        mandataireId: action.data,
        lastUpdate: new Date()
      };
    case "CHANGE_MANDATAIRE_ID_INIT":
      return {
        ...state,
        mandataireId: action.data.id,
        lastUpdate: new Date()
      };
    case "MANDATAIRE_PROFILES_UPDATED":
      return {
        ...state,
        profiles: action.data,
        lastUpdate: new Date()
      };
    case "USER_PROFILE_UPDATED":
      return {
        ...state,
        user: action.data,
        lastUpdate: new Date()
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
