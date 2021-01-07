import { useQuery } from "@apollo/client";
import { DIRECTION } from "@emjpm/biz";
import { useFormik } from "formik";
import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { HeadingTitle } from "~/components/HeadingTitle";
import { Link } from "~/components/Link";
import { signupDirectionSchema } from "~/lib/validationSchemas";
import { Button, Heading4, Text } from "~/ui";
import { useDepartementsOptions } from "~/util/departements";
import { toOptions } from "~/util/option/OptionUtil";

import { SignupContext } from "./context";
import { REGIONS } from "./queries";
import signup from "./signup";
import { SignupGeneralError } from "./SignupGeneralError";

export const SignupDirection = () => {
  const history = useHistory();
  const { user, departement, direction, region, validateStepOne } = useContext(
    SignupContext
  );

  const formik = useFormik({
    initialValues: {
      departement: departement || "",
      directionType: direction?.directionType || "",
      region: region || "",
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const body = {
        direction: {
          departementId: values.departement,
          directionType: values.directionType,
          regionId: values.region,
        },
        user: {
          username: user.email,
          ...user,
        },
      };

      signup({
        body,
        onComplete: () => setSubmitting(false),
        onError: (errors) => setErrors(errors),
        onSuccess: () => history.push("/signup/congratulation"),
      });
    },
    validationSchema: signupDirectionSchema,
  });

  const { departementsOptions } = useDepartementsOptions({ valueKey: "id" });
  const { data: dataRegions } = useQuery(REGIONS);

  const regionOptions = toOptions(dataRegions?.regions, "id", "nom");

  const { setFieldValue } = formik;

  return (
    <Fragment>
      <HeadingTitle p="1" m="1">
        {"Création d'un compte d'agent de l'état"}
      </HeadingTitle>
      <form onSubmit={formik.handleSubmit}>
        <SignupGeneralError errors={formik.errors} />
        <Flex>
          <FormGrayBox>
            <Heading4>{"Institution"}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {"Pour quelle direction travaillez-vous?"}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupSelect
              id="directionType"
              placeholder="Type de direction"
              formik={formik}
              options={DIRECTION.DIRECTION_TYPE.options}
              validationSchema={signupDirectionSchema}
              onChange={({ value }) => {
                setFieldValue("directionType", value);
                setFieldValue("region", null);
                setFieldValue("departement", null);
              }}
            />
            {formik.values.directionType === "regional" && (
              <FormGroupSelect
                id="region"
                placeholder="Région"
                formik={formik}
                options={regionOptions}
                isClearable={true}
                validationSchema={signupDirectionSchema}
              />
            )}
            {formik.values.directionType === "departemental" && (
              <FormGroupSelect
                id="departement"
                placeholder="Département"
                formik={formik}
                options={departementsOptions}
                isClearable={true}
                validationSchema={signupDirectionSchema}
              />
            )}
          </FormInputBox>
        </Flex>

        <Flex justifyContent="flex-end" p={1}>
          <Box>
            <Link to="/">
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
    </Fragment>
  );
};
