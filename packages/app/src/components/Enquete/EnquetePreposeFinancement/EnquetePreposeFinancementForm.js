import { Heading1, Heading3, InlineError } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React, { useEffect, useMemo } from "react";
import { Box, Flex } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { SmallInput } from "../../Commons/SmallInput";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

function mapDataPropsToFormValues(data) {
  return {
    charges_personnel: data.charges_personnel || "",
    charges_preposes: data.charges_preposes || "",
    charges_fonctionnement: data.charges_fonctionnement || "",
    produits_bareme_prelevements: data.produits_bareme_prelevements || "",
    autre_produits: data.autre_produits || "",
    financement_public: data.financement_public || "",
    aide_sociale_conseil_departemental: data.aide_sociale_conseil_departemental || ""
  };
}

// schéma identique à enquetePreposeFinancementStatus côté hasura action
const validationSchema = yup.object().shape({
  charges_personnel: yup
    .number()
    .min(0)
    .required(),
  charges_preposes: yup
    .number()
    .min(0)
    .required()
    .test(
      "charges-preposes-personnel",
      "La valeur de charges préposés ne peut être supérieure à la charge personnel total.",
      function(value) {
        const chargePersonnel = this.parent["charges_personnel"] | 0;
        return chargePersonnel >= (value | 0);
      }
    ),
  charges_fonctionnement: yup
    .number()
    .min(0)
    .required(),
  produits_bareme_prelevements: yup
    .number()
    .min(0)
    .required(),
  autre_produits: yup
    .number()
    .min(0)
    .required(),
  financement_public: yup
    .number()
    .min(0)
    .required(),
  aide_sociale_conseil_departemental: yup
    .number()
    .min(0)
    .required()
});

export const EnquetePreposeFinancementForm = props => {
  const { goToPrevPage, data = {}, loading = false, step } = props;
  const {
    values,
    handleSubmit,
    submitCount,
    handleBlur,
    handleChange,
    setValues,
    errors
  } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    initialValues: mapDataPropsToFormValues(data),
    validationSchema
  });

  useEffect(() => {
    setValues(mapDataPropsToFormValues(data));
  }, [data, setValues]);

  const showError = useMemo(() => (!loading && step.status !== "empty") || submitCount !== 0, [
    step.status,
    submitCount,
    loading
  ]);

  return (
    <form onSubmit={handleSubmit}>
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

      <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
    </form>
  );
};

export default EnquetePreposeFinancementForm;
