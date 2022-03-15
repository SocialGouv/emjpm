import { useMutation } from "@apollo/client";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import { Box, Flex, Text } from "rebass";

import { GESTIONNAIRES } from "~/containers/GreffierMesureMandataire/queries";
import { greffierMesureDeleteSchema } from "~/validation-schemas";
import { Button, Heading, InlineError, Input, SrOnly } from "~/components";

import { DELETE_MESURE } from "./mutations";
import { GreffierMesureRemoveStyle } from "./style";
import useQueryReady from "~/hooks/useQueryReady";

export function GreffierMesureDeleteForm(props) {
  const { mesure } = props;
  const { serviceId, mandataireId } = mesure;

  const history = useHistory();

  const [deleteMesure, { loading, error }] = useMutation(DELETE_MESURE, {
    onCompleted: async () => {
      history.push("/greffiers/mesures");
    },
  });
  useQueryReady(loading, error);

  const formik = useFormik({
    initialValues: {
      reason_delete: "",
    },
    onSubmit: async (_, { setSubmitting }) => {
      await deleteMesure({
        awaitRefetchQueries: true,
        refetchQueries: [
          "GREFFIER_MESURE_QUERY",
          {
            query: GESTIONNAIRES,
            variables: {
              mandataire_id: mandataireId,
              service_id: serviceId,
            },
          },
        ],
        variables: {
          mesureId: mesure.id,
        },
      });

      setSubmitting(false);
    },
    validationSchema: greffierMesureDeleteSchema,
  });

  return (
    <Flex sx={GreffierMesureRemoveStyle} id="delete_mesure">
      <Box bg="cardSecondary" p="5" width={[1, 3 / 5]}>
        <Heading size={5} mb="1">
          Supprimer la mesure
        </Heading>
        <Text mb="2" lineHeight="1.5">
          {
            "Vous êtes sur le point de supprimer définitivement une mesure réservée du système eMJPM. Toute suppression est irréversible."
          }
        </Text>
        <Text lineHeight="1.5">
          {
            'Si vous souhaitez supprimer cette mesure réservée, cliquez sur "Supprimer la mesure".'
          }
        </Text>
        <Text lineHeight="1.5">
          {'Dans le cas contraire, cliquez sur "Annuler".'}
        </Text>
      </Box>
      <Box p="5" width={[1, 2 / 5]}>
        <Box mb="3">
          <Heading size={3}>Supprimer la mesure</Heading>
        </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
          <SrOnly id="instructions">
            {"Tous les champs marqués d'un astérisque * sont obligatoires"}
          </SrOnly>
          <Box mb="2">
            <Input
              value={formik.values.reason_delete}
              hasError={
                formik.errors.reason_delete && formik.touched.reason_delete
              }
              id="reason_delete"
              name="reason_delete"
              onChange={formik.handleChange}
              placeholder="Raison de la suppression"
              aria-describedby="msg-reason_delete"
            />
            <div id="msg-reason_delete">
              <InlineError
                message={formik.errors.reason_delete}
                fieldId="reason_delete"
              />
            </div>
          </Box>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                type="button"
                mr="2"
                variant="outline"
                onClick={() => {
                  history.push(`/greffiers/mesures/${mesure.id}`);
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
                Supprimer la mesure
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}
