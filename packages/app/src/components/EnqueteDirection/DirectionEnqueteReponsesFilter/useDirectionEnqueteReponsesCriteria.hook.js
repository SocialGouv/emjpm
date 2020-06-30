import { useReducer } from "react";

export function useDirectionEnqueteReponsesCriteria({
  responseStatus,
  userType,
  searchText,
  selectedDepartement,
}) {
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
    responseStatus,
    userType,
    searchText: searchText || "",
    selectedDepartement,
  });

  return {
    criteria,
    updateCriteria: (name, value) => setCriteria({ name, value }),
  };
}
