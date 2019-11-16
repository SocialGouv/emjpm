import { useMutation } from "@apollo/react-hooks";
import React, { Fragment } from "react";
import { Box, Flex, Text } from "rebass";
import { Edit, XCircle } from "styled-icons/boxicons-regular";

import { MagistratMandataireCommentForm } from "./MagistratMandataireCommentForm";
import { REMOVE_COMMENT } from "./mutations";
import { topTextStyle } from "./style";

const MagistratMandataireComment = props => {
  const {
    setCurrentComment,
    currentComment,
    id,
    comment,
    isEditOpen,
    toggleEditCommentForm,
    toggleCommentForm
  } = props;
  const [RemoveComment] = useMutation(REMOVE_COMMENT);

  return (
    <Fragment>
      {isEditOpen && currentComment === id ? (
        <MagistratMandataireCommentForm
          toggleEditCommentForm={toggleEditCommentForm}
          id={id}
          isEditing
          comment={comment}
        />
      ) : (
        <Text sx={topTextStyle} fontSize="1" lineHeight="1.5" key={id}>
          <Flex>
            <Box
              sx={{
                flexBasis: 256,
                flexGrow: 1
              }}
            >
              - {comment}
            </Box>
            <Box
              sx={{ cursor: "pointer", mr: "1", width: "16px" }}
              onClick={() => {
                toggleCommentForm(false);
                toggleEditCommentForm(true);
                setCurrentComment(id);
              }}
            >
              <Edit size="16" />
            </Box>
            <Box
              sx={{ cursor: "pointer", width: "16px" }}
              onClick={() => {
                RemoveComment({ refetchQueries: ["MandataireComments"], variables: { id: id } });
              }}
            >
              <XCircle size="16" />
            </Box>
          </Flex>
        </Text>
      )}
    </Fragment>
  );
};

export { MagistratMandataireComment };
