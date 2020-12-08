import { isTypeEtablissementRequired, MESURE_PROTECTION } from "@emjpm/core";
import { Button, Field, Heading4, InlineError } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { mesureCreateSchema } from "../../lib/validationSchemas";
import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "../AppForm";
import { GeocodeCities } from "../Geocode";
import TribunalAutoComplete from "../TribunalAutoComplete";

const initialValues = () => {
  return {
    annee_naissance: "",
    antenne: "",
    cabinet: "",
    champ_mesure: "",
    civilite: "",
    code_postal: "",
    date_nomination: "",
    lieu_vie: "",
    nature_mesure: "",
    numero_dossier: "",
    numero_rg: "",
    pays: "FR",
    tribunal: null,
    ville: "",
  };
};

export const MesureCreateForm = (props) => {
  const { tribunaux, antenneOptions, handleSubmit, handleCancel } = props;

  const formik = useFormik({
    initialValues: initialValues(),
    onSubmit: handleSubmit,
    validationSchema: mesureCreateSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading4>Majeur protégé</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <Flex flexDirection={["column", "row", "row"]}>
            <Box flexGrow="2" pr="1px">
              <FormGroupInput
                placeholder="Numéro RG"
                id="numero_rg"
                formik={formik}
                size="small"
                validationSchema={mesureCreateSchema}
              />
            </Box>
            <Box pl="1px">
              <FormGroupInput
                placeholder="Numéro de dossier (optionnel)"
                id="numero_dossier"
                formik={formik}
                size="small"
                validationSchema={mesureCreateSchema}
              />
            </Box>
          </Flex>
          <Flex flexDirection={["column", "row", "row"]}>
            <Box flexGrow="2" pr="1px">
              <Field>
                <TribunalAutoComplete
                  id="tribunal"
                  value={formik.values.tribunal}
                  name="tribunal"
                  hasError={formik.errors.tribunal && formik.touched.tribunal}
                  onChange={(option) =>
                    formik.setFieldValue("tribunal", option)
                  }
                  defaultOptions={tribunaux}
                  placeholder="Tribunal"
                  size="small"
                />
                {formik.touched.tribunal && (
                  <InlineError
                    message={formik.errors.tribunal}
                    fieldId="tribunal"
                  />
                )}
              </Field>
            </Box>
            <Box pl="1px">
              <FormGroupInput
                placeholder="Cabinet (optionnel)"
                id="cabinet"
                formik={formik}
                size="small"
                validationSchema={mesureCreateSchema}
              />
            </Box>
          </Flex>
          <FormGroupSelect
            id="civilite"
            options={MESURE_PROTECTION.CIVILITE.options}
            placeholder="Civilité"
            formik={formik}
            size="small"
            validationSchema={mesureCreateSchema}
          />

          <FormGroupInput
            placeholder="Année de naissance"
            id="annee_naissance"
            formik={formik}
            size="small"
            validationSchema={mesureCreateSchema}
          />
          <FormGroupInput
            placeholder="Date de première mise sous protection (optionnel)"
            type="date"
            id="date_premier_mesure"
            formik={formik}
            size="small"
            validationSchema={mesureCreateSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4>Mesure de protection</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            placeholder="Date de nomination"
            type="date"
            id="date_nomination"
            formik={formik}
            size="small"
            validationSchema={mesureCreateSchema}
          />
          <FormGroupSelect
            id="nature_mesure"
            options={MESURE_PROTECTION.NATURE_MESURE.options}
            placeholder="Nature de la mesure"
            formik={formik}
            size="small"
            validationSchema={mesureCreateSchema}
          />

          <FormGroupSelect
            id="champ_mesure"
            options={MESURE_PROTECTION.CHAMP_MESURE.options}
            placeholder="Champs de la mesure"
            formik={formik}
            size="small"
            validationSchema={mesureCreateSchema}
          />

          <FormGroupSelect
            id="lieu_vie"
            options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.options}
            placeholder="Lieu de vie du majeur"
            formik={formik}
            validationSchema={mesureCreateSchema}
            onChange={(option) => {
              formik.setFieldValue("lieu_vie", option.value);
              formik.setFieldValue("type_etablissement", null);
            }}
          />

          {isTypeEtablissementRequired(formik.values.lieu_vie) && (
            <FormGroupSelect
              id="type_etablissement"
              options={MESURE_PROTECTION.TYPE_ETABLISSEMENT.options}
              placeholder="Type d'établissement"
              formik={formik}
              validationSchema={mesureCreateSchema}
            />
          )}

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
            size="small"
            validationSchema={mesureCreateSchema}
          />

          {formik.values.pays === "FR" && (
            <Flex justifyContent="space-between">
              <Box mr={1} flex={1 / 2}>
                <FormGroupInput
                  placeholder="Code postal"
                  id="code_postal"
                  formik={formik}
                  size="small"
                  validationSchema={mesureCreateSchema}
                  onChange={async (e) => {
                    const { value } = e.target;
                    await formik.setFieldValue("code_postal", value);
                    await formik.setFieldValue("ville", "");
                  }}
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
      {antenneOptions.length > 0 && (
        <Flex>
          <FormGrayBox>
            <Heading4>Antenne de gestion de la mesure</Heading4>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupSelect
              id="antenne"
              options={antenneOptions}
              placeholder="Antenne"
              value={formik.values.antenne}
              formik={formik}
              size="small"
              validationSchema={mesureCreateSchema}
            />
          </FormInputBox>
        </Flex>
      )}

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
