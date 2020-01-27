import { useQuery } from "@apollo/react-hooks";
import { Heading4, Text } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box } from "rebass";

import { EDITOR } from "./queries";

const AdminEditorActivity = props => {
  const { userId } = props;
  const { data, loading, error } = useQuery(EDITOR, { variables: { userId } });

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }

  const [editor] = data.editors;
  // const { id, name, api_token } = editor;

  return (
    <Box>
      <Heading4>Activité</Heading4>
      <Text>{editor.id}</Text>
    </Box>
  );
};

export { AdminEditorActivity };
