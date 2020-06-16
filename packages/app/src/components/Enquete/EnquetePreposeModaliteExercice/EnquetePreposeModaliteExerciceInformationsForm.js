import { Field, Heading1, Heading3, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex, Text } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { findOption } from "../../../util/option/OptionUtil";
import { SmallInput } from "../../Commons/SmallInput";
import { PERSONNALITE_JURIDIQUE } from "../constants";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

const validationSchema = yup.object().shape({
  departement: yup.string().required(),
  region: yup.string().required(),
  raison_sociale: yup.string().required(),
  personnalite_juridique_etablissement: yup.string().required(),
  activite_personne_physique: yup.number().min(0),
  activite_service: yup.number().min(0),
  total_mesures_etablissements: yup.number().min(0),
  etablissement_personne_morale: yup.number().min(0),
  etablissement_convention_groupement: yup.number().min(0),
});

function dataToForm(data) {
  return {
    departement: data.departement || "",
    region: data.region || "",
    raison_sociale: data.raison_sociale || "",
    personnalite_juridique_etablissement: data.personnalite_juridique_etablissement || "",
    activite_personne_physique: data.activite_personne_physique
      ? parseFloat(data.activite_personne_physique)
      : "",
    activite_service: data.activite_service ? parseFloat(data.activite_service) : "",
    total_mesures_etablissements: data.total_mesures_etablissements
      ? parseFloat(data.total_mesures_etablissements)
      : "",
    etablissement_personne_morale: data.etablissement_personne_morale
      ? parseFloat(data.etablissement_personne_morale)
      : "",
    etablissement_convention_groupement: data.etablissement_convention_groupement
      ? parseFloat(data.etablissement_convention_groupement)
      : "",
  };
}

function getEtablissementsCount(values) {
  const etablissementPersonneMorale = parseInt(values.etablissement_personne_morale || "0", 10);
  const etablissement = parseInt(values.etablissement_convention_groupement || "0", 10);
  return etablissementPersonneMorale + etablissement;
}

export const EnquetePreposeModaliteExerciceInformationsForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const {
    submitForm,
    handleChange,
    setFieldValue,
    handleBlur,
    values,
    errors,
    showError,
    submit,
  } = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm,
    loading,
  });

  return (
    <form onSubmit={submitForm}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Modalité d'exercice"}
      </Heading1>
      <Heading3>{"Informations générales"}</Heading3>
      <Box mt={4}>
        <Flex alignItems="start">
          <Box mr={1} flex={1 / 2}>
            <Field>
              <Label mb={1} htmlFor="region">
                {"Région"}
              </Label>
              <Input
                placeholder=""
                id="region"
                name="region"
                value={values.region}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                hasError={showError && !!errors.region}
              />
              <InlineError showError={showError} message={errors.region} fieldId="region" />
            </Field>
          </Box>
          <Box ml={1} flex={1 / 2}>
            <Field>
              <Label mb={1} htmlFor="departement">
                {"Département"}
              </Label>
              <Input
                placeholder=""
                id="departement"
                name="departement"
                value={values.departement}
                onChange={handleChange}
                type="text"
                hasError={showError && !!errors.departement}
              />
              <InlineError
                showError={showError}
                message={errors.departement}
                fieldId="departement"
              />
            </Field>
          </Box>
        </Flex>

        <Field>
          <Label mb={1} htmlFor="raison_sociale">
            {"Raison sociale de l'établissement dont dépend le préposé"}
          </Label>
          <Input
            placeholder=""
            id="raison_sociale"
            name="raison_sociale"
            value={values.raison_sociale}
            onChange={handleChange}
            type="text"
            hasError={showError && !!errors.raison_sociale}
          />
          <InlineError
            showError={showError}
            message={errors.raison_sociale}
            fieldId="raison_sociale"
          />
        </Field>
        <Field>
          <Label mb={1} htmlFor="personnalite_juridique_etablissement">
            {
              "Indiquez la personnalité juridique de l'établissement dont dépend le(s) préposé(s) dans le menu déroulant"
            }
          </Label>

          <Select
            id="personnalite_juridique_etablissement"
            instanceId="personnalite_juridique_etablissement"
            placeholder=""
            hasError={showError && !!errors.personnalite_juridique_etablissement}
            onChange={({ value }) => setFieldValue("personnalite_juridique_etablissement", value)}
            value={findOption(
              PERSONNALITE_JURIDIQUE.byKey,
              values.personnalite_juridique_etablissement
            )}
            options={PERSONNALITE_JURIDIQUE.byKey}
          />

          <InlineError
            showError={showError}
            message={errors.personnalite_juridique_etablissement}
            fieldId="personnalite_juridique_etablissement"
          />
        </Field>

        <Box>
          <Label>{"L'activité de préposé est exercée par :"}</Label>

          <Flex mt={2} alignItems="center">
            <Flex flex={1 / 2} alignItems="center">
              <SmallInput
                type="number"
                placeholder=""
                value={values.activite_personne_physique}
                id="activite_personne_physique"
                name="activite_personne_physique"
                hasError={!!errors.activite_personne_physique}
                onChange={handleChange}
                min={0}
              />
              <Text ml={3}>personne(s) physique(s)</Text>
            </Flex>
            <Flex flex={1 / 2} alignItems="center">
              <SmallInput
                type="number"
                placeholder=""
                value={values.activite_service}
                id="activite_service"
                name="activite_service"
                hasError={!!errors.activite_service}
                onChange={handleChange}
                min={0}
              />
              <Text ml={3}>{"service(s) au sens de l'article L312-1 du CASF"}</Text>
            </Flex>
          </Flex>
        </Box>

        <Box mt={4}>
          <Label>
            {"Nombre d'établissements auprès desquels est exercée l'activité de préposé MJPM :"}
          </Label>

          <Flex mt={2} alignItems="center">
            <SmallInput
              type="number"
              placeholder=""
              value={values.total_mesures_etablissements}
              id="total_mesures_etablissements"
              name="total_mesures_etablissements"
              hasError={!!errors.total_mesures_etablissements}
              onChange={handleChange}
              min={0}
              minWidth={"60px"}
            />
            <Text
              ml={3}
              dangerouslySetInnerHTML={{
                __html: ` mesure(s) prises en charge par ces <strong>${
                  getEtablissementsCount(values) || ""
                }</strong> `,
              }}
            />
          </Flex>

          <Flex mt={2} alignItems="center">
            <Flex flex={1 / 2} alignItems="center">
              <SmallInput
                type="number"
                placeholder=""
                value={values.etablissement_personne_morale}
                id="etablissement_personne_morale"
                name="etablissement_personne_morale"
                hasError={!!errors.etablissement_personne_morale}
                onChange={handleChange}
                min={0}
                minWidth={"60px"}
              />
              <Text ml={3}>établissement(s) dépendant de la même personne morale</Text>
            </Flex>
            <Flex flex={1 / 2} alignItems="center">
              <SmallInput
                type="number"
                placeholder=""
                value={values.etablissement_convention_groupement}
                id="etablissement_convention_groupement"
                name="etablissement_convention_groupement"
                hasError={!!errors.etablissement_convention_groupement}
                onChange={handleChange}
                min={0}
                minWidth={"60px"}
              />
              <Text ml={3}>
                {
                  "établissement(s) dans le cadre d'une convention ou d'un groupement (SIH, GCS, GCSMS, GIP)."
                }
              </Text>
            </Flex>
          </Flex>

          <Flex mt={2} alignItems="center">
            <SmallInput
              type="number"
              placeholder=""
              value={values.total_mesures_etablissements}
              id="total_mesures_etablissements"
              name="total_mesures_etablissements"
              hasError={!!errors.total_mesures_etablissements}
              onChange={handleChange}
              min={0}
              minWidth={"60px"}
            />
            <Text
              ml={3}
              dangerouslySetInnerHTML={{
                __html: ` mesure(s) prises en charge par ces <strong>${
                  getEtablissementsCount(values) || ""
                }</strong> établissements`,
              }}
            />
          </Flex>
        </Box>

        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </Box>
    </form>
  );
};

export default EnquetePreposeModaliteExerciceInformationsForm;
