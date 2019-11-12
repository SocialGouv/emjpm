import PropTypes from "prop-types";
import React from "react";
import { Box, Flex } from "rebass";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";

import { Button, Input } from "@socialgouv/emjpm-ui-core";
import { ADD_COMMENT, EDIT_COMMENT } from "./mutations";

export const MagistratMandataireCommentForm = props => {
  const {
    ti,
    antenneId,
    mandataireId,
    toggleEditCommentForm,
    toggleCommentForm,
    id,
    comment,
    isEditing
  } = props;
  const [InsertComment] = useMutation(ADD_COMMENT);
  const [EditComment] = useMutation(EDIT_COMMENT);
  return (
    <Box mt="3" mb="3" width="100%">
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          if (isEditing) {
            EditComment({
              variables: {
                comment: values.comment,
                id: id
              },
              refetchQueries: ["MandataireComments"]
            });

            toggleEditCommentForm(false);
          } else {
            InsertComment({
              variables: {
                comment: values.comment,
                antenne_id: antenneId,
                ti_id: ti,
                mandataire_id: mandataireId
              },
              refetchQueries: ["MandataireComments"]
            });
            toggleCommentForm(false);
          }
          setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
          comment: Yup.string().required()
        })}
        initialValues={{
          comment: comment || null
        }}
      >
        {props => {
          const { values, touched, errors, isSubmitting, handleSubmit, handleChange } = props;
          return (
            <form onSubmit={handleSubmit}>
              <Box sx={{ zIndex: "1", position: "relative" }} mb="2">
                <Input
                  value={values.comment}
                  id="comment"
                  name="comment"
                  hasError={errors.comment && touched.comment}
                  onChange={handleChange}
                  placeholder="Observations"
                />
              </Box>
              <Flex justifyContent="flex-end">
                <Box>
                  <Button
                    mr="2"
                    variant="outline"
                    onClick={() => {
                      if (isEditing) {
                        toggleEditCommentForm(false);
                      } else {
                        toggleCommentForm(false);
                      }
                    }}
                  >
                    Annuler
                  </Button>
                </Box>
                <Box>
                  <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
                    Enregistrer
                  </Button>
                </Box>
              </Flex>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};

MagistratMandataireCommentForm.defaultProps = {
  isEditing: false,
  antenneId: null,
  mandataireId: null,
  ti: null,
  id: null,
  comment: null,
  toggleEditCommentForm: null,
  toggleCommentForm: null
};

MagistratMandataireCommentForm.propTypes = {
  toggleEditCommentForm: PropTypes.func,
  toggleCommentForm: PropTypes.func,
  isEditing: PropTypes.bool,
  antenneId: PropTypes.number,
  mandataireId: PropTypes.number,
  ti: PropTypes.number,
  id: PropTypes.number,
  comment: PropTypes.string
};
