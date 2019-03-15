import { MANDATAIRE_INITIAL_STATE } from "./mandataire";

const userReducer = (state = MANDATAIRE_INITIAL_STATE, action) => {
  switch (action.type) {
    case "USER_PROFILE_UPDATED":
      return {
        ...state,
        profile: action.data
      };
    default:
      return state;
  }
};

export default userReducer;
