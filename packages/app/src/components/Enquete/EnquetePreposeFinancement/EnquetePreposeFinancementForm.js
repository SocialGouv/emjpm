import { Heading1, Heading3, InlineError } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import React from "react";
import { Box, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormInput, parseFormFloat } from "../../../util";
import { SmallInput } from "../../Commons/SmallInput";
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

  const {
    submitForm,
    handleChange,
    handleBlur,
    values,
    errors,
    showError,
    submit,
  } = useEnqueteForm({
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
    <form onSubmit={submitForm}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Financement"}
      </Heading1>
      <Heading3>{"Charges"}</Heading3>
      <Flex>
        <Box width={1 / 2}>
          <Flex alignItems="center">
            <Label minWidth={"180px"} mr={4}>
              {"charges de personnel"}
            </Label>
            <SmallInput
              onChange={handleChange}
              onBlur={handleBlur}
              id="charges_personnel"
              name="charges_personnel"
              value={values.charges_personnel}
              width={100}
            />
          </Flex>
          {showError && (
            <InlineError message={errors.charges_personnel} fieldId={"charges_personnel"} />
          )}
        </Box>
        <Box width={1 / 2}>
          <Flex alignItems="center">
            <Label width={"180px"} mr={4}>
              {"dont préposés"}
            </Label>
            <SmallInput
              onChange={handleChange}
              onBlur={handleBlur}
              id="charges_preposes"
              name="charges_preposes"
              value={values.charges_preposes}
              width={100}
            />
          </Flex>
          {showError && (
            <InlineError message={errors.charges_preposes} fieldId={"charges_preposes"} />
          )}
        </Box>
      </Flex>
      <Flex mt={4}>
        <Box width={1 / 2}>
          <Flex alignItems="center">
            <Label minWidth={"180px"} mr={4}>
              {"charges de fonctionnement"}
            </Label>
            <SmallInput
              onChange={handleChange}
              onBlur={handleBlur}
              id="charges_fonctionnement"
              name="charges_fonctionnement"
              value={values.charges_fonctionnement}
              width={100}
            />
          </Flex>
          {showError && (
            <InlineError
              message={errors.charges_fonctionnement}
              fieldId={"charges_fonctionnement"}
            />
          )}
        </Box>
      </Flex>

      <Box mt={"50px"}>
        <Heading3>{"Produits"}</Heading3>
        <Flex>
          <Box width={1 / 2}>
            <Flex alignItems="center">
              <Label width={"180px"} mr={4}>
                {"issus de l'application du barème de prélèvements"}
              </Label>
              <SmallInput
                onChange={handleChange}
                onBlur={handleBlur}
                id="produits_bareme_prelevements"
                name="produits_bareme_prelevements"
                value={values.produits_bareme_prelevements}
                width={100}
              />
            </Flex>
            {showError && (
              <InlineError
                message={errors.produits_bareme_prelevements}
                fieldId={"produits_bareme_prelevements"}
              />
            )}
          </Box>
          <Box width={1 / 2}>
            <Flex alignItems="center">
              <Label width={"180px"} mr={4}>
                {"issus de la participation des personnes (tarif hébergement)"}
              </Label>
              <SmallInput
                onChange={handleChange}
                onBlur={handleBlur}
                id="autre_produits"
                name="autre_produits"
                value={values.autre_produits}
                width={100}
              />
            </Flex>
            {showError && (
              <InlineError message={errors.autre_produits} fieldId={"autre_produits"} />
            )}
          </Box>
        </Flex>
        <Flex mt={4}>
          <Box width={1 / 2}>
            <Flex alignItems="center">
              <Label width={"180px"} mr={4}>
                {"financement public"}
              </Label>
              <SmallInput
                onChange={handleChange}
                onBlur={handleBlur}
                id={"financement_public"}
                name={"financement_public"}
                value={values.financement_public}
                width={100}
              />
            </Flex>
            {showError && (
              <InlineError message={errors.financement_public} fieldId={"financement_public"} />
            )}
          </Box>
          <Box width={1 / 2}>
            <Flex alignItems="center">
              <Label width={"180px"} mr={4}>
                {"dont aide sociale du conseil départemental"}
              </Label>
              <SmallInput
                onChange={handleChange}
                onBlur={handleBlur}
                id="aide_sociale_conseil_departemental"
                name="aide_sociale_conseil_departemental"
                value={values.aide_sociale_conseil_departemental}
                width={100}
              />
            </Flex>
            {showError && (
              <InlineError
                message={errors.aide_sociale_conseil_departemental}
                fieldId={"aide_sociale_conseil_departemental"}
              />
            )}
          </Box>
        </Flex>
      </Box>

      <EnqueteStepperButtons submit={submit} disabled={loading} />
    </form>
  );
};

export default EnquetePreposeFinancementForm;
