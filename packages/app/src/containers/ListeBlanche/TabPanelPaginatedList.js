import { useQuery } from "@apollo/client";
import { useContext, useEffect, useMemo, useState } from "react";

import useQueryReady from "~/hooks/useQueryReady";
import { useDepartements } from "~/utils/departements/useDepartements.hook";
import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { PaginatedList } from "~/containers/PaginatedList";

import { ListeBlancheIndividuelItem } from "./ListeBlancheIndividuel";
import { ListeBlanchePreposeItem } from "./ListeBlanchePrepose";
import { ListeBlancheServiceItem } from "./ListeBlancheService";
import { ListeBlancheDpfiItem } from "./ListBlancheDpfi";
import { ListeBlancheSdpfItem } from "./ListeBlancheSdpf";

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
      liste_blanche: {
        mandataire_individuel_departements: {
          departement_code: {
            _eq: departementCode,
          },
        },
      },
    };
    if (filters.departementFinanceur) {
      individuelDepartementFilters.liste_blanche.mandataire_individuel_departements.departement_financeur =
        {
          _eq: filters.departementFinanceur === true,
        };
    }

    const preposeDepartementFilter = {
      liste_blanche: {
        mandataire_prepose_etablissements: {
          etablissement: {
            departement_code: { _eq: departementCode },
          },
        },
      },
    };

    const serviceDepartementFilters = {
      service: {
        service_departements: {
          departement_code: { _eq: departementCode },
        },
      },
    };
    const sdpfDepartementFilters = {
      sdpf: { departement: { _eq: departementCode } },
    };

    const dpfiDepartementFilters = {
      liste_blanche: {
        dpfi: {
          departement_code: { _eq: departementCode },
        },
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
      case "sdpf":
        departementsFilter.push(sdpfDepartementFilters);
      case "dpfi":
        departementsFilter.push(dpfiDepartementFilters);

      default:
        departementsFilter.push(individuelDepartementFilters);
        departementsFilter.push(preposeDepartementFilter);
        departementsFilter.push(serviceDepartementFilters);
        departementsFilter.push(sdpfDepartementFilters);
        departementsFilter.push(dpfiDepartementFilters);
    }
    requestFilters._or = departementsFilter;
  } else {
    if (filters.departementFinanceur) {
      requestFilters.mandataire = {
        liste_blanche: {
          mandataire_individuel_departements: {
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
  const { departements } = useDepartements({ all: true });

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
      sdpfdepartements={departements}
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
    case "dpfi":
      return <ListeBlancheDpfiItem {...props} />;
    case "sdpf":
      return <ListeBlancheSdpfItem {...props} />;
  }
}

export default TabPanelPaginatedList;
