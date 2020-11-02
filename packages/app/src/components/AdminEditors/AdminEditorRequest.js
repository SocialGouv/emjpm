import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Card, Heading5 } from "@emjpm/ui";
import React, { useState } from "react";
import { Box, Flex, Text } from "rebass";

import { captureException } from "../../util/sentry";
import { PaginatedList } from "../PaginatedList";
import { ADD_EDITOR_FROM_REQUEST } from "./mutations";
import { EDITOR_REQUESTS } from "./queries";
import { descriptionStyle, labelStyle } from "./style";

const RowItem = ({ item }) => {
  const [addEditor] = useMutation(ADD_EDITOR_FROM_REQUEST);

  const authorizeEditor = async (id, name) => {
    const api_token = Math.random().toString(36).substring(2);
    try {
      await addEditor({
        refetchQueries: ["editors", "editorRequests"],
        variables: {
          api_token,
          id: id,
          name: name,
        },
      });
    } catch (error) {
      captureException(error);
      // TODO(plaunay) display "Une erreur est survenue, veuillez réessayer plus tard."
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
          <Button onClick={() => authorizeEditor(id, name, email)}>
            Autoriser
          </Button>
        </Flex>
      </Flex>
    </Card>
  );
};

const AdminEditorRequest = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const resultPerPage = 20;
  const { data, error, loading } = useQuery(EDITOR_REQUESTS, {
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
    },
  });

  if (loading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { editor_token_requests: editorTokenRequests } = data;
  const count = editorTokenRequests.size;

  return (
    <Box width="100%" mt="5">
      <Heading5 mb="3">{`Liste des demandes d'accès`}</Heading5>
      <PaginatedList
        entries={editorTokenRequests}
        RowItem={RowItem}
        count={count}
        resultPerPage={resultPerPage}
        currentOffset={currentOffset}
        setCurrentOffset={setCurrentOffset}
      />
    </Box>
  );
};

export { AdminEditorRequest };
