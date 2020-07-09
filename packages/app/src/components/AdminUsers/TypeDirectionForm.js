import { Button, InlineError, Select } from "@emjpm/ui";
import { useFormik } from "formik";
import React, { Fragment, useMemo } from "react";
import { Box, Flex } from "rebass";

import yup from "../../lib/validationSchemas/yup";
import { findOption } from "../../util/option/OptionUtil";

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
  type: yup.string().required(),
  region: yup.string().when("type", {
    is: "regional",
    then: yup.string().required(),
    otherwise: yup.string().nullable(),
  }),
  departement: yup.string().when("type", {
    is: "departemental",
    then: yup.string().required(),
    otherwise: yup.string().nullable(),
  }),
});

export const TypeDirectionForm = (props) => {
  const { direction, departements, regions, onSubmit } = props;
  const { values, submitting, handleSubmit, errors, setFieldValue } = useFormik({
    initialValues: {
      type: direction.type || "",
      region: direction.region_id || "",
      departement: direction.department_id || "",
    },
    validationSchema,
    onSubmit: async (data, { setSubmitting }) => {
      await onSubmit(data);
      setSubmitting(false);
    },
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
    <form onSubmit={handleSubmit}>
      <Flex>
        <Box mr={2} width={1 / 2}>
          <Fragment>
            <Select
              name="type"
              onChange={({ value }) => {
                setFieldValue("type", value);
                if (value === "national") {
                  setFieldValue("departement", "");
                  setFieldValue("region", "");
                }
              }}
              size="small"
              value={findOption(directionTypeOptions, values.type)}
              placeholder="Type de direction"
              options={directionTypeOptions}
            />
            <InlineError fieldId="type" message={errors.type} />
          </Fragment>
        </Box>
        <Box ml={2} width={1 / 2}>
          {values.type === "departemental" && (
            <Fragment>
              <Select
                name="departement"
                size="small"
                placeholder="Département"
                value={findOption(departementOptions, values.departement)}
                options={departementOptions}
                onChange={({ value }) => setFieldValue("departement", value)}
              />
              <InlineError fieldId="departement" message={errors.departement} />
            </Fragment>
          )}

          {values.type === "regional" && (
            <Fragment>
              <Select
                size="small"
                placeholder="Région"
                value={findOption(regionOptions, values.region)}
                options={regionOptions}
                onChange={({ value }) => setFieldValue("region", value)}
              />
              <InlineError fieldId="region" message={errors.region} />
            </Fragment>
          )}
        </Box>
      </Flex>
      <Flex justifyContent="flex-end">
        <Box>
          <Button isLoading={submitting} type="submit" mt={2}>
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
};

export default TypeDirectionForm;
