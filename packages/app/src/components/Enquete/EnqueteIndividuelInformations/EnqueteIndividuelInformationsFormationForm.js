import { Heading1, Heading3 } from "@emjpm/ui";
import React from "react";
import { Box, Flex, Text } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput, parseFormFloat, parseFormInt } from "../../../util";
import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteFormFieldErrorMessage } from "../EnqueteForm/EnqueteFormFieldErrorMessage";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

// schema identique à enqueteAgrementsFormationsStatus (côté hasura actions)
export const validationSchema = yup.object().shape({
  cnc_annee_obtention: yup.number().positive().integer().required(),
  cnc_heures_formation: yup.number().positive().required(),
  niveau_qualification: yup.number().min(1).max(6).integer().required(),
  secretaire_specialise_etp_n1: yup.number().min(0).nullable(),
  secretaire_specialise_etp_n2: yup.number().min(0).nullable(),
  secretaire_specialise_etp_n3: yup.number().min(0).nullable(),
  secretaire_specialise_etp_n4: yup.number().min(0).nullable(),
  secretaire_specialise_etp_n5: yup.number().min(0).nullable(),
  secretaire_specialise_etp_n6: yup.number().min(0).nullable(),
  informations_generales_secretaire_specialise_etp: yup
    .number()
    .nullable()
    .test(function (value) {
      if (value !== undefined && value !== null) {
        const etp1 = parseFormFloat(this.parent["secretaire_specialise_etp_n1"], 0);
        const etp2 = parseFormFloat(this.parent["secretaire_specialise_etp_n2"], 0);
        const etp3 = parseFormFloat(this.parent["secretaire_specialise_etp_n3"], 0);
        const etp4 = parseFormFloat(this.parent["secretaire_specialise_etp_n4"], 0);
        const etp5 = parseFormFloat(this.parent["secretaire_specialise_etp_n5"], 0);
        const etp6 = parseFormFloat(this.parent["secretaire_specialise_etp_n6"], 0);

        // deal with js number precision: 0.5+0.2+0.1 = 0.7999999999999999
        // https://stackoverflow.com/questions/1458633/how-to-deal-with-floating-point-number-precision-in-javascript#3439981
        const expectedTotal =
          Math.round(
            etp1 * 1000 + etp2 * 1000 + etp3 * 1000 + etp4 * 1000 + etp5 * 1000 + etp6 * 1000
          ) / 1000;

        if (expectedTotal !== value) {
          return this.createError({
            message: `La somme des ETP des secrétaires spécialisés par niveau (${expectedTotal}) ne correspond pas à la valeur "Estimation de l'activité en ETP du secrétariat spécialisé" renseignée dans l'onglet "Informations Générales" (${value})`,
            path: "informations_generales_secretaire_specialise_etp",
          });
        }
      }
      return true;
    }),
});

function dataToForm(data) {
  return {
    informations_generales_secretaire_specialise_etp:
      data.informations_generales_secretaire_specialise_etp,
    cnc_annee_obtention: formatFormInput(data.cnc_annee_obtention),
    cnc_heures_formation: formatFormInput(data.cnc_heures_formation),
    niveau_qualification: formatFormInput(data.niveau_qualification),
    secretaire_specialise_etp_n1: formatFormInput(data.secretaire_specialise_etp_n1),
    secretaire_specialise_etp_n2: formatFormInput(data.secretaire_specialise_etp_n2),
    secretaire_specialise_etp_n3: formatFormInput(data.secretaire_specialise_etp_n3),
    secretaire_specialise_etp_n4: formatFormInput(data.secretaire_specialise_etp_n4),
    secretaire_specialise_etp_n5: formatFormInput(data.secretaire_specialise_etp_n5),
    secretaire_specialise_etp_n6: formatFormInput(data.secretaire_specialise_etp_n6),
  };
}

function formToData(data) {
  return {
    cnc_annee_obtention: parseFormInt(data.cnc_annee_obtention),
    cnc_heures_formation: parseFormInt(data.cnc_heures_formation),
    niveau_qualification: parseFormInt(data.niveau_qualification),
    secretaire_specialise_etp_n1: parseFormFloat(data.secretaire_specialise_etp_n1),
    secretaire_specialise_etp_n2: parseFormFloat(data.secretaire_specialise_etp_n2),
    secretaire_specialise_etp_n3: parseFormFloat(data.secretaire_specialise_etp_n3),
    secretaire_specialise_etp_n4: parseFormFloat(data.secretaire_specialise_etp_n4),
    secretaire_specialise_etp_n5: parseFormFloat(data.secretaire_specialise_etp_n5),
    secretaire_specialise_etp_n6: parseFormFloat(data.secretaire_specialise_etp_n6),
  };
}

export const EnqueteIndividuelInformationsFormationForm = (props) => {
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
  const { submitForm, submit } = enqueteForm;
  return (
    <form onSubmit={submitForm}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Vos informations"}
      </Heading1>
      <Heading3>Formation</Heading3>
      <Box mt={4}>
        <EnqueteFormInputField
          id="cnc_annee_obtention"
          label="Année d'obtention du CNC"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          type="number"
          min={0}
        />
        <EnqueteFormInputField
          id="cnc_heures_formation"
          label="Nombre d'heures de formation dans le cadre du CNC (hors stage)"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          type="number"
          min={0}
        />
        <EnqueteFormInputField
          id="niveau_qualification"
          label="Niveau de qualification de 1 à 5"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          type="number"
          min={1}
          max={5}
        />
        <Text mt={7} mb={4} fontWeight="bold" color="#595959">
          {"Activité des secrétaires spécialisés par niveau en équivalent temps plein (ETP)"}
        </Text>
        <Flex mt={4}>
          <Flex alignItems="center" flex={1 / 2}>
            <EnqueteFormInputField
              id="secretaire_specialise_etp_n1"
              label="Secrétaires spécialisés niveau 1 (ETP)"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Flex>
          <Flex alignItems="center" flex={1 / 2}>
            <EnqueteFormInputField
              id="secretaire_specialise_etp_n2"
              label="Secrétaires spécialisés niveau 2 (ETP)"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Flex>
          <Flex alignItems="center" flex={1 / 2}>
            <EnqueteFormInputField
              id="secretaire_specialise_etp_n3"
              label="Secrétaires spécialisés niveau 3 (ETP)"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Flex>
        </Flex>
        <Flex mt={4}>
          <Flex alignItems="center" flex={1 / 2}>
            <EnqueteFormInputField
              id="secretaire_specialise_etp_n4"
              label="Secrétaires spécialisés niveau 4 (ETP)"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Flex>
          <Flex alignItems="center" flex={1 / 2}>
            <EnqueteFormInputField
              id="secretaire_specialise_etp_n5"
              label="Secrétaires spécialisés niveau 5 (ETP)"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Flex>
          <Flex alignItems="center" flex={1 / 2}>
            <EnqueteFormInputField
              id="secretaire_specialise_etp_n6"
              label="Secrétaires spécialisés niveau 6 (ETP)"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
            />
          </Flex>
        </Flex>

        <EnqueteFormFieldErrorMessage
          enqueteForm={enqueteForm}
          id="informations_generales_secretaire_specialise_etp"
        />
        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </Box>
    </form>
  );
};

export default EnqueteIndividuelInformationsFormationForm;
