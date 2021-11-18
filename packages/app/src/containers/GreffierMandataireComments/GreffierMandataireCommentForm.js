import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { Button, Field, Input } from "~/components";

import { ADD_COMMENT, EDIT_COMMENT } from "./mutations";
import useQueryReady from "~/hooks/useQueryReady";

export function GreffierMandataireCommentForm(props) {
  const {
    tiId,
    serviceId,
    mandataireId,
    toggleEditCommentForm,
    toggleCommentForm,
    id,
    comment,
    isEditing,
  } = props;

  const [insertComment, { loading: loading1, error: error1 }] =
    useMutation(ADD_COMMENT);
  const [editComment, { loading: loading2, error: error2 }] =
    useMutation(EDIT_COMMENT);
  useQueryReady(loading1, error1);
  useQueryReady(loading2, error2);

  const formik = useFormik({
    initialValues: {
      comment: comment || null,
    },
    onSubmit: (values, { setSubmitting }) => {
      if (isEditing) {
        editComment({
          refetchQueries: ["MandataireComments"],
          variables: {
            comment: values.comment,
            id: id,
          },
        });

        toggleEditCommentForm(false);
      } else {
        insertComment({
          refetchQueries: ["MandataireComments"],
          variables: {
            comment: values.comment,
            mandataire_id: mandataireId,
            service_id: serviceId,
            ti_id: tiId,
          },
        });
        toggleCommentForm(false);
      }
      setSubmitting(false);
    },
    validationSchema: Yup.object().shape({
      comment: Yup.string().required(),
    }),
  });

  return (
    <Box mt="3" mb="3" width="100%">
      <Text mb="1" lineHeight="1.5">
        Les observations sont visibles uniquement par les greffiers de votre
        tribunal
      </Text>
      <form noValidate onSubmit={formik.handleSubmit}>
        <Field>
          <Input
            value={formik.values.comment || undefined}
            id="comment"
            name="comment"
            hasError={formik.errors.comment && formik.touched.comment}
            onChange={formik.handleChange}
            placeholder="Observations"
          />
        </Field>
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
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              isLoading={formik.isSubmitting}
            >
              Enregistrer
            </Button>
          </Box>
        </Flex>
      </form>
    </Box>
  );
}

GreffierMandataireCommentForm.defaultProps = {
  antenneId: null,
  comment: null,
  id: null,
  isEditing: false,
  mandataireId: null,
  tiId: null,
  toggleCommentForm: null,
  toggleEditCommentForm: null,
};

GreffierMandataireCommentForm.propTypes = {
  antenneId: PropTypes.number,
  comment: PropTypes.string,
  id: PropTypes.number,
  isEditing: PropTypes.bool,
  mandataireId: PropTypes.number,
  tiId: PropTypes.number,
  toggleCommentForm: PropTypes.func,
  toggleEditCommentForm: PropTypes.func,
};
