import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { Box } from "rebass";

import config from "~/config";
import { Button, Card, Heading, Text } from "~/components";
import useQueryReady from "~/hooks/useQueryReady";

import { EDITOR } from "./queries";

const { API_URL } = config;

const url = `${API_URL}/api/oauth/authorize`;

import creds from "~/user/creds";

function Authorize(props) {
  const { editorId, redirectUrl, state } = props;
  const { token } = creds;
  const { data, loading, error } = useQuery(EDITOR, {
    variables: {
      id: editorId,
    },
  });

  useEffect(() => {
    const { accessTokens = [] } = data || {};
    if (accessTokens?.length > 0) {
      const form = document.forms[0];
      form.submit();
    }
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { editor } = data;

  return (
    <Card mt="5" p="0">
      {editor && (
        <>
          <Box bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
            <Box>
              <Heading
                size={4}
                mb="1"
              >{`Autoriser ${editor.name} à accéder à votre compte eMJPM.`}</Heading>
              <Text lineHeight="1.5" color="textSecondary">
                {
                  "Vos informations eMJPM seront accessibles par ce dernier pour faciliter l'échange et la fluidité des services."
                }
              </Text>
            </Box>
          </Box>
          <Box p="5">
            <form noValidate method="post" action={url}>
              <input type="hidden" name="response_type" value="code" />
              <input type="hidden" name="client_id" value={editorId} />
              <input type="hidden" name="redirect_uri" value={redirectUrl} />
              <input type="hidden" name="access_token" value={token} />
              <input type="hidden" name="state" value={state} />
              <Button type="submit" title="Autoriser" aria-label="Autoriser">
                {"Autoriser"}
              </Button>
              <Button
                role="link"
                onClick={() => {
                  document.location.href = `${redirectUrl}?error_reason=user_denied&error=access_denied&error_description=Permissions+error`;
                }}
                type="button"
                ml="2"
                variant="outline"
                title="Refuser"
                aria-label="Refuser"
              >
                {"refuser"}
              </Button>
            </form>
          </Box>
        </>
      )}
      {!editor && (
        <>
          <Box bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
            <Box>
              <Text lineHeight="1.5" color="textSecondary">
                {"Aucun client ne correspond aux informations transmises."}
              </Text>
            </Box>
          </Box>
        </>
      )}
    </Card>
  );
}

export { Authorize };
