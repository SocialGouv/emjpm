import { MESURE_PROTECTION } from "@emjpm/core";
import { Button, Field, Heading4, InlineError } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { mesureEtatSchema } from "../../lib/validationSchemas";
import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "../AppForm";
import { GeocodeCities } from "../Geocode";

const initialValues = (mesureEtat) => {
  return {
    champ_mesure: mesureEtat ? mesureEtat.champMesure : "",
    code_postal: mesureEtat ? mesureEtat.codePostal : "",
    date_changement_etat: mesureEtat ? mesureEtat.dateChangementEtat : "",
    lieu_vie: mesureEtat ? mesureEtat.lieuVie : "",
    nature_mesure: mesureEtat ? mesureEtat.natureMesure : "",
    pays: mesureEtat ? mesureEtat.pays : "FR",
    type_etablissement: mesureEtat ? mesureEtat.typeEtablissement : "",
    ville: mesureEtat ? mesureEtat.ville : "",
  };
};

export const MesureEtatCreateOrEditForm = (props) => {
  const { handleSubmit, handleCancel, mesureEtatToEdit } = props;

  const formik = useFormik({
    initialValues: initialValues(mesureEtatToEdit),
    onSubmit: handleSubmit,
    validationSchema: mesureEtatSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Evolution de la protection"}</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Date de changement d'état"
            type="date"
            id="date_changement_etat"
            formik={formik}
            validationSchema={mesureEtatSchema}
            size="small"
            readOnly={mesureEtatToEdit ? true : false}
          />

          <FormGroupSelect
            id="nature_mesure"
            options={MESURE_PROTECTION.NATURE_MESURE.options}
            placeholder="Nature de la mesure"
            formik={formik}
            validationSchema={mesureEtatSchema}
            size="small"
          />

          <FormGroupSelect
            id="champ_mesure"
            options={MESURE_PROTECTION.CHAMP_MESURE.options}
            placeholder="Champs de la mesure"
            formik={formik}
            validationSchema={mesureEtatSchema}
            size="small"
          />

          <FormGroupSelect
            id="lieu_vie"
            options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.options}
            placeholder="Lieu de vie du majeur"
            formik={formik}
            validationSchema={mesureEtatSchema}
            size="small"
          />

          <FormGroupSelect
            id="type_etablissement"
            options={MESURE_PROTECTION.TYPE_ETABLISSEMENT.options}
            placeholder="Type d'établissement"
            formik={formik}
            validationSchema={mesureEtatSchema}
            size="small"
          />

          <FormGroupSelect
            id="pays"
            options={[
              {
                label: "France",
                value: "FR",
              },
              {
                label: "Belgique",
                value: "BE",
              },
            ]}
            placeholder="Pays"
            formik={formik}
            validationSchema={mesureEtatSchema}
            size="small"
          />

          {formik.values.pays === "FR" && (
            <Flex justifyContent="space-between">
              <Box mr={1} flex={1 / 2}>
                <FormGroupInput
                  placeholder="Code postal"
                  id="code_postal"
                  formik={formik}
                  validationSchema={mesureEtatSchema}
                  onChange={async (e) => {
                    const { value } = e.target;
                    await formik.setFieldValue("code_postal", value);
                    await formik.setFieldValue("ville", "");
                  }}
                  size="small"
                />
              </Box>
              <Box ml={1} flex={1 / 2}>
                <Field>
                  <GeocodeCities
                    placeholder="Ville"
                    name="ville"
                    id="ville"
                    zipcode={formik.values.code_postal}
                    onChange={(value) => formik.setFieldValue("ville", value)}
                    value={formik.values.ville}
                    hasError={!!formik.errors.ville}
                    size="small"
                  />
                  <InlineError message={formik.errors.ville} fieldId="ville" />
                </Field>
              </Box>
            </Flex>
          )}
        </FormInputBox>
      </Flex>

      <Flex justifyContent="flex-end" py={2}>
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
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
