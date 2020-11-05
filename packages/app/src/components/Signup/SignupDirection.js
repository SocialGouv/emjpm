import { useQuery } from "@apollo/react-hooks";
import { DIRECTION } from "@emjpm/core";
import { Button, Card, Heading1, Heading4, Text } from "@emjpm/ui";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React, { Fragment, useContext } from "react";
import { Box, Flex } from "rebass";

import { signupDirectionSchema } from "../../lib/validationSchemas";
import { toOptions } from "../../util/option/OptionUtil";
import { FormGroupSelect } from "../AppForm";
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
      directionType: direction?.directionType || "",
      region: region || "",
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      if (values.directionType === "regional" && !values.region) {
        setErrors({ region: "La région est obligatoire" });
        setSubmitting(false);
        return;
      }
      if (values.directionType === "departemental" && !values.department) {
        setErrors({ department: "Le département est obligatoire" });
        setSubmitting(false);
        return;
      }
      const body = {
        departmentId:
          values.directionType === "departemental" ? values.department : null,

        direction: {
          directionType: values.directionType,
        },
        regionId: values.directionType === "regional" ? values.region : null,
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

                <FormGroupSelect
                  id="directionType"
                  placeholder="Type de direction"
                  formik={formik}
                  options={DIRECTION.DIRECTION_TYPE.options}
                />
                {formik.values.directionType === "regional" && (
                  <FormGroupSelect
                    id="region"
                    placeholder="Région"
                    formik={formik}
                    options={regionOptions}
                    isClearable={true}
                  />
                )}
                {formik.values.directionType === "departemental" && (
                  <FormGroupSelect
                    id="department"
                    placeholder="Département"
                    formik={formik}
                    options={departmentOptions}
                    isClearable={true}
                  />
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
