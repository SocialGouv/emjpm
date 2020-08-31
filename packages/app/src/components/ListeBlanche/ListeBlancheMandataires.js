import { useQuery } from "@apollo/react-hooks";
import React, { useContext, useEffect, useMemo, useState } from "react";

import { LoadingWrapper } from "../Commons";
import { FiltersContextSerializable } from "../ListeBlancheFilter/context";
import { PaginatedList } from "../PaginatedList";
import { ListeBlancheIndividuelItem } from "./ListeBlancheIndividuel";
import { ListeBlanchePreposeItem } from "./ListeBlanchePrepose";
import { LB_USERS } from "./queries";

function getRequestFilters(filters, departements) {
  var requestFilters = {
    type: { _in: ["individuel", "prepose"] },
  };

  if (filters.departement) {
    var departementIds = departements
      .filter(({ id }) => id === filters.departement)
      .map(({ id }) => id);

    requestFilters._or = [
      {
        lb_user_etablissements: {
          etablissement: {
            departement: { id: { _in: departementIds } },
          },
        },
      },
      {
        lb_departements: {
          departement_id: {
            _in: departementIds,
          },
        },
      },
    ];
  }

  if (filters.departementFinanceur !== undefined) {
    requestFilters.lb_departements = {
      ...requestFilters.lb_departements,
      departement_financeur: { _eq: filters.departementFinanceur === true },
    };
  }

  if (filters.siret) {
    requestFilters.siret = { _ilike: `${filters.siret}%` };
  }

  if (filters.prenom) {
    requestFilters.prenom = { _ilike: `${filters.prenom}%` };
  }

  if (filters.nom) {
    requestFilters.nom = { _ilike: `${filters.nom}%` };
  }

  return requestFilters;
}

export const ListeBlancheMandataires = (props) => {
  const { onSelectItem } = props;
  const { filters, departements = [] } = useContext(FiltersContextSerializable);

  const resultPerPage = 50;
  const [currentOffset, setCurrentOffset] = useState(0);

  useEffect(() => {
    setCurrentOffset(0);
  }, [filters]);

  const { data, error, loading } = useQuery(LB_USERS, {
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
      filters: getRequestFilters(filters, departements),
    },
  });

  const { count, users } = useMemo(() => {
    if (data) {
      const { count } = data.lb_users_aggregate.aggregate;
      const users = data.lb_users;
      return {
        count,
        users,
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
        entries={users}
        RowItem={ListeBlancheItem}
        count={count}
        resultPerPage={resultPerPage}
        currentOffset={currentOffset}
        setCurrentOffset={setCurrentOffset}
        onRowClick={onSelectItem}
      />
    </LoadingWrapper>
  );
};

const ListeBlancheItem = (props) => {
  if (props.item) {
    const { type } = props.item;
    if (type === "individuel") {
      return <ListeBlancheIndividuelItem {...props} />;
    } else if (type === "prepose") {
      return <ListeBlanchePreposeItem {...props} />;
    }
  }
  return null;
};

export default ListeBlancheMandataires;
