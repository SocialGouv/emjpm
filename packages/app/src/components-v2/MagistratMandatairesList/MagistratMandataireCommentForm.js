import { useMutation } from "@apollo/react-hooks";
import { Button, Input } from "@socialgouv/emjpm-ui-core";
import { Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { ADD_COMMENT, EDIT_COMMENT } from "./mutations";

export const MagistratMandataireCommentForm = props => {
  const {
    tiId,
    serviceId,
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
      <Text mb="1" lineHeight="1.5">
        Les observations sont visibles uniquement par les magistrats de votre tribunal
      </Text>
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          if (isEditing) {
            EditComment({
              refetchQueries: ["MandataireComments"],
              variables: {
                comment: values.comment,
                id: id
              }
            });

            toggleEditCommentForm(false);
          } else {
            InsertComment({
              refetchQueries: ["MandataireComments"],
              variables: {
                comment: values.comment,
                mandataire_id: mandataireId,
                service_id: serviceId,
                ti_id: tiId
              }
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
              <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
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
  antenneId: null,
  comment: null,
  id: null,
  isEditing: false,
  mandataireId: null,
  tiId: null,
  toggleCommentForm: null,
  toggleEditCommentForm: null
};

MagistratMandataireCommentForm.propTypes = {
  antenneId: PropTypes.number,
  comment: PropTypes.string,
  id: PropTypes.number,
  isEditing: PropTypes.bool,
  mandataireId: PropTypes.number,
  tiId: PropTypes.number,
  toggleCommentForm: PropTypes.func,
  toggleEditCommentForm: PropTypes.func
};
