import { MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";

import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";

import { FormGroupSelect, FormGroupInputDate } from "~/components/AppForm";
import { Button, Heading } from "~/components";

export function MesureCloseForm(props) {
  const { handleSubmit, handleCancel } = props;

  const validationSchema = Yup.object().shape({
    cause_sortie: Yup.string().required(),
    date_fin_mesure: Yup.date().required(),
  });

  const formik = useFormik({
    initialValues: { cause_sortie: "", date_fin_mesure: null },
    onSubmit: handleSubmit,
    validationSchema,
  });

  return (
    <Flex flexWrap="wrap">
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading size={5} mb="1">
          Mettre fin au mandat
        </Heading>
        <Text lineHeight="1.5">
          {
            "Le formulaire ci-contre vous permet de mettre fin au madat de protection selectionne. Vous devez indiquer la date et la raison de l'extinction de la mesure."
          }
        </Text>
        <Text lineHeight="1.5">
          {
            'Les mesures pour lesquelles vous mettez fin au mandat ne sont plus comptabilisees dans vos "mesures en cours".'
          }
        </Text>
        <Text lineHeight="1.5">
          {
            'Pour enregistrer vos modifications, cliquez sur "Confirmer la fin du mandat".'
          }
        </Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading size={3}>Mettre fin au mandat</Heading>
        </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
          <FormGroupInputDate
            label="Date de fin de la mesure de protection"
            placeholder="jj/mm/aaaa"
            title="Format: jj/mm/aaaa. Exemple 01/01/2021"
            id="date_fin_mesure"
            formik={formik}
            validationSchema={validationSchema}
          />
          <FormGroupSelect
            id="cause_sortie"
            options={MESURE_PROTECTION.CAUSE_SORTIE.options}
            placeholder="Raison de la fin de mandat"
            value={formik.values.cause_sortie}
            formik={formik}
            validationSchema={validationSchema}
          />
          <Flex justifyContent="flex-end">
            <Box>
              <Button mr="2" variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
            </Box>
            <Box>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
              >
                Confirmer la fin du mandat
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
}
