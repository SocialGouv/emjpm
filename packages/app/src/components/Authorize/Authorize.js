import { Button, Card, Heading4, Text } from "@emjpm/ui";
import getConfig from "next/config";
import React, { useContext, useState } from "react";
import { Box } from "rebass";
import fetch from "unfetch";

import { UserContext } from "../UserContext";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const grantAuthorization = async (editorId, editorSecret, redirectUrl, id, toggleErrorMessage) => {
  const url = `${API_URL}/api/oauth/authorize`;
  try {
    const response = await fetch(url, {
      body: JSON.stringify({
        editorId: editorId,
        editorToken: editorSecret,
        redirectUrl: redirectUrl,
        userId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (response.status !== 200) {
      const { errorMsg } = await response.json();
      toggleErrorMessage(errorMsg);
    } else {
      const { publicToken } = await response.json();
      window.location.replace(`${redirectUrl}?token=${publicToken}`);
    }
  } catch (errorMsg) {
    toggleErrorMessage(errorMsg);
  }
};

const Authorize = (props) => {
  const { editorId, editorSecret, redirectUrl } = props;
  const [errorMessage, toggleErrorMessage] = useState(false);
  const { id } = useContext(UserContext);
  return (
    <Card mt="5" p="0">
      <Box bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
        <Box>
          <Heading4 mb="1">{`Connectez votre compte E-mjpm à votre logiciel métier.`}</Heading4>
          <Text lineHeight="1.5" color="textSecondary">
            {`Indiquez votre choix, vos informations E-mjpm seront partagé avec ce dernier, pour faciliter l'échange et la fluidité des services`}
          </Text>
        </Box>
      </Box>
      <Box p="5">
        <Button
          onClick={() =>
            grantAuthorization(editorId, editorSecret, redirectUrl, id, toggleErrorMessage)
          }
        >{`Authoriser la connexion avec l'éditeur`}</Button>
        <Button ml="2" variant="outline">{`refuser`}</Button>
        {errorMessage && (
          <Text mt="3" color="red">
            {errorMessage}
          </Text>
        )}
      </Box>
    </Card>
  );
};

export { Authorize };
