import React, { Fragment } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Text, Flex, Box } from "rebass";
import { Edit, XCircle } from "styled-icons/boxicons-regular";

import { topTextStyle } from "./style";
import { MagistratMandataireCommentForm } from "./MagistratMandataireCommentForm";
import { REMOVE_COMMENT } from "./mutations";

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
                flexGrow: 1,
                flexBasis: 256
              }}
            >
              - {comment}
            </Box>
            <Box
              sx={{ cursor: "pointer", width: "16px", mr: "1" }}
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
                RemoveComment({ variables: { id: id }, refetchQueries: ["MandataireComments"] });
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
