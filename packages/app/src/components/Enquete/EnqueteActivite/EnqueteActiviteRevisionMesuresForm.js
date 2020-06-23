import { Heading1, Heading3 } from "@emjpm/ui";
import React from "react";
import { Box, Flex, Text } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput, parseFormInt } from "../../../util";
import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

// schéma identique à enqueteActiviteStatus côté hasura action
const validationSchema = yup.object(
  [
    "revisions_main_levee",
    "revisions_masp",
    "revisions_reconduction",
    "revisions_changement",
    "revisions_autre",
  ].reduce((acc, attrName) => {
    acc[attrName] = yup.number().min(0).integer().nullable();
    return acc;
  }, [])
);

function dataToForm(data) {
  return {
    revisionsMainLevee: formatFormInput(data.revisionsMainLevee),
    revisionsMasp: formatFormInput(data.revisionsMasp),
    revisionsReconduction: formatFormInput(data.revisionsReconduction),
    revisionsChangement: formatFormInput(data.revisionsChangement),
    revisionsAutre: formatFormInput(data.revisionsAutre),
  };
}
function formToData(values) {
  return {
    revisionsMainLevee: parseFormInt(values.revisionsMainLevee),
    revisionsMasp: parseFormInt(values.revisionsMasp),
    revisionsReconduction: parseFormInt(values.revisionsReconduction),
    revisionsChangement: parseFormInt(values.revisionsChangement),
    revisionsAutre: parseFormInt(values.revisionsAutre),
  };
}
export const EnqueteActiviteRevisionMesuresForm = (props) => {
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
    <Box
      sx={{
        strong: {
          color: "primary",
        },
      }}
      as="form"
      onSubmit={submitForm}
    >
      <Box textAlign="center" mb={"50px"}>
        <Heading1 mb={1}>{"Votre activité en 2019"}</Heading1>
        <Text
          sx={{
            color: "titleSecondary",
            fontWeight: "bold",
          }}
        >
          Les données à remplir ci-dessous sont celles au <strong>31/12</strong>
        </Text>
      </Box>
      <Heading3>Révisions de mesures</Heading3>

      <Flex mt={4}>
        <Flex alignItems="center" flex={1 / 2}>
          <EnqueteFormInputField
            id="revisionsMainLevee"
            label="Main levées (hors MASP)"
            size="medium"
            type="number"
            min={0}
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Flex>

        <Flex alignItems="center" flex={1 / 2}>
          <EnqueteFormInputField
            id="revisionsChangement"
            label="Changement"
            size="medium"
            type="number"
            min={0}
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Flex>
      </Flex>
      <Flex mt={4}>
        <Flex alignItems="center" flex={1 / 2}>
          <EnqueteFormInputField
            id="revisionsMasp"
            label="MASP"
            size="medium"
            type="number"
            min={0}
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Flex>
        <Flex alignItems="center" flex={1 / 2}>
          <EnqueteFormInputField
            id="revisionsAutre"
            label="Autres"
            size="medium"
            type="number"
            min={0}
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Flex>
      </Flex>
      <Flex mt={4}>
        <Flex alignItems="center" flex={1 / 2}>
          <EnqueteFormInputField
            id="revisionsReconduction"
            label="Reconduction"
            size="medium"
            type="number"
            min={0}
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
          />
        </Flex>

        <Flex flex={1 / 2} />
      </Flex>

      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </Box>
  );
};

export default EnqueteActiviteRevisionMesuresForm;
