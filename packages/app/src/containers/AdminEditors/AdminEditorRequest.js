import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { Box, Flex, Text } from "rebass";

import useQueryReady from "~/hooks/useQueryReady";
import { PaginatedList } from "~/containers/PaginatedList";
import { Button, Card, Heading } from "~/components";
import { captureException } from "~/user/sentry";

import { ADD_EDITOR_FROM_REQUEST } from "./mutations";
import { EDITOR_REQUESTS } from "./queries";
import { descriptionStyle, labelStyle } from "./style";

function RowItem({ item }) {
  const [addEditor, { loading, error }] = useMutation(ADD_EDITOR_FROM_REQUEST);

  useQueryReady(loading, error);

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
}

function AdminEditorRequest() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const resultPerPage = 10;
  const { data, error, loading } = useQuery(EDITOR_REQUESTS, {
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { editor_token_requests: editorTokenRequests } = data;
  const count = editorTokenRequests.size;

  return (
    <Box width="100%" mt="5">
      <Heading size={5} mb="3">
        {"Liste des demandes d'accès"}
      </Heading>
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
}

export { AdminEditorRequest };
