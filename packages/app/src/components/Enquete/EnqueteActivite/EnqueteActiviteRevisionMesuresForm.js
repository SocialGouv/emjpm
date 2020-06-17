import { Heading1, Heading3 } from "@emjpm/ui";
import { Input, Label } from "@rebass/forms";
import React from "react";
import { Box, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput, parseFormInt } from "../../../util";
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

  const { submitForm, handleChange, values, errors, showError, submit } = useEnqueteForm({
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

  return (
    <Box>
      <form onSubmit={submitForm}>
        <Heading1 textAlign="center" mb={"80px"}>
          {"Votre activité"}
        </Heading1>

        <Heading3>Révisions de mesures</Heading3>

        <Flex mt={4}>
          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>{`Mainlevées (hors MASP) :`}</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="revisionsMainLevee"
              value={values.revisionsMainLevee}
              hasError={showError && !!errors.revisionsMainLevee}
              onChange={handleChange}
              type="number"
            />
          </Flex>

          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>Changement :</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="revisionsChangement"
              value={values.revisionsChangement}
              hasError={showError && !!errors.revisionsChangement}
              onChange={handleChange}
              type="number"
            />
          </Flex>
        </Flex>
        <Flex mt={4}>
          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>MASP :</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="revisionsMasp"
              value={values.revisionsMasp}
              hasError={showError && !!errors.revisionsMasp}
              onChange={handleChange}
              type="number"
            />
          </Flex>

          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>Autres :</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="revisionsAutre"
              value={values.revisionsAutre}
              hasError={showError && !!errors.revisionsAutre}
              onChange={handleChange}
              type="number"
            />
          </Flex>
        </Flex>
        <Flex mt={4}>
          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>Reconduction :</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="revisionsReconduction"
              value={values.revisionsReconduction}
              hasError={showError && !!errors.revisionsReconduction}
              onChange={handleChange}
              type="number"
            />
          </Flex>

          <Flex flex={1 / 2} />
        </Flex>

        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </form>
    </Box>
  );
};

export default EnqueteActiviteRevisionMesuresForm;
