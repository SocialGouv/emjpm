import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { Box, Flex, Text } from "rebass";

import { AccessTokenDelete } from "~/containers/AccessTokenDelete";
import { Heading } from "~/components";

import useQueryReady from "~/hooks/useQueryReady";

import { USER_TOKEN } from "./queries";

const innerTextStyle = {
  color: "mediumGray",
  fontWeight: "600",
  mt: "1",
};

const boxStyle = {
  flexGrow: 1,
};

function AccessToken(props) {
  const { userId, isAdmin } = props;
  const { data, loading, error } = useQuery(USER_TOKEN, {
    variables: {
      userId: userId,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { access_tokens } = data;
  return (
    <>
      {access_tokens.length > 0 && (
        <Box sx={boxStyle}>
          <Heading size={5} mt={3} mb="2">
            {isAdmin ? (
              <>Logiciels métiers autorisés à accéder à ce compte utilisateur</>
            ) : (
              <>Logiciels métiers autorisés à accéder à votre compte</>
            )}
          </Heading>
          <Box mr={4} mb="3">
            {access_tokens.map((token) => {
              return (
                <Flex sx={innerTextStyle} alignItem="center" key={token.id}>
                  <Box p={1}>
                    <Text>{"Editeur"}</Text>
                    <Text>{token?.editors?.name}</Text>
                  </Box>
                  <Box p={1}>
                    <Text>{"Token"}</Text>
                    <Text>{token?.access_token}</Text>
                  </Box>
                  <Box p={1}>
                    <Text>{"Refresh token"}</Text>
                    <Text>{token?.refresh_token}</Text>
                  </Box>
                  <Box p={1}>
                    <AccessTokenDelete id={token.id} />
                  </Box>
                </Flex>
              );
            })}
          </Box>
        </Box>
      )}
    </>
  );
}

AccessToken.defaultProps = {
  isAdmin: false,
};

AccessToken.propTypes = {
  isAdmin: PropTypes.bool,
};

export { AccessToken };
