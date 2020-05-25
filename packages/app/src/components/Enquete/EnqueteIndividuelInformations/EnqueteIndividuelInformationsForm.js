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
    departement,
    region,
    nom,
    anciennete,
    benevole,
    estimation_etp,
    forme_juridique,
    local_professionnel,
    exerce_secretaires_specialises,
    secretaire_specialise_etp,
    tranche_age,
    sexe
  } = data;

  const { handleSubmit, handleChange, values, errors, setFieldValue } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    // validationSchema: mandataireEnqueteIndividuelSchema,
    initialValues: {
      departement: departement || "",
      region: region || "",
      nom: nom || "",
      benevole: benevole || false,
      anciennete: anciennete || "",
      estimation_etp: estimation_etp || "",
      forme_juridique: forme_juridique || "",
      exerce_secretaires_specialises: exerce_secretaires_specialises || false,
      secretaire_specialise_etp: secretaire_specialise_etp || "",
      local_professionnel: local_professionnel || false,
      tranche_age,
      sexe
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
          <Label mb={1} htmlFor="departement">
            {"Département"}
          </Label>
          <Input
            placeholder=""
            id="departement"
            name="departement"
            value={values.departement}
            hasError={!!errors.departement}
            onChange={handleChange}
            type="text"
          />
          <InlineError message={errors.departement} fieldId="departement" />
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
            hasError={!!errors.region}
            onChange={handleChange}
            type="text"
          />
          <InlineError message={errors.region} fieldId="region" />
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
            hasError={!!errors.nom}
            onChange={handleChange}
            type="text"
          />
          <InlineError message={errors.nom} fieldId="nom" />
        </Field>

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
          <Label mb={1} htmlFor="sexe">
            {"Sexe"}
          </Label>
          <Select
            placeholder=""
            id="sexe"
            instanceId={"sexe"}
            name="sexe"
            value={findOption(ENQ_REP_INFO_MANDATAIRE_FORM.SEXE, values.sexe)}
            hasError={!!errors.sexe}
            onChange={option => setFieldValue("sexe", option.value)}
            options={ENQ_REP_INFO_MANDATAIRE_FORM.SEXE}
          />
          <InlineError message={errors.sexe} fieldId="sexe" />
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
            value={findOption(ENQ_REP_INFO_MANDATAIRE_FORM.ANCIENNETE, values.anciennete)}
            hasError={!!errors.anciennete}
            onChange={option => setFieldValue("anciennete", option.value)}
            options={ENQ_REP_INFO_MANDATAIRE_FORM.ANCIENNETE}
          />
          <InlineError message={errors.anciennete} fieldId="anciennete" />
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
            value={findOption(ENQ_REP_INFO_MANDATAIRE_FORM.TRANCHE_AGE, values.tranche_age)}
            hasError={!!errors.tranche_age}
            onChange={option => setFieldValue("tranche_age", option.value)}
            options={ENQ_REP_INFO_MANDATAIRE_FORM.TRANCHE_AGE}
          />
          <InlineError message={errors.tranche_age} fieldId="tranche_age" />
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
            defaultValue={"local_professionnel"}
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
