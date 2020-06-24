import { Heading1, Heading3 } from "@emjpm/ui";
import React from "react";
import { Box, Text } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput, parseFormInput } from "../../../util";
import { EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

function dataToForm(data) {
  return {
    departement: formatFormInput(data.departement),
    region: formatFormInput(data.region),
    nom: formatFormInput(data.nom),
  };
}

function formToData(data) {
  return {
    nom: parseFormInput(data.nom),
    departement: parseFormInput(data.departement),
    region: parseFormInput(data.region),
  };
}

export const EnqueteServiceInformationsForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const validationSchema = yup.object().shape({});

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
      <Heading1 textAlign="center" mb={"50px"}>
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

        <Text>{"Type d'organisme gestionnaire :"}</Text>

        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </Box>
    </form>
  );
};

export default EnqueteServiceInformationsForm;
