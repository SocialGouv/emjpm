import { useQuery } from "@apollo/react-hooks";
import { DIRECTION } from "@emjpm/core";
import {
  Button,
  Card,
  Field,
  Heading1,
  Heading4,
  InlineError,
  Select,
  Text,
} from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import { signupDirectionSchema } from "../../lib/validationSchemas";
import { toOptions } from "../../util/option/OptionUtil";
import { SignupContext } from "./context";
import { DEPARTMENTS, REGIONS } from "./queries";
import signup from "./signup";
import { SignupGeneralError } from "./SignupGeneralError";
import { cardStyle, grayBox } from "./style";

export const SignupDirection = () => {
  const { user, department, direction, region, validateStepOne } = useContext(
    SignupContext
  );

  const formik = useFormik({
    initialValues: {
      department: department || "",
      directionType: direction ? direction.directionType : "",
      region: region || "",
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      if (values.directionType?.value === "regional" && !values.region?.value) {
        setErrors({ region: "La région est obligatoire" });
        setSubmitting(false);
        return;
      }
      if (
        values.directionType?.value === "departemental" &&
        !values.department?.value
      ) {
        setErrors({ department: "Le département est obligatoire" });
        setSubmitting(false);
        return;
      }
      const body = {
        departmentId:
          values.directionType.value === "departemental"
            ? values.department?.value
            : null,

        direction: {
          directionType: values.directionType.value,
        },
        regionId:
          values.directionType.value === "regional"
            ? values.region?.value
            : null,
        user: {
          username: user.email,
          ...user,
        },
      };

      signup({
        body,
        onComplete: () => setSubmitting(false),
        onError: (errors) => setErrors(errors),
        onSuccess: () => Router.push("/signup/congratulation"),
      });
    },
    validationSchema: signupDirectionSchema,
  });

  const { data: dataDepartments } = useQuery(DEPARTMENTS);
  const { data: dataRegions } = useQuery(REGIONS);

  const departmentOptions = toOptions(
    dataDepartments?.departements,
    "id",
    "nom"
  );
  const regionOptions = toOptions(dataRegions?.regions, "id", "nom");

  return (
    <Fragment>
      <Heading1 px="1">{`Création d'un compte d'agent de l'état`}</Heading1>
      <Card sx={cardStyle}>
        <Flex>
          <Box width={[1, 2 / 5]} sx={grayBox}>
            <Box height="80px" pt={1}>
              <Heading4>{`Institution`}</Heading4>
              <Text lineHeight="1.5" color="textSecondary">
                {`Pour quelle direction travaillez-vous?`}
              </Text>
            </Box>
          </Box>
          <Box p="5" pb={0} width={[1, 3 / 5]}>
            <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
              <form onSubmit={formik.handleSubmit}>
                <SignupGeneralError errors={formik.errors} />
                <Field>
                  <Select
                    id="directionType"
                    name="directionType"
                    placeholder="Type de direction"
                    value={formik.values.directionType}
                    hasError={
                      formik.errors.directionType &&
                      formik.touched.directionType
                    }
                    onChange={(option) =>
                      formik.setFieldValue("directionType", option)
                    }
                    options={DIRECTION.DIRECTION_TYPE.options}
                  />
                  {formik.touched.directionType && (
                    <InlineError
                      message={formik.errors.directionType}
                      fieldId="directionType"
                    />
                  )}
                </Field>
                {formik.values.directionType?.value === "regional" && (
                  <Field>
                    <Select
                      id="region"
                      name="region"
                      placeholder="Région"
                      value={formik.values.region}
                      hasError={formik.errors.region && formik.touched.region}
                      onChange={(option) =>
                        formik.setFieldValue("region", option)
                      }
                      isClearable={true}
                      options={regionOptions}
                    />
                    {formik.touched.region && (
                      <InlineError
                        message={formik.errors.region}
                        fieldId="region"
                      />
                    )}
                  </Field>
                )}
                {formik.values.directionType?.value === "departemental" && (
                  <Field>
                    <Select
                      id="department"
                      name="department"
                      placeholder="Département"
                      value={formik.values.department}
                      hasError={
                        formik.errors.department && formik.touched.department
                      }
                      onChange={(option) =>
                        formik.setFieldValue("department", option)
                      }
                      isClearable={true}
                      options={departmentOptions}
                    />
                    {formik.touched.department && (
                      <InlineError
                        message={formik.errors.department}
                        fieldId="department"
                      />
                    )}
                  </Field>
                )}
                <Flex justifyContent="flex-end">
                  <Box>
                    <Link href="/">
                      <Button mr="2" variant="outline">
                        Annuler
                      </Button>
                    </Link>
                  </Box>
                  <Box>
                    <Button
                      mr="2"
                      variant="outline"
                      onClick={() => {
                        validateStepOne(false);
                      }}
                    >
                      Retour
                    </Button>
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
            </Box>
          </Box>
        </Flex>
      </Card>
    </Fragment>
  );
};
