import { Button, Field, InlineError, Select } from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import React from "react";
import { Flex } from "rebass";

import {
  INTERVALLE_ETP_OPTIONS,
  SECRETARIAT_OPTIONS,
  YES_NO_OPTIONS
} from "../../constants/mandataire";
import { individuelExerciceSchema } from "../../lib/validationSchemas";
import { findOption, getOptionValue } from "../../util/option/OptionUtil";

const IndividuelInformationExerciceForm = props => {
  const { exercice, handleSubmit } = props;

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
      <Field>
        <Select
          id="estimationEtp"
          name="estimationEtp"
          placeholder="Estimation de l'activité de mandataire individuel en ETP"
          value={formik.values.estimationEtp}
          hasError={formik.errors.estimationEtp && formik.touched.estimationEtp}
          onChange={option => formik.setFieldValue("estimationEtp", option)}
          options={INTERVALLE_ETP_OPTIONS}
        />
        <InlineError message={formik.errors.estimationEtp} fieldId="estimationEtp" />
      </Field>
      <Field>
        <Select
          id="secretaireSpecialise"
          name="secretaireSpecialise"
          placeholder="Estimation de l'activité de mandataire individuel en ETP"
          value={formik.values.secretaireSpecialise}
          hasError={formik.errors.secretaireSpecialise && formik.touched.secretaireSpecialise}
          onChange={option => {
            formik.setFieldValue("secretaireSpecialise", option);
            if (!option.value) {
              formik.setFieldValue("secretaireSpecialiseEtp", "");
            }
          }}
          options={SECRETARIAT_OPTIONS}
        />
        <InlineError message={formik.errors.secretaireSpecialise} fieldId="secretaireSpecialise" />
      </Field>
      {getOptionValue(formik.values.secretaireSpecialise) && (
        <Field>
          <Select
            id="secretaireSpecialiseEtp"
            name="secretaireSpecialiseEtp"
            placeholder="Estimation de l'activité en ETP du secrétaire spécialisé"
            value={formik.values.secretaireSpecialiseEtp}
            hasError={
              formik.errors.secretaireSpecialise_etp && formik.touched.secretaireSpecialiseEtp
            }
            onChange={option => formik.setFieldValue("secretaireSpecialiseEtp", option)}
            options={INTERVALLE_ETP_OPTIONS}
          />
          <InlineError
            message={formik.errors.secretaireSpecialiseEtp}
            fieldId="secretaireSpecialiseEtp"
          />
        </Field>
      )}
      <Field>
        <Select
          id="cumulPrepose"
          name="cumulPrepose"
          placeholder="Situation de cumul en tant que préposé d'établissement"
          value={formik.values.cumulPrepose}
          hasError={formik.errors.cumulPrepose && formik.touched.cumulPrepose}
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
          <Select
            id="cumulPreposeEtp"
            name="cumulPreposeEtp"
            placeholder="Si cumul en tant que préposé, ETP consacré au cumul"
            value={formik.values.cumulPreposeEtp}
            hasError={formik.errors.cumulPreposeEtp && formik.touched.cumulPreposeEtp}
            onChange={option => formik.setFieldValue("cumulPreposeEtp", option)}
            options={INTERVALLE_ETP_OPTIONS}
          />
          <InlineError message={formik.errors.cumulPreposeEtp} fieldId="cumulPreposeEtp" />
        </Field>
      )}

      <Field>
        <Select
          id="cumulDelegueService"
          name="cumulDelegueService"
          placeholder="Situation de cumul en tant que délégué d'une service"
          value={formik.values.cumulDelegueService}
          hasError={formik.errors.cumulDelegueService && formik.touched.cumulDelegueService}
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
          <Select
            id="cumulDelegueServiceEtp"
            name="cumulDelegueServiceEtp"
            placeholder="Si cumul en tant que délégué d'un service mandataire, ETP consacré au cumul"
            value={formik.values.cumulDelegueServiceEtp}
            hasError={formik.errors.cumulDelegueServiceEtp && formik.touched.cumulDelegueServiceEtp}
            onChange={option => formik.setFieldValue("cumulDelegueServiceEtp", option)}
            options={INTERVALLE_ETP_OPTIONS}
          />
          <InlineError
            message={formik.errors.cumulDelegueServiceEtp}
            fieldId="cumulDelegueServiceEtp"
          />
        </Field>
      )}
      <Flex>
        <Button type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
          Modifier
        </Button>
      </Flex>
    </form>
  );
};

export { IndividuelInformationExerciceForm };
