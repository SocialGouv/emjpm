import { Field, Heading1, Heading3, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React from "react";
import { Box } from "rebass";

import { YesNoComboBox } from "../../../components/Commons";
import { INTERVALLE_ETP_OPTIONS } from "../../../constants/mandataire";
import { mandataireEnqueteIndividuelSchema } from "../../../lib/validationSchemas";
import { findOption } from "../../../util/option/OptionUtil";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

export const EnqueteIndividuelInformationsForm = props => {
  const { data = {}, goToPrevPage } = props;
  const {
    benevole,
    estimation_etp,
    secretaire_specialise,
    secretaire_specialise_etp,
    cumul_prepose,
    cumul_prepose_etp,
    cumul_delegue_service,
    cumul_delegue_service_etp,
    debut_activite_avant_2009,
    annee_debut_activite,
    local_professionnel
  } = data;

  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    validationSchema: mandataireEnqueteIndividuelSchema,
    initialValues: {
      benevole: benevole || "",
      estimationEtp: estimation_etp,
      secretaireSpecialise: secretaire_specialise || false,
      secretaireSpecialiseEtp: secretaire_specialise_etp || "",
      cumulPrepose: cumul_prepose || false,
      cumulPreposeEtp: cumul_prepose_etp || "",
      cumulDelegueService: cumul_delegue_service || false,
      cumulDelegueServiceEtp: cumul_delegue_service_etp || "",
      debutActiviteAvant2009: debut_activite_avant_2009 || false,
      anneeDebutActivite: annee_debut_activite || "",
      localProfessionnel: local_professionnel || ""
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
          <Label mb={1}>{"Exercez-vous cette activité à titre bénévole ?"}</Label>
          <YesNoComboBox name="benevole" onChange={value => setFieldValue("benevole", value)} />
          <InlineError message={errors.benevole} fieldId="benevole" />
        </Field>

        <Field>
          <Label mb={1} htmlFor="estimationEtp">
            {"Estimation de l'activité en équivalent temps plein (ETP)"}
          </Label>
          <Select
            placeholder=""
            id="estimationEtp"
            instanceId={"estimationEtp"}
            name="estimationEtp"
            value={findOption(INTERVALLE_ETP_OPTIONS, values.estimationEtp)}
            hasError={!!errors.estimationEtp}
            onChange={option => setFieldValue("estimationEtp", option.value)}
            options={INTERVALLE_ETP_OPTIONS}
          />
          <InlineError message={errors.estimationEtp} fieldId="estimationEtp" />
        </Field>
      </Box>
      <Box>
        <Field>
          <Label mb={1}>{"Exercez-vous avec un secretariat spécialisé ?"}</Label>
          <YesNoComboBox
            name="secretaireSpecialise"
            onChange={value => {
              setFieldValue("secretaireSpecialise", value);
              if (!value) {
                setFieldValue("secretaireSpecialiseEtp", "");
              }
            }}
          />
          <InlineError message={errors.secretaireSpecialise} fieldId="secretaireSpecialise" />
        </Field>

        {values.secretaireSpecialise && (
          <Field>
            <Label mb={1} htmlFor="secretaireSpecialiseEtp">
              {"Estimation de l'activité en ETP du secrétariat spécialisé"}
            </Label>
            <Input
              placeholder=""
              id="secretaireSpecialiseEtp"
              name="secretaireSpecialiseEtp"
              value={values.secretaireSpecialiseEtp}
              hasError={!!errors.secretaireSpecialiseEtp}
              onChange={handleChange}
              type="number"
            />
            <InlineError
              message={errors.secretaireSpecialiseEtp}
              fieldId="secretaireSpecialiseEtp"
            />
          </Field>
        )}

        <Field>
          <Label mb={1}>{"Exercez-vous votre activité dans un local professionnnel ?"}</Label>
          <YesNoComboBox
            name="localProfessionnel"
            onChange={value => setFieldValue("localProfessionnel", value)}
          />
          <InlineError message={errors.localProfessionnel} fieldId="localProfessionnel" />
        </Field>
      </Box>
      <Box>
        <Field>
          <Label mb={1} htmlFor="cumulPrepose">
            {"Situation de cumul en tant que préposé d'établissement"}
          </Label>
          <YesNoComboBox
            name="cumulPrepose"
            onChange={value => {
              setFieldValue("cumulPrepose", value);
              if (!value) {
                setFieldValue("cumulPreposeEtp", "");
              }
            }}
          />
          <InlineError message={errors.cumulPrepose} fieldId="cumulPrepose" />
        </Field>
        {values.cumulPrepose && (
          <Field>
            <Label mb={1} htmlFor="cumulPreposeEtp">
              {"ETP consacré au cumul en tant que préposé"}
            </Label>
            <Select
              instanceId={"cumulPreposeEtp"}
              id="cumulPreposeEtp"
              name="cumulPreposeEtp"
              placeholder="ETP consacré au cumul en tant que préposé"
              value={findOption(INTERVALLE_ETP_OPTIONS, values.cumulPreposeEtp)}
              hasError={!!errors.cumulPreposeEtp}
              onChange={({ value }) => setFieldValue("cumulPreposeEtp", value)}
              options={INTERVALLE_ETP_OPTIONS}
            />
            <InlineError message={errors.cumulPreposeEtp} fieldId="cumulPreposeEtp" />
          </Field>
        )}
      </Box>
      <Box>
        <Field>
          <Label mb={1} htmlFor="cumulDelegueService">
            {"Situation de cumul en tant que délégué d'un service"}
          </Label>
          <YesNoComboBox
            name="cumulDelegueService"
            onChange={value => {
              setFieldValue("cumulDelegueService", value);
              if (!value) {
                setFieldValue("cumulDelegueServiceEtp", "");
              }
            }}
          />
          <InlineError message={errors.cumulDelegueService} fieldId="cumulDelegueService" />
        </Field>
        {values.cumulDelegueService && (
          <Field>
            <Label mb={1} htmlFor="cumulDelegueServiceEtp">
              {"ETP consacré au cumul en tant que délégué d'un service mandataire"}
            </Label>
            <Select
              placeholder=""
              instanceId={"cumulDelegueServiceEtp"}
              id="cumulDelegueServiceEtp"
              name="cumulDelegueServiceEtp"
              value={findOption(INTERVALLE_ETP_OPTIONS, values.cumulDelegueServiceEtp)}
              hasError={!!errors.cumulDelegueServiceEtp}
              onChange={({ value }) => {
                setFieldValue("cumulDelegueServiceEtp", value);
              }}
              options={INTERVALLE_ETP_OPTIONS}
            />
            <InlineError message={errors.cumulDelegueServiceEtp} fieldId="cumulDelegueServiceEtp" />
          </Field>
        )}
        <Field>
          <Label mb={1}>
            {"Votre activité de mandataire a-t-elle a-t-elle débuté avant 2009 ?"}
          </Label>
          <YesNoComboBox
            name="debutActiviteAvant2009"
            onChange={value => {
              setFieldValue("debutActiviteAvant2009", value);
              if (!value) {
                setFieldValue("anneeDebutActivite", "");
              }
            }}
          />
          <InlineError message={errors.debutActiviteAvant2009} fieldId="debutActiviteAvant2009" />
        </Field>

        {values.debutActiviteAvant2009 && (
          <Field>
            <Label mb={1} htmlFor={"anneeDebutActivite"}>
              {"Année de début de votre activité"}
            </Label>
            <Input
              placeholder=""
              value={values.anneeDebutActivite}
              id="anneeDebutActivite"
              name="anneeDebutActivite"
              hasError={!!errors.anneeDebutActivite}
              onChange={handleChange}
            />
            <InlineError message={errors.anneeDebutActivite} fieldId="anneeDebutActivite" />
          </Field>
        )}
      </Box>
      <EnqueteStepperButtons goToPrevPage={goToPrevPage} />
    </form>
  );
};

export default EnqueteIndividuelInformationsForm;
