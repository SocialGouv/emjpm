import { useQuery } from "@apollo/react-hooks";
import React, { useContext, useMemo, useState } from "react";

import { LoadingWrapper } from "../Commons";
import { FiltersContext } from "../ListeBlancheFilter/context";
import { PaginatedList } from "../PaginatedList";
import { ListeBlancheItemCard } from "./ListeBlancheItemCard";
import { LB_USERS } from "./queries";

const ListeBlanche = ({ onSelectLbUser }) => {
  const {
    selectedType,
    debouncedSearchNom,
    debouncedSearchSiret,
    debouncedSearchPrenom,
    departementFinanceur,
    selectedDepartements,
  } = useContext(FiltersContext);

  const resultPerPage = 50;
  const [currentOffset, setCurrentOffset] = useState(0);

  const { data, error, loading } = useQuery(LB_USERS, {
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
      type: selectedType ? selectedType.value : null,
      departementIds: selectedDepartements.map((d) => d.id),
      nom: debouncedSearchNom ? `${debouncedSearchNom}%` : null,
      prenom: debouncedSearchPrenom ? `${debouncedSearchPrenom}%` : null,
      departementFinanceur: departementFinanceur ? true : null,
      siret: debouncedSearchSiret ? `${debouncedSearchSiret}%` : null,
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
