import { useReducer } from "react";

export function useDirectionEnqueteReponsesCriteria() {
  function criteriaReducer(state, action) {
    switch (action.name) {
      case "responseStatus": {
        return {
          ...state,
          responseStatus: action.value,
        };
      }
      case "userType": {
        return {
          ...state,
          userType: action.value,
        };
      }
      case "searchText": {
        return {
          ...state,
          searchText: action.value,
        };
      }
      case "selectedDepartement": {
        return {
          ...state,
          selectedDepartement: action.value,
        };
      }
    }
    return state;
  }

  const [criteria, setCriteria] = useReducer(criteriaReducer, {
    responseStatus: undefined,
    userType: undefined,
    searchText: "",
    selectedDepartement: undefined,
  });

  return {
    criteria,
    updateCriteria: (name, value) => setCriteria({ name, value }),
  };
}
