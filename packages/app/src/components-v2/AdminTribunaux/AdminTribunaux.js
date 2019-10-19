import { useQuery } from "@apollo/react-hooks";
import { Button, Card } from "@socialgouv/emjpm-ui-core";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { TRIBUNAUX } from "./queries";
import { cardStyle } from "./style";

const RowItem = ({ id, etablissement, code_postal, ville }) => (
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

const AdminTribunaux = () => {
  const resultPerPage = 50;
  const { debouncedSearchText } = useContext(AdminFilterContext);

  const { data, error, loading, fetchMore } = useQuery(TRIBUNAUX, {
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

  const { count } = data.tis_aggregate.aggregate;
  const tis = data.tis;
  const isMoreEntry = tis.length < count;

  return (
    <PaginatedList
      resultPerPage={resultPerPage}
      RowItem={RowItem}
      entries={tis}
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
              tis: [...prev.tis, ...fetchMoreResult.tis]
            };
          }
        });
      }}
    />
  );
};

export { AdminTribunaux };
