import { useFormik } from "formik";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { Link } from "~/components/Link";
import { signupGreffierSchema } from "~/validation-schemas";
import { Button, Heading, Text } from "~/components";

import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";

function SignupGreffierForm({ tiDatas }) {
  const history = useHistory();
  const { user, greffier, setGreffier, validateStepOne } =
    useContext(SignupContext);

  const tiOptions = tiDatas.map((ti) => ({
    label: ti.etablissement,
    value: ti.id,
  }));

  const formik = useFormik({
    initialValues: {
      cabinet: greffier ? greffier.cabinet : "",
      ti: greffier ? greffier.ti : "",
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const body = {
        greffier: {
          cabinet: values.cabinet,
          ti: values.ti,
        },
        user,
      };

      signup({
        body,
        onComplete: () => setSubmitting(false),
        onError: (errors) => setErrors(errors),
        onSuccess: () => history.push("/signup/congratulation"),
      });
    },
    validationSchema: signupGreffierSchema,
  });

  return (
    <>
      <HeadingTitle p="1" m="1">
        {"Création d'un compte de greffier"}
      </HeadingTitle>
      <form noValidate onSubmit={formik.handleSubmit}>
        <SignupGeneralError errors={formik.errors} />
        <Flex>
          <FormGrayBox>
            <Heading size={4}>{"Tribunal"}</Heading>
            <Text lineHeight="1.5" color="textSecondary" id="tribunal_heading">
              {"Dans quel tribunal exercez-vous?"}
            </Text>
          </FormGrayBox>
          <FormInputBox role="group" aria-labelledby="tribunal_heading">
            <FormGroupSelect
              formik={formik}
              id="ti"
              placeholder="Tribunal d'instance"
              options={tiOptions}
              enableFilterByLabel
              isClearable={true}
            />

            <FormGroupInput
              id="cabinet"
              placeholder="Cabinet"
              formik={formik}
              autoComplete="organization"
              placeholder="Cabinet du tribunal"
              aria-label="Cabinet du tribunal"
            />
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
                setGreffier(formik.values);
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
    </>
  );
}

const SignupGreffier = (props) => (
  <SignupDatas
    {...props}
    Component={(props) => <SignupGreffierForm {...props} />}
  />
);

export { SignupGreffier };
