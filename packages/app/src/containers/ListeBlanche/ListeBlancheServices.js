import { useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";

import useQueryReady from "~/hooks/useQueryReady";
import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { PaginatedList } from "~/containers/PaginatedList";

import { ListeBlancheServiceItem } from "./ListeBlancheService";
import { LB_SERVICES } from "./queries";

const resultPerPage = 10;

function getRequestFilters(filters) {
  const requestFilters = {};

  if (filters.departement) {
    requestFilters.departement_code = { _eq: filters.departement };
  }

  if (filters.siret) {
    requestFilters.siret = { _eq: filters.siret.trim() };
  }

  if (filters.nom_service) {
    requestFilters.etablissement = { _ilike: `${filters.nom_service.trim()}%` };
  }

  return requestFilters;
}

export function ListeBlancheServices(props) {
  const { onSelectItem } = props;
  const [currentOffset, setCurrentOffset] = useState(0);
  const { filters, debounceFilters } = useContext(FiltersContextSerializable);
  const { data, loading, error } = useQuery(LB_SERVICES, {
    variables: {
      filters: getRequestFilters(debounceFilters),
      limit: resultPerPage,
      offset: currentOffset,
    },
  });

  useEffect(() => {
    setCurrentOffset(0);
  }, [filters]);

  const { count, services } = useMemo(() => {
    if (data) {
      return {
        count: data.services_aggregate.aggregate.count,
        services: data.services,
      };
    }
    return {
      count: 0,
      users: [],
    };
  }, [data]);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <PaginatedList
      entries={services}
      RowItem={ListeBlancheServiceItem}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
      onRowClick={onSelectItem}
    />
  );
}

export default ListeBlancheServices;
