import { Button, Field, Heading4, InlineError, Input, Select } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { INTERVALLE_ETP_OPTIONS, YES_NO_OPTIONS } from "../../constants/mandataire";
import { mandataireEnqueteIndividuelSchema } from "../../lib/validationSchemas";
import { findOption } from "../../util/option/OptionUtil";

export const MandataireEnqueteIndividuelForm = props => {
  const { enquete = {} } = props;
  const {
    estimation_etp,
    secretaire_specialise,
    secretaire_specialise_etp,
    cumul_prepose,
    cumul_prepose_etp,
    cumul_delegue_service,
    cumul_delegue_service_etp,
    debut_activite_avant_2009,
    annee_debut_activite,
    annee_agrement,
    cnc_mjpm_annee_obtention,
    cnc_mjpm_heure_formation,
    cnc_maj_annee_obtention,
    cnc_maj_heure_formation,
    cnc_dpf_annee_obtention,
    cnc_dpf_heure_formation,
    niveau_qualification,
    niveau_qualification_secretaire_spe
  } = enquete;

  const { isSubmitting, handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    validationSchema: mandataireEnqueteIndividuelSchema,
    initialValues: {
      estimationEtp: estimation_etp,
      secretaireSpecialise: secretaire_specialise || false,
      secretaireSpecialiseEtp: secretaire_specialise_etp || "",
      cumulPrepose: cumul_prepose || false,
      cumulPreposeEtp: cumul_prepose_etp || "",
      cumulDelegueService: cumul_delegue_service || false,
      cumulDelegueServiceEtp: cumul_delegue_service_etp,
      debutActiviteAvant2009: debut_activite_avant_2009 || false,
      anneeDebutActivite: annee_debut_activite || "",
      anneeAgrement: annee_agrement || "",
      cncMjpmAnneeObtention: cnc_mjpm_annee_obtention || "",
      cncMjpmHeureFormation: cnc_mjpm_heure_formation || "",
      cncMajAnneeObtention: cnc_maj_annee_obtention || "",
      cncMajHeureFormation: cnc_maj_heure_formation || "",
      cncDpfAnneeObtention: cnc_dpf_annee_obtention || "",
      cncDpfHeureFormation: cnc_dpf_heure_formation || "",
      niveauQualification: niveau_qualification || "",
      niveauQualificationSecretaireSpe: niveau_qualification_secretaire_spe || ""
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <Heading4 mb={1}>{"Activité de mandataire individuel"}</Heading4>
        <Field>
          <Label mb={1} htmlFor="estimationEtp">
            {"Estimation de l'activité de mandataire individuel en ETP"}
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
          <Label mb={1} htmlFor="secretaireSpecialise">
            {"Exercez-vous avec un secretariat spécialisé ?"}
          </Label>
          <Select
            placeholder=""
            instanceId={"secretaireSpecialise"}
            id="secretaireSpecialise"
            name="secretaireSpecialise"
            value={findOption(YES_NO_OPTIONS, values.secretaireSpecialise)}
            hasError={!!errors.secretaireSpecialise}
            onChange={({ value }) => {
              setFieldValue("secretaireSpecialise", value);
              if (!value) {
                setFieldValue("secretaireSpecialiseEtp", "");
              }
            }}
            options={YES_NO_OPTIONS}
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
      </Box>
      <Box>
        <Heading4 mb={1}>{"Cumul en tant que préposé d'établissement"}</Heading4>
        <Field>
          <Label mb={1} htmlFor="cumulPrepose">
            {"Situation de cumul en tant que préposé d'établissement"}
          </Label>
          <Select
            placeholder=""
            id="cumulPrepose"
            instanceId={"cumulPrepose"}
            name="cumulPrepose"
            value={findOption(YES_NO_OPTIONS, values.cumulPrepose)}
            hasError={!!errors.cumulPrepose}
            onChange={({ value }) => {
              setFieldValue("cumulPrepose", value);
              if (!value) {
                setFieldValue("cumulPreposeEtp", "");
              }
            }}
            options={YES_NO_OPTIONS}
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
        <Heading4 mb={1}>{"Cumul en tant que délégué d'une service"}</Heading4>
        <Field>
          <Label mb={1} htmlFor="cumulDelegueService">
            {"Situation de cumul en tant que délégué d'une service"}
          </Label>

          <Select
            instanceId={"cumulDelegueService"}
            placeholder=""
            id="cumulDelegueService"
            name="cumulDelegueService"
            value={findOption(YES_NO_OPTIONS, values.cumulDelegueService)}
            hasError={!!errors.cumulDelegueService}
            onChange={({ value }) => {
              console.log("value", value);
              setFieldValue("cumulDelegueService", value);
              if (!value) {
                setFieldValue("cumulDelegueServiceEtp", "");
              }
            }}
            options={YES_NO_OPTIONS}
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

        <Heading4 pb={1}>{`Début de votre activité`}</Heading4>
        <Field>
          <Label mb={1}>
            {"Votre activité de mandataire a-t-elle a-t-elle débuté avant 2009 ?"}
          </Label>
          <Select
            placeholder=""
            instanceId={"debutActiviteAvant2009"}
            id="debutActiviteAvant2009"
            name="debutActiviteAvant2009"
            value={findOption(YES_NO_OPTIONS, values.debutActiviteAvant2009)}
            hasError={!!errors.debutActiviteAvant2009}
            onChange={({ value }) => {
              console.log("change debutActiviteAvant2009", value);
              setFieldValue("debutActiviteAvant2009", value);
              if (!value) {
                setFieldValue("anneeDebutActivite", "");
              }
            }}
            options={YES_NO_OPTIONS}
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
      <Box>
        <Heading4 pb={1}>{`Votre agrément`}</Heading4>
        <Field>
          <Label mb={1} htmlFor={"anneeAgrement"}>
            {"Année d'obtention de votre agrément"}
          </Label>
          <Input
            type="number"
            placeholder=""
            value={values.anneeAgrement}
            id="anneeAgrement"
            name="anneeAgrement"
            hasError={!!errors.anneeAgrement}
            onChange={handleChange}
          />
          <InlineError message={errors.anneeAgrement} fieldId="anneeAgrement" />
        </Field>
      </Box>

      <Box>
        <Heading4 mb={1}>{"CNC MJPM"}</Heading4>
        <Field>
          <Label mb={1} htmlFor={"cncMjpmAnneeObtention"}>
            {"Année d'obtention du CNC MJPM"}
          </Label>
          <Input
            id="cncMjpmAnneeObtention"
            name="cncMjpmAnneeObtention"
            placeholder=""
            type="text"
            value={values.cncMjpmAnneeObtention}
            onChange={handleChange}
            hasError={!!errors.cncMjpmAnneeObtention}
          />
          <InlineError message={errors.cncMjpmAnneeObtention} fieldId="cncMjpmAnneeObtention" />
        </Field>
        <Field>
          <Label mb={1} htmlFor={"cncMjpmHeureFormation"}>
            {"Nombre d'heures de formation dans le cadre du CNC MJPM (hors stage)"}
          </Label>
          <Input
            id="cncMjpmHeureFormation"
            name="cncMjpmHeureFormation"
            placeholder=""
            type="text"
            value={values.cncMjpmHeureFormation}
            onChange={handleChange}
            hasError={!!errors.cncMjpmHeureFormation}
          />
          <InlineError message={errors.cncMjpmHeureFormation} fieldId="cncMjpmHeureFormation" />
        </Field>
      </Box>
      <Box>
        <Heading4 mb={1}>{"CNC MAJ"}</Heading4>

        <Field>
          <Label mb={1} htmlFor={"cncMajAnneeObtention"}>
            {"Année d'obtention du CNC MAJ"}
          </Label>
          <Input
            id="cncMajAnneeObtention"
            name="cncMajAnneeObtention"
            placeholder=""
            type="text"
            value={values.cncMajAnneeObtention}
            hasError={!!errors.cncMajAnneeObtention}
            onChange={event => {
              handleChange(event);
              if (!values.cncMajAnneeObtention) {
                setFieldValue("cncMajHeureFormation", "");
              }
            }}
          />
          <InlineError message={errors.cncMajAnneeObtention} fieldId="cncMajAnneeObtention" />
        </Field>

        {values.cncMajAnneeObtention && !errors.cncMajAnneeObtention && (
          <Field>
            <Label mb={1} htmlFor={"cncMajHeureFormation"}>
              {"Nombre d'heures de formation dans le cadre du CNC MAJ (hors stage)"}
            </Label>
            <Input
              id="cncMajHeureFormation"
              name="cncMajHeureFormation"
              placeholder=""
              type="text"
              hasError={!!errors.cncMajHeureFormation}
              value={values.cncMajHeureFormation}
              onChange={handleChange}
            />
            <InlineError message={errors.cncMajHeureFormation} fieldId="cncMajHeureFormation" />
          </Field>
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"CNC DPF"}</Heading4>
        <Field>
          <Label mb={1} htmlFor={"cncDpfAnneeObtention"}>
            {"Année d'obtention du CNC DPF"}
          </Label>
          <Input
            id="cncDpfAnneeObtention"
            name="cncDpfAnneeObtention"
            hasError={!!errors.cncDpfAnneeObtention}
            placeholder=""
            type="text"
            value={values.cncDpfAnneeObtention}
            onChange={event => {
              handleChange(event);
              if (!values.cncDpfAnneeObtention) {
                setFieldValue("cncDpfHeureFormation", "");
              }
            }}
          />
          <InlineError message={errors.cncDpfAnneeObtention} fieldId="cncDpfAnneeObtention" />
        </Field>

        {values.cncDpfAnneeObtention && !errors.cncDpfAnneeObtention && (
          <Field>
            <Label mb={1} htmlFor={"cncDpfHeureFormation"}>
              {"Nombre d'heures de formation dans le cadre du CNC DPF"}
            </Label>
            <Input
              id="cncDpfHeureFormation"
              name="cncDpfHeureFormation"
              placeholder=""
              type="text"
              value={values.cncDpfHeureFormation}
              onChange={handleChange}
              hasError={!!errors.cncDpfHeureFormation}
            />
            <InlineError message={errors.cncDpfHeureFormation} fieldId="cncDpfHeureFormation" />
          </Field>
        )}
      </Box>
      <Box>
        <Heading4 mb={1}>{"Niveau de qualification"}</Heading4>

        <Field>
          <Label mb={1} htmlFor={"niveauQualification"}>
            {"Niveau de qualification de 1 à 5"}
          </Label>
          <Input
            id="niveauQualification"
            name="niveauQualification"
            placeholder=""
            type="number"
            min={1}
            max={5}
            value={values.niveauQualification}
            hasError={!!errors.niveauQualification}
            onChange={handleChange}
          />
          <InlineError message={errors.niveauQualification} fieldId="niveauQualification" />
        </Field>

        <Field>
          <Label mb={1} htmlFor={"niveauQualification"}>
            {"Niveau de qualification du secretariat spécialisé de 1 à 5"}
          </Label>
          <Input
            id="niveauQualificationSecretaireSpe"
            name="niveauQualificationSecretaireSpe"
            min={1}
            max={5}
            placeholder=""
            type="number"
            value={values.niveauQualificationSecretaireSpe}
            hasError={!!errors.niveauQualificationSecretaireSpe}
            onChange={handleChange}
          />
          <InlineError
            message={errors.niveauQualificationSecretaireSpe}
            fieldId="niveauQualificationSecretaireSpe"
          />
        </Field>
      </Box>

      <Flex alignItems="center" justifyContent="flex-end">
        <Box>
          <Button isLoading={isSubmitting} type="submit">
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default MandataireEnqueteIndividuelForm;
