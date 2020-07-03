import React, { createContext, useContext, useState } from "react";
import { useQuery } from "react-apollo";

import { useDebounce } from "../../../lib/hooks";
import { UserContext } from "../../UserContext";
import { GET_DEPARTEMENTS, GET_DIRECTION_REGION_DEPARTEMENT } from "../queries";

export const Context = createContext({});

export const Provider = (props) => {
  // Initial values are obtained from the props
  const { children } = props;

  // Use State to keep the values
  const [departements, setDepartements] = useState([]);
  const [selectedType, selectType] = useState(false);

  const user = useContext(UserContext);
  const { data } = useQuery(GET_DIRECTION_REGION_DEPARTEMENT, {
    variables: {
      userId: user.id,
    },
    skip: user.type !== "direction",
  });

  let departementsIds = null;

  if (data && data.direction) {
    const [direction] = data.direction;
    const { departement, region } = direction;

    if (region && region.departements) {
      const { departements } = region;
      departementsIds = departements.map(({ id }) => id);
    } else if (departement) {
      departementsIds = [departement.id];
    }
  }

  const { data: departementsData, loading, error } = useQuery(GET_DEPARTEMENTS, {
    variables: {
      filterIds: departementsIds,
    },
    onCompleted: (result) => {
      setDepartements(result ? result.departements : []);
    },
  });

  // Use State to keep the values
  const [searchNom, changeSearchNom] = useState();
  const [searchPrenom, changeSearchPrenom] = useState();
  const [searchSiret, changeSearchSiret] = useState();
  const [departementFinanceur, toogleDepartementFinanceur] = useState(false);

  const debouncedSearchNom = useDebounce(searchNom, 1000);
  const debouncedSearchPrenom = useDebounce(searchPrenom, 1000);
  const debouncedSearchSiret = useDebounce(searchSiret, 1000);

  function searchDepartement(value) {
    if (value === null) {
      setDepartements(departementsData.departements);
    } else {
      const departements = departementsData.departements.filter((item) => item.id === value);
      setDepartements(departements);
    }
  }

  // Make the context object:
  const filtersContext = {
    loading,
    error,
    departements,
    searchDepartement,
    selectedType,
    selectType,
    changeSearchNom,
    debouncedSearchNom,
    departementFinanceur,
    toogleDepartementFinanceur,
    searchSiret,
    changeSearchSiret,
    debouncedSearchSiret,
    searchPrenom,
    changeSearchPrenom,
    debouncedSearchPrenom,
  };

  // pass the value in provider and return
  return <Context.Provider value={filtersContext}>{children}</Context.Provider>;
};

export const { Consumer } = Context;
