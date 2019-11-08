import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Text, Flex, Box } from "rebass";
import { topTextStyle } from "./style";
import { CloseCircle } from "styled-icons/remix-line";

import { REMOVE_COMMENT } from "./mutations";

const MagistratMandataireComment = props => {
  const { id, comment } = props;
  const [RemoveComment] = useMutation(REMOVE_COMMENT);

  return (
    <Text sx={topTextStyle} fontSize="1" lineHeight="1.5" key={id}>
      <Flex justifyContent="space-between">
        <Box>- {comment}</Box>
        <Box
          sx={{ cursor: "pointer", minWidth: "16px" }}
          onClick={() => {
            RemoveComment({ variables: { id: id }, refetchQueries: ["MandataireComments"] });
          }}
        >
          <CloseCircle size="16" />
        </Box>
      </Flex>
    </Text>
  );
};

export { MagistratMandataireComment };
