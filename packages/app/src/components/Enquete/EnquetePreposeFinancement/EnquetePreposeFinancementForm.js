import { Heading1, Heading3 } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React, { useEffect } from "react";
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

const validationSchema = yup.object().shape({
  charges_personnel: yup
    .number()
    .min(0)
    .required(),
  charges_preposes: yup
    .number()
    .min(0)
    .required(),
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
  const { goToPrevPage, data = {}, loading = false } = props;
  const { values, handleSubmit, handleBlur, handleChange, setValues } = useFormik({
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

  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Financement"}
      </Heading1>
      <Heading3>{"Charges"}</Heading3>
      <Flex>
        <Flex alignItems="center" width={1 / 2}>
          <Label minWidth={"180px"} mr={4}>
            {"charges de personnel"}
          </Label>
          <SmallInput
            onChange={handleChange}
            onBlur={handleBlur}
            id="charges_personnel"
            name="charges_personnel"
            value={values.charges_personnel}
          />
        </Flex>
        <Flex alignItems="center" width={1 / 2}>
          <Label width={"180px"} mr={4}>
            {"dont préposés"}
          </Label>
          <SmallInput
            onChange={handleChange}
            onBlur={handleBlur}
            id="charges_preposes"
            name="charges_preposes"
            value={values.charges_preposes}
          />
        </Flex>
      </Flex>
      <Flex mt={4}>
        <Flex alignItems="center" width={1 / 2}>
          <Label minWidth={"180px"} mr={4}>
            {"charges de fonctionnement"}
          </Label>
          <SmallInput
            onChange={handleChange}
            onBlur={handleBlur}
            id="charges_fonctionnement"
            name="charges_fonctionnement"
            value={values.charges_fonctionnement}
          />
        </Flex>
      </Flex>

      <Box mt={"50px"}>
        <Heading3>{"Produits"}</Heading3>
        <Flex>
          <Flex alignItems="center" width={1 / 2}>
            <Label width={"180px"} mr={4}>
              {"issus de l'application du barème de prélèvements"}
            </Label>
            <SmallInput
              onChange={handleChange}
              onBlur={handleBlur}
              id="produits_bareme_prelevements"
              name="produits_bareme_prelevements"
              value={values.produits_bareme_prelevements}
            />
          </Flex>
          <Flex alignItems="center" width={1 / 2}>
            <Label width={"180px"} mr={4}>
              {"issus de la participation des personnes (tarif hébergement)"}
            </Label>
            <SmallInput
              onChange={handleChange}
              onBlur={handleBlur}
              id="autre_produits"
              name="autre_produits"
              value={values.autre_produits}
            />
          </Flex>
        </Flex>
        <Flex mt={4}>
          <Flex alignItems="center" width={1 / 2}>
            <Label width={"180px"} mr={4}>
              {"financement public"}
            </Label>
            <SmallInput
              onChange={handleChange}
              onBlur={handleBlur}
              id={"financement_public"}
              name={"financement_public"}
              value={values.financement_public}
            />
          </Flex>
          <Flex alignItems="center" width={1 / 2}>
            <Label width={"180px"} mr={4}>
              {"dont aide sociale du conseil départemental"}
            </Label>
            <SmallInput
              onChange={handleChange}
              onBlur={handleBlur}
              id="aide_sociale_conseil_departemental"
              name="aide_sociale_conseil_departemental"
              value={values.aide_sociale_conseil_departemental}
            />
          </Flex>
        </Flex>
      </Box>

      <EnqueteStepperButtons disabled={loading} goToPrevPage={goToPrevPage} />
    </form>
  );
};

export default EnquetePreposeFinancementForm;
