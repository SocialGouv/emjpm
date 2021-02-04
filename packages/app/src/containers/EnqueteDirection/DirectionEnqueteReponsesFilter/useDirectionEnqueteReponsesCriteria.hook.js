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
          currentOffset: 0,
          responseStatus: action.value,
        };
      }
      case "userType": {
        return {
          ...state,
          currentOffset: 0,
          userType: action.value,
        };
      }
      case "searchText": {
        return {
          ...state,
          currentOffset: 0,
          searchText: action.value,
        };
      }
      case "selectedDepartement": {
        return {
          ...state,
          currentOffset: 0,
          selectedDepartement: action.value,
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
    currentOffset: 0,
    responseStatus,
    searchText: searchText || "",
    selectedDepartement,
    userType,
  });

  return {
    criteria,
    updateCriteria: (name, value) => setCriteria({ name, value }),
  };
}
