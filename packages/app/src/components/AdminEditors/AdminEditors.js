import { useMutation, useQuery } from "@apollo/react-hooks";
import { Button, Card } from "@socialgouv/emjpm-ui-core";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { Box, Flex, Text } from "rebass";

import Sentry from "../../util/sentry";
import { AdminFilterContext } from "../AdminFilterBar/context";
import { PaginatedList } from "../PaginatedList";
import { REMOVE_EDITOR } from "./mutations";
import { EDITORS } from "./queries";
import { descriptionStyle, labelStyle } from "./style";

const RowItem = ({ item }) => {
  const { id, name, api_token } = item;
  const [removeEditor] = useMutation(REMOVE_EDITOR);

  const removeEditorFromList = async id => {
    try {
      await removeEditor({
        refetchQueries: ["editors", "editorRequests"],
        variables: {
          id: id
        }
      });
    } catch (error) {
      Sentry.captureException(error);
      // TODO(plaunay) display "Une erreur est survenue, veuillez réessayer plus tard."
    }
  };

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

        <Box mr="1" width="220px">
          <Link href={`/admin/editors/[editor_id]`} as={`/admin/editors/${id}`}>
            <a>
              <Button>Voir</Button>
            </a>
          </Link>
          <Button ml="3" onClick={() => removeEditorFromList(id)}>
            supprimer
          </Button>
        </Box>
      </Flex>
    </Card>
  );
};

const AdminEditors = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const resultPerPage = 20;
  const { debouncedSearchText } = useContext(AdminFilterContext);

  const { data, error, loading } = useQuery(EDITORS, {
    fetchPolicy: "network-only",
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
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
  const count = editors.size;
  return (
    <PaginatedList
      entries={editors}
      RowItem={RowItem}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
};

export { AdminEditors };
