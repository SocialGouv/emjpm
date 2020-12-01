import { Button, Heading4 } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useMemo } from "react";
import { Box, Flex } from "rebass";

import yup from "../../lib/validationSchemas/yup";
import { FormGrayBox, FormGroupSelect, FormInputBox } from "../AppForm";

const directionTypeOptions = [
  {
    label: "National",
    value: "national",
  },
  {
    label: "Régional",
    value: "regional",
  },
  {
    label: "Départemental",
    value: "departemental",
  },
];

const validationSchema = yup.object({
  departement: yup.string().when("type", {
    is: "departemental",
    otherwise: yup.string().nullable(),
    then: yup.string().required(),
  }),
  region: yup.string().when("type", {
    is: "regional",
    otherwise: yup.string().nullable(),
    then: yup.string().required(),
  }),
  type: yup.string().required(),
});

export const AdminDirectionTypeForm = (props) => {
  const { direction, departements, regions, onSubmit } = props;
  const formik = useFormik({
    initialValues: {
      departement: direction.department_id || "",
      region: direction.region_id || "",
      type: direction.type || "",
    },
    onSubmit: async (data, { setSubmitting }) => {
      await onSubmit(data);
      setSubmitting(false);
    },
    validationSchema,
  });

  const departementOptions = useMemo(() => {
    return departements.map(({ nom, code, id }) => ({
      label: `${nom} (${code})`,
      value: id,
    }));
  }, [departements]);

  const regionOptions = useMemo(() => {
    return regions.map(({ nom, id }) => ({ label: nom, value: id }));
  }, [regions]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading4>Type de direction</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupSelect
            id="type"
            formik={formik}
            placeholder="Type de direction"
            options={directionTypeOptions}
            onChange={({ value }) => {
              formik.setFieldValue("type", value);
              if (value === "national") {
                formik.setFieldValue("departement", "");
                formik.setFieldValue("region", "");
              }
            }}
          />

          {formik.values.type === "departemental" && (
            <FormGroupSelect
              id="departement"
              placeholder="Département"
              options={departementOptions}
              formik={formik}
              onChange={({ value }) => {
                formik.setFieldValue("departement", value);
                formik.setFieldValue("region", null);
              }}
            />
          )}

          {formik.values.type === "regional" && (
            <FormGroupSelect
              id="region"
              placeholder="Région"
              formik={formik}
              options={regionOptions}
              onChange={({ value }) => {
                formik.setFieldValue("region", value);
                formik.setFieldValue("departement", null);
              }}
            />
          )}
        </FormInputBox>
      </Flex>
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Link href={"/admin/users"}>
            <Button variant="outline">Annuler</Button>
          </Link>
        </Box>
        <Box>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
          >
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
};
