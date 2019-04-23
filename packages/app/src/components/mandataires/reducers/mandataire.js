//

import piwik from "react-piwik";

const MANDATAIRE_INITIAL_STATE = {
  finess: [],
  profiles: [],
  tis: [],
  service: {},
  mandataireId: 0,
  lastUpdate: null
};

const mandataireReducer = (state = MANDATAIRE_INITIAL_STATE, action) => {
  switch (action.type) {
    case "MANDATAIRE_PROFILE_UPDATED":
      // Track when mandataires are changing them maximum desired measures
      if (state.profile.dispo_max !== action.data.dispo_max) {
        piwik.push([
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
        mandataireId: action.data[0] && action.data[0].id,
        lastUpdate: new Date()
      };
    case "CHANGE_MANDATAIRE_ID_INIT":
      return {
        ...state,
        mandataireId: action.data[0].id,
        lastUpdate: new Date()
      };
    case "MANDATAIRE_PROFILES_UPDATED":
      return {
        ...state,
        profiles: action.data,
        lastUpdate: new Date()
      };
    case "SERVICE_PROFILE_UPDATED":
      return {
        ...state,
        service: action.data
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
