import { Field, Heading1, Heading3, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React from "react";
import { Box } from "rebass";

import { YesNoComboBox } from "../../../components/Commons";
import { INTERVALLE_ETP_OPTIONS } from "../../../constants/mandataire";
// import { mandataireEnqueteIndividuelSchema } from "../../../lib/validationSchemas";
import { findOption } from "../../../util/option/OptionUtil";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

export const EnqueteIndividuelInformationsForm = props => {
  const { data = {}, goToPrevPage } = props;
  const {
    anciennete = "",
    benevole = false,
    estimation_etp = "",
    forme_juridique = "",
    local_professionnel = "",
    secretaire_specialise_etp = ""
  } = data;

  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    // validationSchema: mandataireEnqueteIndividuelSchema,
    initialValues: {
      benevole,
      anciennete,
      estimation_etp,
      forme_juridique,
      secretaire_specialise: secretaire_specialise_etp ? secretaire_specialise_etp > 0 : false,
      secretaire_specialise_etp,
      local_professionnel
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
          <YesNoComboBox name="benevole" onChange={value => setFieldValue("benevole", value)} />
          <InlineError message={errors.benevole} fieldId="benevole" />
        </Field>

        {values.benevole === false && (
          <Field>
            <Label mb={1} htmlFor="forme_juridique">
              {"Forme juridique de votre entreprise"}
            </Label>
            <Input
              placeholder=""
              id="forme_juridique"
              name="forme_juridique"
              value={values.forme_juridique}
              hasError={!!errors.forme_juridique}
              onChange={handleChange}
              type="text"
            />
            <InlineError message={errors.forme_juridique} fieldId="forme_juridique" />
          </Field>
        )}

        <Field>
          <Label mb={1} htmlFor="forme_juridique">
            {"Ancienneté dans la fonction de MJPM"}
          </Label>
          <Input
            placeholder=""
            id="anciennete"
            name="anciennete"
            value={values.anciennete}
            hasError={!!errors.anciennete}
            onChange={handleChange}
            type="number"
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
            value={findOption(INTERVALLE_ETP_OPTIONS, values.estimation_etp)}
            hasError={!!errors.estimation_etp}
            onChange={option => setFieldValue("estimation_etp", option.value)}
            options={INTERVALLE_ETP_OPTIONS}
          />
          <InlineError message={errors.estimation_etp} fieldId="estimation_etp" />
        </Field>
      </Box>
      <Box>
        <Field>
          <Label mb={1}>{"Exercez-vous avec un secretariat spécialisé ?"}</Label>
          <YesNoComboBox
            name="secretaire_specialise"
            onChange={value => {
              setFieldValue("secretaire_specialise", value);
              if (!value) {
                setFieldValue("secretaire_specialise_etp", "");
              }
            }}
          />
          <InlineError message={errors.secretaire_specialise} fieldId="secretaire_specialise" />
        </Field>

        {values.secretaire_specialise && (
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
