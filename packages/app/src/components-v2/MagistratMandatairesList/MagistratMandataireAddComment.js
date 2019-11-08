import PropTypes from "prop-types";
import React, { useContext } from "react";
import { Box, Flex } from "rebass";
import { Formik } from "formik";
import { useMutation } from "@apollo/react-hooks";
import * as Yup from "yup";

import { Button, Input } from "@socialgouv/emjpm-ui-core";
import { MandataireContext, PANEL_TYPE } from "@socialgouv/emjpm-ui-components";
import { ADD_COMMENT } from "./mutations";

export const MagistratMandataireAddComment = props => {
  const { ti, antenneId, mandataireId, toggleCommentForm } = props;
  const [InsertComment] = useMutation(ADD_COMMENT);
  const { setCurrentMandataire, setPanelType } = useContext(MandataireContext);
  return (
    <Box mt="3" width="100%">
      <Formik
        onSubmit={(values, { setSubmitting }) => {
          InsertComment({
            variables: {
              comment: values.comment,
              antenne_id: antenneId,
              ti_id: ti,
              mandataire_id: mandataireId
            },
            refetchQueries: ["MandataireComments"]
          });
          setSubmitting(false);
          toggleCommentForm(false);
        }}
        validationSchema={Yup.object().shape({
          comment: Yup.string().required()
        })}
        initialValues={{
          comment: ""
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
                  placeholder="Commentaire"
                />
              </Box>
              <Flex justifyContent="flex-end">
                <Box>
                  <Button
                    mr="2"
                    variant="outline"
                    onClick={() => {
                      setPanelType(PANEL_TYPE.CHOOSE);
                      setCurrentMandataire(null);
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

MagistratMandataireAddComment.propTypes = {
  antenneId: PropTypes.number,
  mandataireId: PropTypes.number,
  ti: PropTypes.number
};
