import React, { useContext, useEffect, useMemo, useState } from "react";
import { useQuery } from "react-apollo";

import { LoadingWrapper } from "../Commons";
import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { PaginatedList } from "../PaginatedList";
import { ListeBlancheServiceItem } from "./ListeBlancheService";
import { LB_SERVICES } from "./queries";

const resultPerPage = 50;

function getRequestFilters(filters) {
  var requestFilters = {};

  if (filters.departement) {
    requestFilters.department_id = { _eq: filters.departement };
  }

  if (filters.siret) {
    requestFilters.siret = { _eq: filters.siret.trim() };
  }

  if (filters.nom_service) {
    requestFilters.etablissement = { _ilike: `${filters.nom_service.trim()}%` };
  }

  return requestFilters;
}

export const ListeBlancheServices = (props) => {
  const { onSelectItem } = props;
  const [currentOffset, setCurrentOffset] = useState(0);
  const { filters } = useContext(FiltersContextSerializable);
  const { data, loading, error } = useQuery(LB_SERVICES, {
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
      filters: getRequestFilters(filters),
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

  return (
    <LoadingWrapper loading={loading} error={error}>
      <PaginatedList
        entries={services}
        RowItem={ListeBlancheServiceItem}
        count={count}
        resultPerPage={resultPerPage}
        currentOffset={currentOffset}
        setCurrentOffset={setCurrentOffset}
        onRowClick={onSelectItem}
      />
    </LoadingWrapper>
  );
};

export default ListeBlancheServices;
