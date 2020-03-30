import { Button, Field, Heading4, InlineError, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import {
  INTERVALLE_ETP_OPTIONS,
  SECRETARIAT_OPTIONS,
  YES_NO_OPTIONS
} from "../../constants/mandataire";
import { individuelExerciceSchema } from "../../lib/validationSchemas";
import { findOption, getOptionValue } from "../../util/option/OptionUtil";
import { FieldLabel } from "../IndividuelInformationCommon";

const IndividuelInformationExerciceForm = props => {
  const { exercice, handleSubmit, handleCancel } = props;

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: individuelExerciceSchema,
    initialValues: {
      estimationEtp: findOption(INTERVALLE_ETP_OPTIONS, exercice.estimation_etp) || "",
      secretaireSpecialise: findOption(SECRETARIAT_OPTIONS, exercice.secretaire_specialise) || "",
      secretaireSpecialiseEtp:
        findOption(INTERVALLE_ETP_OPTIONS, exercice.secretaire_specialise_etp) || "",
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
            id="estimationEtp"
            name="estimationEtp"
            value={formik.values.estimationEtp}
            hasError={formik.errors.estimationEtp}
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
            id="secretaireSpecialise"
            name="secretaireSpecialise"
            value={formik.values.secretaireSpecialise}
            hasError={formik.errors.secretaireSpecialise}
            onChange={option => {
              formik.setFieldValue("secretaireSpecialise", option);
              if (!option.value) {
                formik.setFieldValue("secretaireSpecialiseEtp", "");
              }
            }}
            options={SECRETARIAT_OPTIONS}
          />
          <InlineError
            message={formik.errors.secretaireSpecialise}
            fieldId="secretaireSpecialise"
          />
        </Field>
        {getOptionValue(formik.values.secretaireSpecialise) && (
          <Field>
            <FieldLabel label="Estimation de l'activité en ETP du secrétaire spécialisé" />
            <Select
              id="secretaireSpecialiseEtp"
              name="secretaireSpecialiseEtp"
              value={formik.values.secretaireSpecialiseEtp}
              hasError={formik.errors.secretaireSpecialiseEtp}
              onChange={option => formik.setFieldValue("secretaireSpecialiseEtp", option)}
              options={INTERVALLE_ETP_OPTIONS}
            />
            <InlineError
              message={formik.errors.secretaireSpecialiseEtp}
              fieldId="secretaireSpecialiseEtp"
            />
          </Field>
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"Cumul en tant que préposé d'établissement"}</Heading4>
        <Field>
          <FieldLabel label="Situation de cumul en tant que préposé d'établissement" />
          <Select
            id="cumulPrepose"
            name="cumulPrepose"
            value={formik.values.cumulPrepose}
            hasError={formik.errors.cumulPrepose}
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
              hasError={formik.errors.cumulPreposeEtp}
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
            id="cumulDelegueService"
            name="cumulDelegueService"
            value={formik.values.cumulDelegueService}
            hasError={formik.errors.cumulDelegueService}
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
              hasError={formik.errors.cumulDelegueServiceEtp}
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
        <Box mr="2">
          <Button type="button" mr="2" variant="outline" onClick={handleCancel}>
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
  );
};

export { IndividuelInformationExerciceForm };
