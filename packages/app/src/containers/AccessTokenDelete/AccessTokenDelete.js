import { useMutation } from "@apollo/client";
import { XCircle } from "@styled-icons/boxicons-regular/XCircle";

import { Box } from "rebass";

import { REMOVE_ACCESS_TOKEN } from "./Mutation";
import useQueryReady from "~/hooks/useQueryReady";

function AccessTokenDelete(props) {
  const { id } = props;
  const [RemoveAccessToken, { loading, error }] =
    useMutation(REMOVE_ACCESS_TOKEN);

  useQueryReady(loading, error);

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
}

export { AccessTokenDelete };
