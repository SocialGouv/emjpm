import { Button, Card, Heading4, Text } from "@socialgouv/emjpm-ui-core";
import getConfig from "next/config";
import React, { useContext } from "react";
import { Box } from "rebass";
import fetch from "unfetch";

import { UserContext } from "../UserContext";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const grantAuthorization = async (editorId, editorSecret, redirectUrl, id) => {
  const url = `${API_URL}/api/v2/oauth/authorize`;
  const response = await fetch(url, {
    body: JSON.stringify({
      editorId: editorId,
      editorToken: editorSecret,
      redirectUrl: redirectUrl,
      userId: id
    }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });
  const { publicToken } = await response.json();
  window.location.replace(`${redirectUrl}?token=${publicToken}`);
};

const Authorize = props => {
  const { editorId, editorSecret, redirectUrl } = props;
  const { id } = useContext(UserContext);
  return (
    <Card mt="5" p="0">
      <Box bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
        <Box>
          <Heading4 mb="1">{`Connectez votre compte E-mjpm à votre logitiel métier.`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Indiquez votre choix, vos informations E-mjpm seront partagé avec ce dernier, pour faciliter l'échange et la fluidité des services`}
          </Text>
        </Box>
      </Box>
      <Box p="5">
        <Button
          onClick={() => grantAuthorization(editorId, editorSecret, redirectUrl, id)}
        >{`Authoriser la connection avec l'éditeur`}</Button>
        <Button ml="2" variant="outline">{`refuser`}</Button>
      </Box>
    </Card>
  );
};

export { Authorize };
