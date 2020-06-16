import { useMutation } from "@apollo/react-hooks";
import { Button, Heading3, Heading5, InlineError, Input } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { magistratMesureDeleteSchema } from "../../lib/validationSchemas";
import {
  DELETE_MANDATAIRE_MESURE,
  DELETE_SERVICE_MESURE,
  RECALCULATE_MANDATAIRE_MESURES,
  RECALCULATE_SERVICE_MESURES,
} from "./mutations";
import { MANDATAIRE, SERVICE } from "./queries";
import { MagistratMesureRemoveStyle } from "./style";

export const MagistratMesureDeleteForm = (props) => {
  const { mesure } = props;
  const [recalculateMandataireMesures] = useMutation(RECALCULATE_MANDATAIRE_MESURES);
  const [deleteMandataireMesure] = useMutation(DELETE_MANDATAIRE_MESURE, {
    onCompleted: async () => {
      await recalculateMandataireMesures({ variables: { mandataire_id: mesure.mandataireId } });
    },
    refetchQueries: [
      {
        query: MANDATAIRE,
        variables: { id: mesure.mandataireId },
      },
    ],
  });

  const [recalculateServiceMesures] = useMutation(RECALCULATE_SERVICE_MESURES, {
    refetchQueries: [
      {
        query: SERVICE,
        variables: { id: mesure.serviceId },
      },
    ],
  });
  const [deleteServiceMesure] = useMutation(DELETE_SERVICE_MESURE, {
    onCompleted: async () => {
      await recalculateServiceMesures({ variables: { service_id: mesure.serviceId } });
    },
  });

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      if (mesure.mandataireId) {
        await deleteMandataireMesure({
          variables: {
            id: mesure.id,
            mandataire_id: mesure.mandataireId,
          },
        });
      } else if (mesure.serviceId) {
        await deleteServiceMesure({
          variables: {
            id: mesure.id,
            service_id: mesure.serviceId,
          },
        });
      }

      setSubmitting(false);
      Router.push(`/magistrats/mesures`);
    },
    validationSchema: magistratMesureDeleteSchema,
    initialValues: {
      reason_delete: "",
    },
  });

  return (
    <Flex sx={MagistratMesureRemoveStyle}>
      <Box bg="cardSecondary" p="5" width={[1, 3 / 5]}>
        <Heading5 mb="1">Supprimer la mesure</Heading5>
        <Text mb="2" lineHeight="1.5">
          {`Vous êtes sur le point de supprimer définitivement une mesure réservée du système eMJPM. Toute suppression est irréversible.`}
        </Text>
        <Text lineHeight="1.5">{`Si vous souhaitez supprimer cette mesure réservée, cliquez sur "Supprimer la mesure".`}</Text>
        <Text lineHeight="1.5">{`Dans le cas contraire, cliquez sur "Annuler".`}</Text>
      </Box>
      <Box p="5" width={[1, 2 / 5]}>
        <Box mb="3">
          <Heading3>Supprimer la mesure</Heading3>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box mb="2">
            <Input
              value={formik.values.reason_delete}
              hasError={formik.errors.reason_delete && formik.touched.reason_delete}
              id="reason_delete"
              name="reason_delete"
              onChange={formik.handleChange}
              placeholder="Raison de la suppression"
            />
            <InlineError message={formik.errors.reason_delete} fieldId="reason_delete" />
          </Box>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                type="button"
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push(
                    "/magistrats/mesures/[mesure_id]",
                    `/magistrats/mesures/${mesure.id}`,
                    { shallow: true }
                  );
                }}
              >
                Annuler
              </Button>
            </Box>
            <Box>
              <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
                Supprimer la mesure
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
