import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Card, Heading5 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { PaginatedList } from "../PaginatedList";
import { ADD_EDITOR_FROM_REQUEST } from "./mutations";
import { EDITOR_REQUESTS } from "./queries";
import { descriptionStyle, labelStyle } from "./style";

const RowItem = ({ item }) => {
  const [addEditor] = useMutation(ADD_EDITOR_FROM_REQUEST);

  const authorizeEditor = async (id, name) => {
    const api_token = Math.random()
      .toString(36)
      .substring(2);
    try {
      await addEditor({
        refetchQueries: ["editors", "editorRequests"],
        variables: {
          name: name,
          id: id,
          api_token
        }
      });
    } catch (error) {
      // TODO(paullaunay): log error in sentry and form
    }
  };
  const { id, name, email } = item;

  return (
    <Card width="100%" mb="2">
      <Flex justifyContent="space-between">
        <Flex flexDirection="column">
          <Text sx={labelStyle}>ID</Text>
          <Text sx={descriptionStyle}>{id}</Text>
        </Flex>
        <Flex width="25%" flexDirection="column">
          <Text sx={labelStyle}>Name</Text>
          <Text sx={descriptionStyle}>{name}</Text>
        </Flex>
        <Flex width="25%" flexDirection="column">
          <Text sx={labelStyle}>Email</Text>
          <Text sx={descriptionStyle}>{email}</Text>
        </Flex>
        <Flex>
          <Button onClick={() => authorizeEditor(id, name, email)}>Autoriser</Button>
        </Flex>
      </Flex>
    </Card>
  );
};

const AdminEditorRequest = () => {
  const { data, error, loading, fetchMore } = useQuery(EDITOR_REQUESTS);
  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { editor_token_requests: editorTokenRequests } = data;
  const resultPerPage = 50;

  return (
    <Box width="100%" mt="5">
      <Heading5 mb="3">{`Liste des demandes d'accès`}</Heading5>
      <PaginatedList
        resultPerPage={resultPerPage}
        RowItem={RowItem}
        entries={editorTokenRequests}
        totalEntry={editorTokenRequests.length}
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
    </Box>
  );
};

export { AdminEditorRequest };
