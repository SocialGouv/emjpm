import { useQuery } from "@apollo/react-hooks";
import { Button, Card } from "@socialgouv/emjpm-ui-core";
import Link from "next/link";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { EDITORS } from "./queries";
import { descriptionStyle, labelStyle } from "./style";

const RowItem = ({ item }) => {
  const { id, name, api_token } = item;

  return (
    <Card width="100%" mb="2">
      <Flex justifyContent="space-between">
        <Flex justifyContent="flex-start">
          <Flex width="100px" flexDirection="column">
            <Text sx={labelStyle}>ID</Text>
            <Text sx={descriptionStyle}>{id}</Text>
          </Flex>
          <Flex width="100px" flexDirection="column">
            <Text sx={labelStyle}>Name</Text>
            <Text sx={descriptionStyle}>{name}</Text>
          </Flex>
          <Flex width="100px" flexDirection="column">
            <Text sx={labelStyle}>API Token</Text>
            <Text sx={descriptionStyle}>{api_token}</Text>
          </Flex>
        </Flex>

        <Box mr="1" width="120px">
          <Link href={`/admin/editors/${id}`}>
            <a>
              <Button>Voir</Button>
            </a>
          </Link>
        </Box>
      </Flex>
    </Card>
  );
};

const AdminEditors = () => {
  const resultPerPage = 50;
  const { debouncedSearchText } = useContext(AdminFilterContext);

  const { data, error, loading, fetchMore } = useQuery(EDITORS, {
    fetchPolicy: "network-only",
    variables: {
      limit: resultPerPage,
      offset: 0,
      searchText:
        debouncedSearchText && debouncedSearchText !== "" ? `${debouncedSearchText}%` : null
    }
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const editors = data.editors;

  return (
    <PaginatedList
      resultPerPage={resultPerPage}
      RowItem={RowItem}
      entries={editors}
      totalEntry={editors.length}
      onLoadMore={offset => {
        fetchMore({
          updateQuery: (prev, { fetchMoreResult }) => {
            return {
              editors: [...prev.editors, ...fetchMoreResult.editors]
            };
          },
          variables: {
            offset
          }
        });
      }}
    />
  );
};

export { AdminEditors };
