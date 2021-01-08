import { Box, Flex, Text } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import yup from "~/lib/validationSchemas/yup";
import { Heading3 } from "~/ui";
import { formatFormInput, parseFormFloat, parseFormInt } from "~/util";

import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteFormFieldErrorMessage } from "../EnqueteForm/EnqueteFormFieldErrorMessage";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

// schema identique à enqueteAgrementsFormationsStatus (côté hasura actions)
export const validationSchema = yup.object().shape({
  cnc_annee_obtention: yup.number().positive().integer().required(),
  cnc_heures_formation: yup.number().positive().required(),
  informations_generales_secretaire_specialise_etp: yup.number().nullable(),
  niveau_qualification: yup.number().min(1).max(6).integer().required(),
  secretaire_specialise_etp_n1: yup.number().min(0).nullable(),
  secretaire_specialise_etp_n2: yup.number().min(0).nullable(),
  secretaire_specialise_etp_n3: yup.number().min(0).nullable(),
  secretaire_specialise_etp_n4: yup.number().min(0).nullable(),
  secretaire_specialise_etp_n5: yup.number().min(0).nullable(),
  secretaire_specialise_etp_n6: yup.number().min(0).nullable(),
});

function dataToForm(data) {
  return {
    cnc_annee_obtention: formatFormInput(data.cnc_annee_obtention),
    cnc_heures_formation: formatFormInput(data.cnc_heures_formation),
    informations_generales_secretaire_specialise_etp:
      data.informations_generales_secretaire_specialise_etp,
    niveau_qualification: formatFormInput(data.niveau_qualification),
    secretaire_specialise_etp_n1: formatFormInput(
      data.secretaire_specialise_etp_n1
    ),
    secretaire_specialise_etp_n2: formatFormInput(
      data.secretaire_specialise_etp_n2
    ),
    secretaire_specialise_etp_n3: formatFormInput(
      data.secretaire_specialise_etp_n3
    ),
    secretaire_specialise_etp_n4: formatFormInput(
      data.secretaire_specialise_etp_n4
    ),
    secretaire_specialise_etp_n5: formatFormInput(
      data.secretaire_specialise_etp_n5
    ),
    secretaire_specialise_etp_n6: formatFormInput(
      data.secretaire_specialise_etp_n6
    ),
  };
}

function formToData(data) {
  return {
    cnc_annee_obtention: parseFormInt(data.cnc_annee_obtention),
    cnc_heures_formation: parseFormInt(data.cnc_heures_formation),
    niveau_qualification: parseFormInt(data.niveau_qualification),
    secretaire_specialise_etp_n1: parseFormFloat(
      data.secretaire_specialise_etp_n1
    ),
    secretaire_specialise_etp_n2: parseFormFloat(
      data.secretaire_specialise_etp_n2
    ),
    secretaire_specialise_etp_n3: parseFormFloat(
      data.secretaire_specialise_etp_n3
    ),
    secretaire_specialise_etp_n4: parseFormFloat(
      data.secretaire_specialise_etp_n4
    ),
    secretaire_specialise_etp_n5: parseFormFloat(
      data.secretaire_specialise_etp_n5
    ),
    secretaire_specialise_etp_n6: parseFormFloat(
      data.secretaire_specialise_etp_n6
    ),
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
    data,
    dataToForm,
    dispatchEnqueteContextEvent,
    enqueteContext,
    formToData,
    loading,
    onSubmit,
    step,
    validationSchema,
  });
  const { submitForm, submit } = enqueteForm;
  return (
    <form onSubmit={submitForm}>
      <HeadingTitle textAlign="center" mb={"50px"}>
        {"Vos informations"}
      </HeadingTitle>
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
          {
            "Activité des secrétaires spécialisés par niveau en équivalent temps plein (ETP)"
          }
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
