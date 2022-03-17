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
import { signupGreffierSchema } from "~/validation-schemas";
import { Button, Heading, Text, SrOnly } from "~/components";

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
        <SrOnly id="instructions">
          {"Tous les champs marqués d'un astérisque * sont obligatoires"}
        </SrOnly>
        <SignupGeneralError errors={formik.errors} />
        <Flex role="group" aria-labelledby="choix_tribunal">
          <FormGrayBox>
            <Heading size={4} id="choix_tribunal">
              {"Tribunal"}
            </Heading>
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
              required
              aria-label="Tribunal d'instance"
            />

            <FormGroupInput
              id="cabinet"
              formik={formik}
              autoComplete="organization"
              placeholder="Cabinet du tribunal"
              ariaLabel="Cabinet du tribunal"
            />
          </FormInputBox>
        </Flex>

        <Flex justifyContent="flex-end" p={1}>
          <Box>
            <Button
              as="a"
              type={null}
              aria-label="Annuler la création de votre compte"
              title="Annuler la création de votre compte"
              mr="2"
              variant="outline"
              href="/"
            >
              Annuler
            </Button>
          </Box>
          <Box>
            <Button
              role="link"
              mr="2"
              variant="outline"
              onClick={() => {
                setGreffier(formik.values);
                validateStepOne(false);
              }}
              aria-label="Retour à la page précédente"
              title="Retour à la page précédente"
            >
              Retour
            </Button>
          </Box>
          <Box>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              isLoading={formik.isSubmitting}
              aria-label="Enregistrer la création de votre compte"
              title="Enregistrer la création de votre compte"
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
