import { useMutation } from "@apollo/react-hooks";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";
import React from "react";
import { Box } from "rebass";

import { REMOVE_ACCESS_TOKEN } from "./Mutation";

const AccessTokenDelete = (props) => {
  const { id } = props;
  const [RemoveAccessToken] = useMutation(REMOVE_ACCESS_TOKEN);

  return (
    <Box
      sx={{ cursor: "pointer", p: "2" }}
      color="error"
      onClick={() => {
        RemoveAccessToken({
          refetchQueries: ["AccessToken"],
          variables: {
            id: id,
          },
        });
      }}
    >
      <XCircle size="24" />
    </Box>
  );
};

export { AccessTokenDelete };
