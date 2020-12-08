import { useQuery } from "@apollo/react-hooks";
import { Heading5 } from "@emjpm/ui";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Box, Flex, Text } from "rebass";

import { AccessTokenDelete } from "../AccessTokenDelete";
import { USER_TOKEN } from "./queries";

const innerTextStyle = {
  color: "mediumGray",
  fontWeight: "600",
  mt: "1",
};

const boxStyle = {
  flexGrow: 1,
};

const AccessToken = (props) => {
  const { userId, isAdmin } = props;
  const { data, loading, error } = useQuery(USER_TOKEN, {
    variables: {
      userId: userId,
    },
  });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  const { access_tokens } = data;
  return (
    <Fragment>
      {access_tokens.length > 0 && (
        <Box sx={boxStyle}>
          <Heading5 mt={3} mb="2">
            {isAdmin ? (
              <Fragment>
                Logiciels métiers autorisés à accéder à ce compte utilisateur
              </Fragment>
            ) : (
              <Fragment>
                Logiciels métiers autorisés à accéder à votre compte
              </Fragment>
            )}
          </Heading5>
          <Box mr={4} mb="3">
            {access_tokens.map((token) => {
              return (
                <Flex sx={innerTextStyle} alignItem="center" key={token.id}>
                  <Box p={1}>
                    <Text>{`Editeur`}</Text>
                    <Text>{token.editors.name}</Text>
                  </Box>
                  <Box p={1}>
                    <Text>{`Token`}</Text>
                    <Text>{token.access_token}</Text>
                  </Box>
                  <Box p={1}>
                    <Text>{`Refresh token`}</Text>
                    <Text>{token.refresh_token}</Text>
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
    </Fragment>
  );
};

AccessToken.defaultProps = {
  isAdmin: false,
};

AccessToken.propTypes = {
  isAdmin: PropTypes.bool,
};

export { AccessToken };
