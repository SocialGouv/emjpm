import { Field, Heading1, Heading3, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React, { useEffect, useMemo } from "react";
import { Box, Text } from "rebass";

import { YesNoComboBox } from "../../../components/Commons";
import yup from "../../../lib/validationSchemas/yup";
import { findOption } from "../../../util/option/OptionUtil";
import { ENQ_REP_INFO_MANDATAIRE } from "../constants";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

// schema identique à enqueteInformationsMandatairesStatus
const validationSchema = yup.object().shape({
  nom: yup.string().required(),
  departement: yup.string().required(),
  region: yup.string().required(),
  benevole: yup.boolean().required(),
  forme_juridique: yup.string().when("benevole", {
    is: false,
    then: yup.string().required(),
    otherwise: yup.string().nullable()
  }),
  anciennete: yup.string().required(),
  estimation_etp: yup.string().required(),
  exerce_secretaires_specialises: yup.boolean().nullable(),
  secretaire_specialise_etp: yup.number().nullable(),
  local_professionnel: yup.boolean().required()
});

function mapDataPropsToFormValues(data) {
  return {
    departement: data.departement || "",
    region: data.region || "",
    nom: data.nom || "",
    benevole: data.benevole || false,
    anciennete: data.anciennete || "",
    estimation_etp: data.estimation_etp || "",
    forme_juridique: data.forme_juridique || "",
    exerce_secretaires_specialises: data.exerce_secretaires_specialises || false,
    secretaire_specialise_etp: data.secretaire_specialise_etp || "",
    local_professionnel: data.local_professionnel || false,
    tranche_age: data.tranche_age,
    sexe: data.sexe
  };
}

export const EnqueteIndividuelInformationsForm = props => {
  const { data = {}, step, goToPrevPage } = props;

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    setFieldValue,
    setValues,
    submitCount
  } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    validationSchema,
    initialValues: mapDataPropsToFormValues(data)
  });

  useEffect(() => {
    setValues(mapDataPropsToFormValues(data));
  }, [data, setValues]);

  const showError = useMemo(() => step.status !== "empty" || submitCount !== 0, [
    step.status,
    submitCount
  ]);

  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Vos informations"}
      </Heading1>
      <Heading3>Informations générales</Heading3>
      <Box mt={4}>
        <Field>
          <Label mb={1} htmlFor="departement">
            {"Département"}
          </Label>
          <Input
            placeholder=""
            id="departement"
            name="departement"
            value={values.departement}
            hasError={showError && !!errors.departement}
            onChange={handleChange}
            type="text"
          />
          <InlineError showError={showError} message={errors.departement} fieldId="departement" />
        </Field>

        <Field>
          <Label mb={1} htmlFor="region">
            {"Région"}
          </Label>
          <Input
            placeholder=""
            id="region"
            name="region"
            value={values.region}
            hasError={showError && !!errors.region}
            onChange={handleChange}
            type="text"
          />
          <InlineError showError={showError} message={errors.region} fieldId="region" />
        </Field>

        <Field>
          <Label mb={1} htmlFor="nom">
            {"Nom du mandataire"}
          </Label>
          <Input
            placeholder=""
            id="nom"
            name="nom"
            value={values.nom}
            hasError={showError && !!errors.nom}
            onChange={handleChange}
            type="text"
          />
          <InlineError showError={showError} message={errors.nom} fieldId="nom" />
        </Field>

        <Text mt={7} mb={4} fontWeight="bold" color="#595959">
          STATUT
        </Text>

        <Field>
          <Label mb={1} htmlFor="benevole">
            {"Exercez-vous cette activité à titre bénévole ?"}
          </Label>
          <YesNoComboBox
            defaultValue={values.benevole}
            name="benevole"
            onChange={value => setFieldValue("benevole", value)}
          />
          <InlineError showError={showError} message={errors.benevole} fieldId="benevole" />
        </Field>

        {values.benevole === false && (
          <Field>
            <Label mb={1} htmlFor="forme_juridique">
              {"Forme juridique de votre entreprise"}
            </Label>
            <Select
              placeholder=""
              id="forme_juridique"
              instanceId={"forme_juridique"}
              name="forme_juridique"
              value={findOption(
                ENQ_REP_INFO_MANDATAIRE.FORME_JURIDIQUE.byKey,
                values.forme_juridique
              )}
              hasError={showError && !!errors.forme_juridique}
              onChange={option => setFieldValue("forme_juridique", option.value)}
              options={ENQ_REP_INFO_MANDATAIRE.FORME_JURIDIQUE.byKey}
            />
            <InlineError
              showError={showError}
              message={errors.forme_juridique}
              fieldId="forme_juridique"
            />
          </Field>
        )}

        <Field>
          <Label mb={1} htmlFor="sexe">
            {"Sexe"}
          </Label>
          <Select
            placeholder=""
            id="sexe"
            instanceId={"sexe"}
            name="sexe"
            value={findOption(ENQ_REP_INFO_MANDATAIRE.SEXE.byKey, values.sexe)}
            hasError={showError && !!errors.sexe}
            onChange={option => setFieldValue("sexe", option.value)}
            options={ENQ_REP_INFO_MANDATAIRE.SEXE.byKey}
          />
          <InlineError showError={showError} message={errors.sexe} fieldId="sexe" />
        </Field>

        <Field>
          <Label mb={1} htmlFor="forme_juridique">
            {"Ancienneté dans la fonction de MJPM"}
          </Label>
          <Select
            placeholder=""
            id="anciennete"
            instanceId={"anciennete"}
            name="anciennete"
            value={findOption(ENQ_REP_INFO_MANDATAIRE.ANCIENNETE.byKey, values.anciennete)}
            hasError={showError && !!errors.anciennete}
            onChange={option => setFieldValue("anciennete", option.value)}
            options={ENQ_REP_INFO_MANDATAIRE.ANCIENNETE.byKey}
          />
          <InlineError showError={showError} message={errors.anciennete} fieldId="anciennete" />
        </Field>

        <Field>
          <Label mb={1} htmlFor="tranche_age">
            {"Tranche d'âge dans laquelle vous vous situez"}
          </Label>
          <Select
            placeholder=""
            id="tranche_age"
            instanceId={"tranche_age"}
            name="tranche_age"
            value={findOption(ENQ_REP_INFO_MANDATAIRE.TRANCHE_AGE.byKey, values.tranche_age)}
            hasError={showError && !!errors.tranche_age}
            onChange={option => setFieldValue("tranche_age", option.value)}
            options={ENQ_REP_INFO_MANDATAIRE.TRANCHE_AGE.byKey}
          />
          <InlineError showError={showError} message={errors.tranche_age} fieldId="tranche_age" />
        </Field>

        <Text mt={7} mb={4} fontWeight="bold" color="#595959">
          {"CONDITIONS D'EXERCICE DE L'ACTIVITE"}
        </Text>

        <Field>
          <Label mb={1} htmlFor="estimation_etp">
            {"Estimation de l'activité en équivalent temps plein (ETP)"}
          </Label>
          <Select
            placeholder=""
            id="estimation_etp"
            instanceId={"estimation_etp"}
            name="estimation_etp"
            value={findOption(ENQ_REP_INFO_MANDATAIRE.ESTIMATION_ETP.byKey, values.estimation_etp)}
            hasError={showError && !!errors.estimation_etp}
            onChange={option => setFieldValue("estimation_etp", option.value)}
            options={ENQ_REP_INFO_MANDATAIRE.ESTIMATION_ETP.byKey}
          />
          <InlineError
            showError={showError}
            message={errors.estimation_etp}
            fieldId="estimation_etp"
          />
        </Field>
      </Box>
      <Box>
        <Field>
          <Label mb={1}>{"Exercez-vous avec un secrétariat spécialisé ?"}</Label>
          <YesNoComboBox
            defaultValue={values.exerce_secretaires_specialises}
            name="exerce_secretaires_specialises"
            onChange={value => {
              setFieldValue("exerce_secretaires_specialises", value);
              if (!value) {
                setFieldValue("exerce_secretaires_specialises", "");
              }
            }}
          />
          <InlineError
            showError={showError}
            message={errors.exerce_secretaires_specialises}
            fieldId="exerce_secretaires_specialises"
          />
        </Field>

        {values.exerce_secretaires_specialises && (
          <Field>
            <Label mb={1} htmlFor="secretaire_specialise_etp">
              {"Estimation de l'activité en ETP du secrétariat spécialisé"}
            </Label>
            <Input
              placeholder=""
              id="secretaire_specialise_etp"
              name="secretaire_specialise_etp"
              value={values.secretaire_specialise_etp}
              hasError={showError && !!errors.secretaire_specialise_etp}
              onChange={handleChange}
              type="number"
            />
            <InlineError
              showError={showError}
              message={errors.secretaire_specialise_etp}
              fieldId="secretaire_specialise_etp"
            />
          </Field>
        )}

        <Field>
          <Label mb={1}>{"Exercez-vous votre activité dans un local professionnnel ?"}</Label>
          <YesNoComboBox
            defaultValue={values.local_professionnel}
            name="local_professionnel"
            onChange={value => setFieldValue("local_professionnel", value)}
          />
          <InlineError
            showError={showError}
            message={errors.local_professionnel}
            fieldId="local_professionnel"
          />
        </Field>
      </Box>

      <EnqueteStepperButtons goToPrevPage={goToPrevPage} />
    </form>
  );
};

export default EnqueteIndividuelInformationsForm;
