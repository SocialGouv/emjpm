import { Heading1, Heading3 } from "@emjpm/ui";
import React from "react";
import { Box, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput, parseFormFloat } from "../../../util";
import { EnqueteFormFieldErrorMessage, EnqueteFormInputField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

function dataToForm(data) {
  return {
    charges_personnel: formatFormInput(data.charges_personnel),
    charges_preposes: formatFormInput(data.charges_preposes),
    charges_fonctionnement: formatFormInput(data.charges_fonctionnement),
    produits_bareme_prelevements: formatFormInput(data.produits_bareme_prelevements),
    autre_produits: formatFormInput(data.autre_produits),
    financement_public: formatFormInput(data.financement_public),
    aide_sociale_conseil_departemental: formatFormInput(data.aide_sociale_conseil_departemental),
  };
}

function formToData(values) {
  return {
    aide_sociale_conseil_departemental: parseFormFloat(values.aide_sociale_conseil_departemental),
    autre_produits: parseFormFloat(values.autre_produits),
    charges_fonctionnement: parseFormFloat(values.charges_fonctionnement),
    charges_personnel: parseFormFloat(values.charges_personnel),
    charges_preposes: parseFormFloat(values.charges_preposes),
    financement_public: parseFormFloat(values.financement_public),
    produits_bareme_prelevements: parseFormFloat(values.produits_bareme_prelevements),
  };
}

// schéma identique à enquetePreposeFinancementStatus côté hasura action
const validationSchema = yup.object().shape({
  charges_personnel: yup.number().min(0).nullable(),
  charges_preposes: yup
    .number()
    .min(0)
    .nullable()
    .test(
      "charges-preposes-personnel",
      "La valeur de charges préposés ne peut être supérieure à la charge personnel total.",
      function (value) {
        const chargePersonnel = this.parent["charges_personnel"] | 0;
        return chargePersonnel >= (value | 0);
      }
    ),
  charges_fonctionnement: yup.number().min(0).nullable(),
  produits_bareme_prelevements: yup.number().min(0).nullable(),
  autre_produits: yup.number().min(0).nullable(),
  financement_public: yup.number().min(0).nullable(),
  aide_sociale_conseil_departemental: yup.number().min(0).nullable(),
});

export const EnquetePreposeFinancementForm = (props) => {
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
      <Heading1 textAlign="center" mb={"50px"}>
        {"Financement en 2019"}
      </Heading1>
      <Heading3 mb={2}>{"Charges"}</Heading3>
      <Flex>
        <Box width={1 / 3}>
          <EnqueteFormInputField
            id="charges_personnel"
            label="Charges de personnel"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
            size="medium"
            disableErrorMessage={true} // error displayed below
          />
        </Box>
        <Box width={1 / 3}>
          <EnqueteFormInputField
            id="charges_preposes"
            label="dont préposés"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
            size="medium"
            disableErrorMessage={true} // error displayed below
          />
        </Box>
        <Box width={1 / 3}>
          <EnqueteFormInputField
            id="charges_fonctionnement"
            label="Charges de fonctionnement"
            enqueteContext={enqueteContext}
            enqueteForm={enqueteForm}
            type="number"
            size="medium"
            disableErrorMessage={true} // error displayed below
          />
        </Box>
      </Flex>
      <Box>
        <EnqueteFormFieldErrorMessage enqueteForm={enqueteForm} id="charges_personnel" />
        <EnqueteFormFieldErrorMessage enqueteForm={enqueteForm} id="charges_preposes" />
        <EnqueteFormFieldErrorMessage enqueteForm={enqueteForm} id="charges_fonctionnement" />
      </Box>

      <Box mt={"50px"}>
        <Heading3 mb={2}>{"Produits"}</Heading3>
        <Flex>
          <Box width={1 / 2}>
            <EnqueteFormInputField
              id="produits_bareme_prelevements"
              label="Issus de l'application du barème de prélèvements"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
              size="medium"
              disableErrorMessage={true} // error displayed below
            />
          </Box>
          <Box width={1 / 2}>
            <EnqueteFormInputField
              id="autre_produits"
              label="Issus de la participation des personnes (tarif hébergement)"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
              size="medium"
              disableErrorMessage={true} // error displayed below
            />
          </Box>
        </Flex>
        <Box>
          <EnqueteFormFieldErrorMessage
            enqueteForm={enqueteForm}
            id="produits_bareme_prelevements"
          />
          <EnqueteFormFieldErrorMessage enqueteForm={enqueteForm} id="autre_produits" />
        </Box>
        <Flex mt={4}>
          <Box width={1 / 2}>
            <EnqueteFormInputField
              id="financement"
              label="Financement public"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
              size="medium"
              disableErrorMessage={true} // error displayed below
            />
          </Box>
          <Box width={1 / 2}>
            <EnqueteFormInputField
              id="aide_sociale_conseil_departemental"
              label="dont aide sociale du conseil départemental"
              enqueteContext={enqueteContext}
              enqueteForm={enqueteForm}
              type="number"
              size="medium"
              disableErrorMessage={true} // error displayed below
            />
          </Box>
        </Flex>
        <Box />
      </Box>

      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </form>
  );
};

export default EnquetePreposeFinancementForm;
