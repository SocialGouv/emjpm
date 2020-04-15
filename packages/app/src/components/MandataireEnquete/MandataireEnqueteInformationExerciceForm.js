import { Button, Field, Heading4, InlineError, Input, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { INTERVALLE_ETP_OPTIONS, YES_NO_OPTIONS } from "../../constants/mandataire";
import { individuelExerciceSchema } from "../../lib/validationSchemas";
import { findOption, getOptionValue } from "../../util/option/OptionUtil";
import { FieldLabel } from "../IndividuelInformationCommon";

export const MandataireEnqueteInformationExerciceForm = props => {
  const { exercice, handleSubmit } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: individuelExerciceSchema,
    initialValues: {
      estimationEtp: findOption(INTERVALLE_ETP_OPTIONS, exercice.estimation_etp) || "",
      secretariatSpecialise: findOption(YES_NO_OPTIONS, exercice.secretariat_specialise) || "",
      secretariatSpecialiseEtp: exercice.secretariat_specialise_etp || "",
      cumulPrepose: findOption(YES_NO_OPTIONS, exercice.cumul_prepose) || "",
      cumulPreposeEtp: findOption(INTERVALLE_ETP_OPTIONS, exercice.cumul_prepose_etp) || "",
      cumulDelegueService: findOption(YES_NO_OPTIONS, exercice.cumul_delegue_service) || "",
      cumulDelegueServiceEtp:
        findOption(INTERVALLE_ETP_OPTIONS, exercice.cumul_delegue_service_etp) || ""
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <Heading4 mb={1}>{"Activité de mandataire individuel"}</Heading4>
        <Field>
          <FieldLabel label="Estimation de l'activité de mandataire individuel en ETP" />
          <Select
            placeholder=""
            id="estimationEtp"
            name="estimationEtp"
            value={formik.values.estimationEtp}
            hasError={!!formik.errors.estimationEtp}
            onChange={option => formik.setFieldValue("estimationEtp", option)}
            options={INTERVALLE_ETP_OPTIONS}
          />
          <InlineError message={formik.errors.estimationEtp} fieldId="estimationEtp" />
        </Field>
      </Box>
      <Box>
        <Heading4 mb={1}>{"Secretariat spécialisé"}</Heading4>
        <Field>
          <FieldLabel label="Exercez-vous avec un secretariat spécialisé?" />
          <Select
            placeholder=""
            id="secretariatSpecialise"
            name="secretariatSpecialise"
            value={formik.values.secretariatSpecialise}
            hasError={!!formik.errors.secretariatSpecialise}
            onChange={option => {
              formik.setFieldValue("secretariatSpecialise", option);
              if (!option.value) {
                formik.setFieldValue("secretariatSpecialiseEtp", "");
              }
            }}
            options={YES_NO_OPTIONS}
          />
          <InlineError
            message={formik.errors.secretariatSpecialise}
            fieldId="secretariatSpecialise"
          />
        </Field>
        {getOptionValue(formik.values.secretariatSpecialise) && (
          <Field>
            <FieldLabel label="Estimation de l'activité en ETP du secrétariat spécialisé" />
            <Input
              placeholder=""
              id="secretariatSpecialiseEtp"
              name="secretariatSpecialiseEtp"
              value={formik.values.secretariatSpecialiseEtp}
              hasError={!!formik.errors.secretariatSpecialiseEtp}
              onChange={formik.handleChange}
              type="number"
            />
            <InlineError
              message={formik.errors.secretariatSpecialiseEtp}
              fieldId="secretariatSpecialiseEtp"
            />
          </Field>
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"Cumul en tant que préposé d'établissement"}</Heading4>
        <Field>
          <FieldLabel label="Situation de cumul en tant que préposé d'établissement" />
          <Select
            placeholder=""
            id="cumulPrepose"
            name="cumulPrepose"
            value={formik.values.cumulPrepose}
            hasError={!!formik.errors.cumulPrepose}
            onChange={option => {
              formik.setFieldValue("cumulPrepose", option);
              if (!option.value) {
                formik.setFieldValue("cumulPreposeEtp", "");
              }
            }}
            options={YES_NO_OPTIONS}
          />
          <InlineError message={formik.errors.cumulPrepose} fieldId="cumulPrepose" />
        </Field>
        {getOptionValue(formik.values.cumulPrepose) && (
          <Field>
            <FieldLabel label="ETP consacré au cumul en tant que préposé" />
            <Select
              id="cumulPreposeEtp"
              name="cumulPreposeEtp"
              placeholder="ETP consacré au cumul en tant que préposé"
              value={formik.values.cumulPreposeEtp}
              hasError={!!formik.errors.cumulPreposeEtp}
              onChange={option => formik.setFieldValue("cumulPreposeEtp", option)}
              options={INTERVALLE_ETP_OPTIONS}
            />
            <InlineError message={formik.errors.cumulPreposeEtp} fieldId="cumulPreposeEtp" />
          </Field>
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"Cumul en tant que délégué d'une service"}</Heading4>
        <Field>
          <FieldLabel label="Situation de cumul en tant que délégué d'une service" />
          <Select
            placeholder=""
            id="cumulDelegueService"
            name="cumulDelegueService"
            value={formik.values.cumulDelegueService}
            hasError={!!formik.errors.cumulDelegueService}
            onChange={option => {
              formik.setFieldValue("cumulDelegueService", option);
              if (!option.value) {
                formik.setFieldValue("cumulDelegueServiceEtp", "");
              }
            }}
            options={YES_NO_OPTIONS}
          />
          <InlineError message={formik.errors.cumulDelegueService} fieldId="cumulDelegueService" />
        </Field>
        {getOptionValue(formik.values.cumulDelegueService) && (
          <Field>
            <FieldLabel label="ETP consacré au cumul en tant que délégué d'un service mandataire" />
            <Select
              id="cumulDelegueServiceEtp"
              name="cumulDelegueServiceEtp"
              value={formik.values.cumulDelegueServiceEtp}
              hasError={!!formik.errors.cumulDelegueServiceEtp}
              onChange={option => formik.setFieldValue("cumulDelegueServiceEtp", option)}
              options={INTERVALLE_ETP_OPTIONS}
            />
            <InlineError
              message={formik.errors.cumulDelegueServiceEtp}
              fieldId="cumulDelegueServiceEtp"
            />
          </Field>
        )}
      </Box>
      <Flex alignItems="center" justifyContent="flex-end">
        <Box>
          <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default MandataireEnqueteInformationExerciceForm;
