import { Field, Heading1, Heading3, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React from "react";
import { Box } from "rebass";

import { YesNoComboBox } from "../../../components/Commons";
// import { mandataireEnqueteIndividuelSchema } from "../../../lib/validationSchemas";
import { findOption } from "../../../util/option/OptionUtil";
import { ENQ_REP_INFO_MANDATAIRE_FORM } from "../constants/ENQ_REP_INFO_MANDATAIRE_FORM.const";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

export const EnqueteIndividuelInformationsForm = props => {
  const { data = {}, goToPrevPage } = props;
  const {
    anciennete,
    benevole,
    estimation_etp,
    forme_juridique,
    local_professionnel,
    exerce_secretaires_specialises,
    secretaire_specialise_etp
  } = data;

  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      console.log("xxx values:", values);
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    // validationSchema: mandataireEnqueteIndividuelSchema,
    initialValues: {
      benevole: benevole || false,
      anciennete: anciennete || "",
      estimation_etp: estimation_etp || "",
      forme_juridique: forme_juridique || "",
      exerce_secretaires_specialises: exerce_secretaires_specialises || false,
      secretaire_specialise_etp: secretaire_specialise_etp || "",
      local_professionnel: local_professionnel || false
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Vos informations"}
      </Heading1>
      <Heading3>Informations générales</Heading3>
      <Box mt={4}>
        <Field>
          <Label mb={1} htmlFor="benevole">
            {"Exercez-vous cette activité à titre bénévole ?"}
          </Label>
          <YesNoComboBox
            defaultValue={values.benevole}
            name="benevole"
            onChange={value => setFieldValue("benevole", value)}
          />
          <InlineError message={errors.benevole} fieldId="benevole" />
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
                ENQ_REP_INFO_MANDATAIRE_FORM.FORME_JURIDIQUE,
                values.forme_juridique
              )}
              hasError={!!errors.forme_juridique}
              onChange={option => setFieldValue("forme_juridique", option.value)}
              options={ENQ_REP_INFO_MANDATAIRE_FORM.FORME_JURIDIQUE}
            />
            <InlineError message={errors.forme_juridique} fieldId="forme_juridique" />
          </Field>
        )}

        <Field>
          <Label mb={1} htmlFor="forme_juridique">
            {"Ancienneté dans la fonction de MJPM"}
          </Label>
          <Select
            placeholder=""
            id="anciennete"
            instanceId={"anciennete"}
            name="anciennete"
            value={findOption(ENQ_REP_INFO_MANDATAIRE_FORM.ANCIENNETE, values.anciennete)}
            hasError={!!errors.anciennete}
            onChange={option => setFieldValue("anciennete", option.value)}
            options={ENQ_REP_INFO_MANDATAIRE_FORM.ANCIENNETE}
          />
          <InlineError message={errors.anciennete} fieldId="anciennete" />
        </Field>

        <Field>
          <Label mb={1} htmlFor="estimation_etp">
            {"Estimation de l'activité en équivalent temps plein (ETP)"}
          </Label>
          <Select
            placeholder=""
            id="estimation_etp"
            instanceId={"estimation_etp"}
            name="estimation_etp"
            value={findOption(ENQ_REP_INFO_MANDATAIRE_FORM.ESTIMATION_ETP, values.estimation_etp)}
            hasError={!!errors.estimation_etp}
            onChange={option => setFieldValue("estimation_etp", option.value)}
            options={ENQ_REP_INFO_MANDATAIRE_FORM.ESTIMATION_ETP}
          />
          <InlineError message={errors.estimation_etp} fieldId="estimation_etp" />
        </Field>
      </Box>
      <Box>
        <Field>
          <Label mb={1}>{"Exercez-vous avec un secretariat spécialisé ?"}</Label>
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
              hasError={!!errors.secretaire_specialise_etp}
              onChange={handleChange}
              type="number"
            />
            <InlineError
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
          <InlineError message={errors.local_professionnel} fieldId="local_professionnel" />
        </Field>
      </Box>

      <EnqueteStepperButtons goToPrevPage={goToPrevPage} />
    </form>
  );
};

export default EnqueteIndividuelInformationsForm;
