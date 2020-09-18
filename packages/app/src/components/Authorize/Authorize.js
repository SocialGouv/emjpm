import { Button, Card, Heading4, Text } from "@emjpm/ui";
import getConfig from "next/config";
import React from "react";
import { useQuery } from "react-apollo";
import { Box } from "rebass";

import { EDITOR } from "./queries";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const url = `${API_URL}/api/oauth/authorize`;

const Authorize = (props) => {
  const { editorId, token, redirectUrl, state } = props;
  const { data, loading } = useQuery(EDITOR, {
    variables: {
      id: editorId,
    },
  });

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  const { editors_by_pk: editor } = data;

  return (
    <Card mt="5" p="0">
      <Box bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
        <Box>
          <Heading4 mb="1">{`Autoriser ${editor.name} à accéder à votre compte E-mjpm.`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Vos informations E-mjpm seront partagées avec ce dernier pour faciliter l'échange et la fluidité des services.`}
          </Text>
        </Box>
      </Box>
      <Box p="5">
        <form method="post" action={url}>
          <input type="hidden" name="response_type" value="code" />
          <input type="hidden" name="client_id" value={editorId} />
          <input type="hidden" name="redirect_uri" value={redirectUrl} />
          <input type="hidden" name="access_token" value={token} />
          <input type="hidden" name="state" value={state} />
          <Button type="submit">{`Authoriser la connexion avec l'éditeur`}</Button>
          <Button
            onClick={() => {
              document.location.href = `${redirectUrl}?error_reason=user_denied&error=access_denied&error_description=Permissions+error`;
            }}
            type="button"
            ml="2"
            variant="outline"
          >{`refuser`}</Button>
        </form>
        {/* {errorMessage && (
          <Text mt="3" color="red">
            {errorMessage}
          </Text>
        )} */}
      </Box>
    </Card>
  );
};

export { Authorize };
