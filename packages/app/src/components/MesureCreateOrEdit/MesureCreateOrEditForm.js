import { MESURE_PROTECTION } from "@emjpm/core";
import { Button, Field, InlineError } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { mesureSchema } from "../../lib/validationSchemas";
import { FormGroupInput, FormGroupSelect } from "../AppForm";
import { GeocodeCities } from "../Geocode";
import TribunalAutoComplete from "../TribunalAutoComplete";

const initialValues = (mesure) => {
  return {
    annee_naissance: mesure ? mesure.age : "",
    antenne: mesure ? mesure.antenneId : "",
    cabinet: mesure ? mesure.cabinet : "",
    champ_mesure: mesure ? mesure.champMesure : "",
    civilite: mesure ? mesure.civilite : "",
    code_postal: mesure ? mesure.codePostal : "",
    date_nomination: mesure ? mesure.dateNomination : "",
    lieu_vie: mesure ? mesure.lieuVie : "",
    nature_mesure: mesure ? mesure.natureMesure : "",
    numero_dossier: mesure ? mesure.numeroDossier : "",
    numero_rg: mesure ? mesure.numeroRg : "",
    pays: mesure ? mesure.pays : "FR",
    tribunal:
      mesure && mesure.tiId
        ? { label: mesure.tribunal, value: mesure.tiId }
        : null,
    ville: mesure ? mesure.ville : "",
  };
};

export const MesureCreateOrEditForm = (props) => {
  const {
    tribunaux,
    antenneOptions,
    handleSubmit,
    handleCancel,
    mesureToEdit,
  } = props;

  const formik = useFormik({
    initialValues: initialValues(mesureToEdit),
    onSubmit: handleSubmit,
    validationSchema: mesureSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormGroupInput
        placeholder="Numéro RG"
        id="numero_rg"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <Field>
        <TribunalAutoComplete
          id="tribunal"
          value={formik.values.tribunal}
          name="tribunal"
          hasError={formik.errors.tribunal && formik.touched.tribunal}
          onChange={(option) => formik.setFieldValue("tribunal", option)}
          defaultOptions={tribunaux}
          placeholder=""
          tot
        />
        {formik.touched.tribunal && (
          <InlineError message={formik.errors.tribunal} fieldId="tribunal" />
        )}
      </Field>

      <FormGroupInput
        placeholder="Cabinet"
        id="cabinet"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupInput
        placeholder="Numéro de dossier"
        id="numero_dossier"
        formik={formik}
        validationSchema={mesureSchema}
      />

      {antenneOptions.length > 0 && (
        <FormGroupSelect
          id="antenne"
          options={antenneOptions}
          placeholder="Antenne"
          value={formik.values.antenne}
          formik={formik}
          validationSchema={mesureSchema}
        />
      )}

      <FormGroupInput
        placeholder="Date de jugement ou ordonnance de nomination"
        type="date"
        id="date_nomination"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupSelect
        id="nature_mesure"
        options={MESURE_PROTECTION.NATURE_MESURE.options}
        placeholder="Nature de la mesure"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupSelect
        id="champ_mesure"
        options={MESURE_PROTECTION.CHAMP_MESURE.options}
        placeholder="Champs de la mesure"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupSelect
        id="civilite"
        options={MESURE_PROTECTION.CIVILITE.options}
        placeholder="Civilité"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupInput
        placeholder="Année de naissance"
        id="annee_naissance"
        formik={formik}
        validationSchema={mesureSchema}
      />

      <FormGroupSelect
        id="lieu_vie"
        options={MESURE_PROTECTION.LIEU_VIE_MAJEUR.options}
        placeholder="Lieu de vie du majeur"
        formik={formik}
        validationSchema={mesureSchema}
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
        validationSchema={mesureSchema}
      />

      {formik.values.pays === "FR" && (
        <Flex justifyContent="space-between">
          <Box mr={1} flex={1 / 2}>
            <FormGroupInput
              placeholder="Code postal"
              id="code_postal"
              formik={formik}
              validationSchema={mesureSchema}
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
              />
              <InlineError message={formik.errors.ville} fieldId="ville" />
            </Field>
          </Box>
        </Flex>
      )}
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
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
