import { useQuery } from "@apollo/react-hooks";
import { Heading4 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { AccessTokenDelete } from "../AccessTokenDelete";
import { USER_TOKEN } from "./queries";
const innerTextStyle = {
  color: "mediumGray",
  fontWeight: "600",
  mt: "1"
};

const boxStyle = {
  flexGrow: 1
};

const AccessToken = () => {
  const { data, loading, error } = useQuery(USER_TOKEN);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { access_tokens } = data;
  return (
    <Box sx={boxStyle}>
      <Heading4 mt={2} mb="2">
        Logitiels métier authorisé à accéder à votre compte
      </Heading4>
      <Box mr={4} mb="3">
        {access_tokens.map(token => {
          return (
            <Flex sx={innerTextStyle} alignItem="center" key={token.id}>
              <Text>{token.editors.name}</Text>
              <AccessTokenDelete id={token.id} />
            </Flex>
          );
        })}
      </Box>
    </Box>
  );
};

export { AccessToken };
