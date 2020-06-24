import { useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Spinner } from "@emjpm/ui";
import React, { useContext, useState } from "react";
import { Box } from "rebass";

import { FiltersContext } from "../ListeBlancheFilter/context";
import { PaginatedList } from "../PaginatedList";
import { ListeBlancheItemCard } from "./ListeBlancheItemCard";
import { LB_USERS } from "./queries";

const ListeBlanche = () => {
  const {
    selectedDepartement,
    selectedType,
    debouncedSearchNom,
    debouncedSearchSiret,
    debouncedSearchPrenom,
    departementFinanceur,
  } = useContext(FiltersContext);

  const resultPerPage = 50;
  const [currentOffset, setCurrentOffset] = useState(0);

  const { data, error, loading } = useQuery(LB_USERS, {
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
      type: selectedType ? selectedType.value : null,
      departementId: selectedDepartement ? parseInt(selectedDepartement.value) : null,
      nom: debouncedSearchNom ? `${debouncedSearchNom}%` : null,
      prenom: debouncedSearchPrenom ? `${debouncedSearchPrenom}%` : null,
      departementFinanceur: departementFinanceur ? true : null,
      siret: debouncedSearchSiret ? `${debouncedSearchSiret}%` : null,
    },
  });

  if (loading) {
    return (
      <Card width="100%">
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card width="100%">
        <Heading4>erreur</Heading4>
      </Card>
    );
  }
  const { count } = data.lb_users_aggregate.aggregate;
  const users = data.lb_users;

  return (
    <PaginatedList
      entries={users}
      RowItem={ListeBlancheItemCard}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
};

export { ListeBlanche };
