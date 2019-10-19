import { useQuery } from "@apollo/react-hooks";
import { Button, Card } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import { PaginatedList } from "../PaginatedList";
import { AdminFilterContext } from "../AdminFilterBar/context";
import { SERVICES } from "./queries";
import { cardStyle } from "./style";

const ServiceRow = ({ id, etablissement, code_postal, ville }) => (
  <Card sx={cardStyle} width="100%">
    <Flex justifyContent="space-between">
      <Box width="30px">{id}</Box>
      <Box width="250px">{etablissement}</Box>
      <Box width="80px">{code_postal}</Box>
      <Box width="200px">{ville}</Box>
      <Box mr="1" width="120px">
        <Button width="120px" onClick={() => {}} variant="outline">
          Modifier
        </Button>
      </Box>
    </Flex>
  </Card>
);

const AdminServices = () => {
  const resultPerPage = 50;
  const { debouncedSearchText } = useContext(AdminFilterContext);

  const { data, error, loading, fetchMore } = useQuery(SERVICES, {
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

  const { count } = data.services_aggregate.aggregate;
  const services = data.services;
  const isMoreEntries = services.length < count;

  return (
    <PaginatedList
      resultPerPage={resultPerPage}
      RowComponent={ServiceRow}
      entries={services}
      totalEntry={count}
      isMoreEntries={isMoreEntries}
      onLoadMore={offset => {
        fetchMore({
          variables: {
            offset
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            return {
              count: fetchMoreResult.count,
              services: [...prev.services, ...fetchMoreResult.services]
            };
          }
        });
      }}
    />
  );
};

export { AdminServices };
