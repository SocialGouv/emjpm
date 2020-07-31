import { useQuery } from "@apollo/react-hooks";
import React, { useContext, useMemo, useState } from "react";

import { LoadingWrapper } from "../Commons";
import { FiltersContextSerializable } from "../ListeBlancheFilter/context";
import { PaginatedList } from "../PaginatedList";
import { ListeBlancheItemCard } from "./ListeBlancheItemCard";
import { LB_USERS } from "./queries";

const ListeBlanche = ({ onSelectLbUser }) => {
  const { filters, departements = [] } = useContext(FiltersContextSerializable);
  const { departement } = filters;

  const resultPerPage = 50;
  const [currentOffset, setCurrentOffset] = useState(0);

  const departementIds = useMemo(() => {
    if (departement) {
      return departements.filter(({ id }) => id === departement).map(({ id }) => id);
    } else {
      return departements.map(({ id }) => id);
    }
  }, [departements, departement]);

  const { data, error, loading } = useQuery(LB_USERS, {
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
      type: filters.type || null,
      departementIds,
      nom: filters.nom ? `${filters.nom}%` : null,
      prenom: filters.prenom ? `${filters.prenom}%` : null,
      departementFinanceur: filters.departementFinanceur ? true : null,
      siret: filters.siret ? `${filters.siret}%` : null,
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
        RowItem={ListeBlancheItemCard}
        count={count}
        resultPerPage={resultPerPage}
        currentOffset={currentOffset}
        setCurrentOffset={setCurrentOffset}
        onRowClick={onSelectLbUser}
      />
    </LoadingWrapper>
  );
};

export { ListeBlanche };
