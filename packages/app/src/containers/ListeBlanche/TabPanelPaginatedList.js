import { useQuery } from "@apollo/client";
import { useContext, useEffect, useMemo, useState } from "react";

import useQueryReady from "~/hooks/useQueryReady";
import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { PaginatedList } from "~/containers/PaginatedList";

import { ListeBlancheIndividuelItem } from "./ListeBlancheIndividuel";
import { ListeBlanchePreposeItem } from "./ListeBlanchePrepose";
import { ListeBlancheServiceItem } from "./ListeBlancheService";
import { SEARCH_VIEW_LB } from "./queries";

function getRequestFilters(filters) {
  const requestFilters = {};

  const { type, departement } = filters;

  if (type) {
    requestFilters.user_type = { _eq: type };
  }

  if (departement) {
    const departementCode = departement;
    const individuelDepartementFilters = {
      lb_user: {
        lb_departements: {
          departement_code: {
            _eq: departementCode,
          },
        },
      },
    };
    if (filters.departementFinanceur) {
      individuelDepartementFilters.lb_user.lb_departements.departement_financeur = {
        _eq: filters.departementFinanceur === true,
      };
    }

    const preposeDepartementFilter = {
      mandataire: {
        lb_user: {
          lb_user_etablissements: {
            etablissement: {
              departement: { id: { _eq: departementCode } },
            },
          },
        },
      },
    };

    const serviceDepartementFilters = {
      service: {
        departement_code: { _eq: departementCode },
      },
    };

    const departementsFilter = [];
    switch (type) {
      case "individuel":
        departementsFilter.push(individuelDepartementFilters);
        break;
      case "prepose":
        departementsFilter.push(preposeDepartementFilter);
        break;
      case "service":
        departementsFilter.push(serviceDepartementFilters);
        break;
      default:
        departementsFilter.push(individuelDepartementFilters);
        departementsFilter.push(preposeDepartementFilter);
        departementsFilter.push(serviceDepartementFilters);
    }
    requestFilters._or = departementsFilter;
  } else {
    if (filters.departementFinanceur) {
      requestFilters.mandataire = {
        lb_user: {
          lb_departements: {
            departement_financeur: {
              _eq: true,
            },
          },
        },
      };
    }
  }

  return requestFilters;
}

export function TabPanelPaginatedList(props) {
  const { getHref, onRowClick, type } = props;
  const { filters, debounceFilters } = useContext(FiltersContextSerializable);

  const resultPerPage = 10;
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    setCurrentOffset(0);
  }, [filters]);

  const { search } = debounceFilters;
  const { data, error, loading } = useQuery(SEARCH_VIEW_LB, {
    fetchPolicy: "cache-and-network",
    variables: {
      search: search && search !== "" ? `%${search}%` : null,
      filters: getRequestFilters({ ...debounceFilters, type }),
      limit: resultPerPage,
      offset: currentOffset,
    },
  });

  const { count, rows } = useMemo(() => {
    if (data) {
      const { count } = data.search_view_lb_aggregate.aggregate;
      const rows = data.search_view_lb;
      return {
        count,
        rows,
      };
    }
    return {
      count: 0,
      rows: [],
    };
  }, [data]);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <PaginatedList
      entries={rows}
      RowItem={ListeBlancheItem}
      getHref={getHref}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
      onRowClick={onRowClick}
    />
  );
}

function ListeBlancheItem(props) {
  if (!props.item) {
    return null;
  }
  const { type } = props.item;
  switch (type) {
    case "individuel":
      return <ListeBlancheIndividuelItem {...props} />;
    case "prepose":
      return <ListeBlanchePreposeItem {...props} />;
    case "service":
      return <ListeBlancheServiceItem {...props} />;
  }
}

export default TabPanelPaginatedList;
