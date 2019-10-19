import { useQuery } from "@apollo/react-hooks";
import { Button, Card } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { cardStyle } from "./style";
import { USERS } from "./queries";

const RowItem = ({ id, nom, prenom, email }) => (
  <Card sx={cardStyle} width="100%">
    <Flex justifyContent="space-between">
      <Box width="30px">{id}</Box>
      <Box width="250px">{nom}</Box>
      <Box width="80px">{prenom}</Box>
      <Box width="200px">{email}</Box>
      <Box mr="1" width="120px">
        <Button width="120px" onClick={() => {}} variant="outline">
          Modifier
        </Button>
      </Box>
    </Flex>
  </Card>
);

const AdminUsers = () => {
  const resultPerPage = 50;
  const { debouncedSearchText } = useContext(AdminFilterContext);

  const { data, error, loading, fetchMore } = useQuery(USERS, {
    variables: {
      offset: 0,
      limit: resultPerPage,
      searchText:
        debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null
    },
    fetchPolicy: "network-only"
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { count } = data.users_aggregate.aggregate;
  const users = data.users;
  const isMoreEntry = users.length < count;

  return (
    <PaginatedList
      resultPerPage={resultPerPage}
      RowItem={RowItem}
      entries={users}
      totalEntry={count}
      isMoreEntry={isMoreEntry}
      onLoadMore={offset => {
        fetchMore({
          variables: {
            offset
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            return {
              count: fetchMoreResult.count,
              users: [...prev.users, ...fetchMoreResult.users]
            };
          }
        });
      }}
    />
  );
};

export { AdminUsers };
