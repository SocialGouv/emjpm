import { useFormik } from "formik";
import { useMemo } from "react";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { Link } from "~/components/Link";
import yup from "~/validation-schemas/yup";
import { Button, Heading, SrOnly } from "~/components";

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

export function AdminDirectionTypeForm(props) {
  const { direction, departements, regions, onSubmit } = props;

  const formik = useFormik({
    initialValues: {
      departement: direction?.departement_code || "",
      region: direction?.region_id || "",
      type: direction?.type || "",
    },
    onSubmit: async (data, { setSubmitting }) => {
      await onSubmit(data);
      setSubmitting(false);
    },
    validationSchema,
  });
  const departementOptions = useMemo(() => {
    return departements.map(({ nom, code, id }) => ({
      label: `${nom} (${id})`,
      value: id,
    }));
  }, [departements]);

  const regionOptions = useMemo(() => {
    return regions.map(({ nom, id }) => ({ label: nom, value: id }));
  }, [regions]);

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Flex role="group" aria-labelledby="type_direction">
        <FormGrayBox>
          <Heading size={4} id="type_direction">
            Type de direction
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupSelect
            id="type"
            formik={formik}
            placeholder="Type de direction"
            options={directionTypeOptions}
            enableFilterByLabel
            onChange={({ value }) => {
              formik.setFieldValue("type", value);
              switch (value) {
                case "regional":
                  formik.setFieldValue("departement", null);
                  break;
                case "departemental":
                  formik.setFieldValue("region", null);
                  break;
                case "national":
                  formik.setFieldValue("departement", null);
                  formik.setFieldValue("region", null);
                  break;
              }
            }}
          />

          {formik.values.type === "departemental" && (
            <FormGroupSelect
              id="departement"
              placeholder="Département"
              options={departementOptions}
              formik={formik}
              enableFilterByLabel
            />
          )}

          {formik.values.type === "regional" && (
            <FormGroupSelect
              id="region"
              placeholder="Région"
              formik={formik}
              options={regionOptions}
              enableFilterByLabel
            />
          )}
        </FormInputBox>
      </Flex>
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Link to={"/admin/users"}>
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
}
