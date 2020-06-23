import { Heading1, Heading3 } from "@emjpm/ui";
import React from "react";
import { Box, Text } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormBoolean, formatFormInput, parseFormFloat, parseFormInput } from "../../../util";
import { ENQ_REP_INFO_MANDATAIRE } from "../constants";
import {
  EnqueteFormInputField,
  EnqueteFormSelectField,
  EnqueteFormYesNoField,
} from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

// schema identique à enqueteInformationsMandatairesStatus (côté hasura actions)
const validationSchema = yup.object().shape({
  nom: yup.string().required(),
  departement: yup.string().required(),
  region: yup.string().required(),
  benevole: yup.boolean().required(),
  forme_juridique: yup.string().when("benevole", {
    is: false,
    then: yup.string().required(),
    otherwise: yup.string().nullable(),
  }),
  anciennete: yup.string().required(),
  estimation_etp: yup.string().required(),
  exerce_seul_activite: yup.boolean().required(),
  exerce_secretaires_specialises: yup
    .boolean()
    .required()
    .when("exerce_seul_activite", {
      is: true,
      then: yup
        .boolean()
        .required()
        .test(
          "equals-to-false",
          "Vous avez déclaré exercer seul une activité.",
          (value) => value === false
        ),
    }),
  secretaire_specialise_etp: yup.number().when("exerce_secretaires_specialises", {
    is: true,
    then: yup.number().positive().required(), // > 0
    otherwise: yup
      .number()
      .test(
        "empty-or-0",
        'Vous avez répondu "non" à la question précédente, donc ce champ doit être vide.',
        function (value) {
          return value == null; // 0, null, undefined
        }
      )
      .nullable(), // 0 or empty
  }),
  local_professionnel: yup.boolean().required(),
});

function dataToForm(data) {
  return {
    departement: formatFormInput(data.departement),
    region: formatFormInput(data.region),
    nom: formatFormInput(data.nom),
    benevole: formatFormBoolean(data.benevole),
    anciennete: formatFormInput(data.anciennete),
    estimation_etp: formatFormInput(data.estimation_etp),
    forme_juridique: formatFormInput(data.forme_juridique),
    exerce_seul_activite: formatFormBoolean(data.exerce_seul_activite),
    exerce_secretaires_specialises: formatFormBoolean(data.exerce_secretaires_specialises),
    secretaire_specialise_etp: formatFormInput(data.secretaire_specialise_etp),
    local_professionnel: formatFormBoolean(data.local_professionnel),
    tranche_age: data.tranche_age,
    sexe: data.sexe,
  };
}

function formToData(data) {
  return {
    nom: parseFormInput(data.nom),
    departement: parseFormInput(data.departement),
    region: parseFormInput(data.region),
    sexe: parseFormInput(data.sexe),
    tranche_age: parseFormInput(data.tranche_age),
    anciennete: parseFormInput(data.anciennete),
    benevole: parseFormInput(data.benevole),
    estimation_etp: parseFormInput(data.estimation_etp),
    forme_juridique: parseFormInput(data.forme_juridique),
    local_professionnel: parseFormInput(data.local_professionnel),
    exerce_seul_activite: parseFormInput(data.exerce_seul_activite),
    exerce_secretaires_specialises: parseFormInput(data.exerce_secretaires_specialises),
    secretaire_specialise_etp: parseFormFloat(data.secretaire_specialise_etp),
  };
}

export const EnqueteIndividuelInformationsMandataireForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const enqueteForm = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm,
    formToData,
    loading,
  });

  const { submitForm, values, errors, submit } = enqueteForm;

  return (
    <form onSubmit={submitForm}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Vos informations"}
      </Heading1>
      <Heading3>Informations générales</Heading3>
      <Box mt={4}>
        <EnqueteFormInputField
          id="departement"
          label="Département"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />
        <EnqueteFormInputField
          id="region"
          label="Région"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />
        <EnqueteFormInputField
          id="nom"
          label="Nom du mandataire"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <Text mt={7} mb={4} fontWeight="bold" color="#595959">
          STATUT
        </Text>

        <EnqueteFormYesNoField
          id={`benevole`}
          label="Exercez-vous cette activité à titre bénévole ?"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        {values.benevole === false && (
          <EnqueteFormSelectField
            id="forme_juridique"
            label="Forme juridique de votre entreprise"
            options={ENQ_REP_INFO_MANDATAIRE.FORME_JURIDIQUE.byKey}
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        )}

        <EnqueteFormSelectField
          id="sexe"
          label="Sexe"
          options={ENQ_REP_INFO_MANDATAIRE.SEXE.byKey}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <EnqueteFormSelectField
          id="anciennete"
          label="Ancienneté dans la fonction de MJPM"
          options={ENQ_REP_INFO_MANDATAIRE.ANCIENNETE.byKey}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <EnqueteFormSelectField
          id="tranche_age"
          label="Tranche d'âge dans laquelle vous vous situez"
          options={ENQ_REP_INFO_MANDATAIRE.TRANCHE_AGE.byKey}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <Text mt={7} mb={4} fontWeight="bold" color="#595959">
          {"CONDITIONS D'EXERCICE DE L'ACTIVITE"}
        </Text>
        <EnqueteFormYesNoField
          id={`exerce_seul_activite`}
          label="Exercez-vous seul l'activité ?"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />
        <EnqueteFormSelectField
          id="estimation_etp"
          label="Estimation de l'activité en équivalent temps plein (ETP)"
          options={ENQ_REP_INFO_MANDATAIRE.ESTIMATION_ETP.byKey}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />
      </Box>
      <Box>
        <EnqueteFormYesNoField
          id={`exerce_secretaires_specialises`}
          label="Exercez-vous avec un secrétariat spécialisé ?"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        {(values.exerce_secretaires_specialises || !!errors.secretaire_specialise_etp) && (
          <EnqueteFormInputField
            id="secretaire_specialise_etp"
            label="Estimation de l'activité en ETP du secrétariat spécialisé"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
          />
        )}
        <EnqueteFormYesNoField
          id={`local_professionnel`}
          label="Exercez-vous votre activité dans un local professionnnel ?"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />
      </Box>
      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </form>
  );
};

export default EnqueteIndividuelInformationsMandataireForm;
