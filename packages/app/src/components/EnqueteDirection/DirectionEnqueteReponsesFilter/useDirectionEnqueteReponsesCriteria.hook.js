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
          currentOffset: 0,
        };
      }
      case "userType": {
        return {
          ...state,
          userType: action.value,
          currentOffset: 0,
        };
      }
      case "searchText": {
        return {
          ...state,
          searchText: action.value,
          currentOffset: 0,
        };
      }
      case "selectedDepartement": {
        return {
          ...state,
          selectedDepartement: action.value,
          currentOffset: 0,
        };
      }
      case "currentOffset": {
        return {
          ...state,
          currentOffset: action.value,
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
    currentOffset: 0,
  });

  return {
    criteria,
    updateCriteria: (name, value) => setCriteria({ name, value }),
  };
}
