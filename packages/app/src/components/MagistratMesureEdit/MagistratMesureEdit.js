import { useMutation } from "@apollo/react-hooks";
import { MESURE_PROTECTION } from "@emjpm/core";
import { Button, Field, Heading3, Heading5, InlineError, Input, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import React, { useContext } from "react";
import { Box, Flex, Text } from "rebass";

import { magistratMesureEditSchema } from "../../lib/validationSchemas";
import { findOption } from "../../util";
import { MesureContext } from "../MesureContext";
import { EDIT_MESURE } from "./mutations";
import { MagistratMesureEditStyle } from "./style";

export const MagistratMesureEdit = () => {
  const { id, age, civilite, numeroRg, natureMesure, champProtection, cabinet } = useContext(
    MesureContext
  );
  const [updateMesure] = useMutation(EDIT_MESURE, {
    onCompleted() {
      Router.push("/magistrats/mesures/[mesure_id]", `/magistrats/mesures/${id}`, {
        shallow: true,
      });
    },
  });

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await updateMesure({
        variables: {
          annee_naissance: values.annee_naissance,
          cabinet: values.cabinet,
          civilite: values.civilite.value,
          id: id,
          numero_rg: values.numero_rg,
          nature_mesure: values.nature_mesure.value,
          champ_protection: values.champ_protection.value,
        },
      });

      setSubmitting(false);
    },
    validationSchema: magistratMesureEditSchema,
    initialValues: {
      annee_naissance: age,
      cabinet: cabinet ? cabinet : "",
      civilite: findOption(MESURE_PROTECTION.CIVILITE.options, civilite),
      numero_rg: numeroRg,
      nature_mesure: findOption(MESURE_PROTECTION.NATURE_MESURE.options, natureMesure),
      champ_protection: findOption(MESURE_PROTECTION.CHAMP_PROTECTION.options, champProtection),
    },
  });

  return (
    <Flex sx={MagistratMesureEditStyle}>
      <Box bg="cardSecondary" p="5" width={[1, 2 / 5]}>
        <Heading5 mb="1">Modifier la mesure réservée</Heading5>
        <Text lineHeight="1.5">
          {`Le formulaire ci-contre vous permet de modifier une mesure réservée aupres d'un mandataire.`}
        </Text>
        <Text lineHeight="1.5">
          {`Une fois les modifications souhaitées apportées, cliquer sur "Enregistrer".`}
        </Text>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="3">
          <Heading3>Modifier la mesure réservée</Heading3>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Field>
            <Select
              id="nature_mesure"
              name="nature_mesure"
              placeholder="Nature de la mesure"
              value={formik.values.nature_mesure}
              hasError={formik.errors.nature_mesure && formik.touched.nature_mesure}
              onChange={(option) => formik.setFieldValue("nature_mesure", option)}
              options={MESURE_PROTECTION.NATURE_MESURE.options}
            />
            <InlineError message={formik.errors.nature_mesure} fieldId="nature_mesure" />
          </Field>
          <Field>
            <Select
              id="champ_protection"
              name="champ_protection"
              placeholder="Champ de la protection"
              value={formik.values.champ_protection}
              hasError={formik.errors.champ_protection && formik.touched.champ_protection}
              onChange={(option) => formik.setFieldValue("champ_protection", option)}
              options={MESURE_PROTECTION.CHAMP_PROTECTION.options}
            />
            <InlineError message={formik.errors.champ_protection} fieldId="champ_protection" />
          </Field>
          <Field>
            <Select
              id="civilite"
              name="civilite"
              placeholder="civilité"
              value={formik.values.civilite}
              hasError={formik.errors.civilite && formik.touched.civilite}
              onChange={(option) => formik.setFieldValue("civilite", option)}
              options={MESURE_PROTECTION.CIVILITE.options}
            />
            <InlineError message={formik.errors.civilite} fieldId="civilite" />
          </Field>
          <Field>
            <Input
              value={formik.values.annee_naissance}
              id="annee_naissance"
              name="annee_naissance"
              hasError={formik.errors.annee_naissance && formik.touched.annee_naissance}
              onChange={formik.handleChange}
              placeholder="Année de naissance"
            />
            <InlineError message={formik.errors.annee_naissance} fieldId="annee_naissance" />
          </Field>
          <Field>
            <Input
              value={formik.values.numero_rg}
              id="numero_rg"
              name="numero_rg"
              hasError={formik.errors.numero_rg && formik.touched.numero_rg}
              onChange={formik.handleChange}
              placeholder="Numéro RG"
            />
            <InlineError message={formik.errors.numero_rg} fieldId="numero_rg" />
          </Field>
          <Field>
            <Input
              value={formik.values.cabinet}
              id="cabinet"
              name="cabinet"
              hasError={formik.errors.cabinet && formik.touched.cabinet}
              onChange={formik.handleChange}
              placeholder="Cabinet (optionnel)"
            />
            <InlineError message={formik.errors.cabinet} fieldId="cabinet" />
          </Field>
          <Flex justifyContent="flex-end">
            <Box>
              <Button
                mr="2"
                variant="outline"
                onClick={() => {
                  Router.push("/magistrats/mesures/[mesure_id]", `/magistrats/mesures/${id}`, {
                    shallow: true,
                  });
                }}
              >
                Annuler
              </Button>
            </Box>
            <Box>
              <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
                Enregistrer
              </Button>
            </Box>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
