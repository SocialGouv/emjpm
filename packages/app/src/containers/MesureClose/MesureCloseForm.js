import { MESURE_PROTECTION } from "@emjpm/biz";
import { useFormik } from "formik";

import { Box, Flex, Text } from "rebass";
import * as Yup from "yup";
import { parseDateStringWhenNullable } from "~/validation-schemas/yup";

import {
  FormGroupSelect,
  AccessibleFormGroupInputDate,
} from "~/components/AppForm";
import { Button, Heading, SrOnly } from "~/components";
import { FORM_DATE_NOT_VALID } from "../../validation-schemas/yup";

export function MesureCloseForm(props) {
  const { handleSubmit, handleCancel } = props;

  const validationSchema = Yup.object().shape({
    cause_sortie: Yup.string().required(),
    date_fin_mesure: Yup.date(FORM_DATE_NOT_VALID)
      .transform(parseDateStringWhenNullable)
      .nullable()
      .typeError(FORM_DATE_NOT_VALID),
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
            "Le formulaire ci-contre vous permet de mettre fin au mandat de protection selectionne. Vous devez indiquer la date et la raison de l'extinction de la mesure."
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
      <Box
        role="group"
        aria-labelledby="close_mesure_heading"
        p="5"
        width={[1, 3 / 5]}
      >
        <Box mb="3">
          <Heading size={3} id="close_mesure_heading">
            Mettre fin au mandat
          </Heading>
        </Box>
        <form noValidate onSubmit={formik.handleSubmit}>
          <SrOnly id="instructions">
            {"Tous les champs marqués d'un astérisque * sont obligatoires"}
          </SrOnly>
          <AccessibleFormGroupInputDate
            label="Date de fin de la mesure de protection"
            placeholder="jj/mm/aaaa"
            title="Format: jj/mm/aaaa. Exemple 01/01/2021"
            id="date_fin_mesure"
            formik={formik}
            validationSchema={validationSchema}
            ariaLabelledBy="date_fin_mesure_label"
            ariaDescribedBy="date_fin_mesure_format_attendu"
          />
          <SrOnly id="date_fin_mesure_label">
            Date de fin de la mesure de protection
          </SrOnly>
          <SrOnly id="date_fin_mesure_format_attendu">
            Format: jj/mm/aaaa. Exemple 01/01/2021
          </SrOnly>
          <FormGroupSelect
            id="cause_sortie"
            options={MESURE_PROTECTION.CAUSE_SORTIE.options}
            placeholder="Raison de la fin de mandat"
            value={formik.values.cause_sortie}
            formik={formik}
            validationSchema={validationSchema}
            aria-label="Raison de la fin de mandat"
          />
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={handleCancel}
                role="link"
                title="Annuler la fermeture de la mesure"
                aria-label="Annuler la fermeture de la mesure"
              >
                Annuler
              </Button>
            </Box>
            <Box>
              <Button
                type="submit"
                disabled={formik.isSubmitting}
                isLoading={formik.isSubmitting}
                title="Confirmer la fin du mandat"
                aria-label="Confirmer la fin du mandat"
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
