import { useFormik } from "formik";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupSelect,
  FormInputBox,
} from "~/components/AppForm";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { signupServiceSchema } from "~/validation-schemas";
import { AccessibleSelect, Button, Heading, Text, SrOnly } from "~/components";
import { toOptions, findOptions } from "~/utils/form";
import { useDepartements } from "~/utils/departements/useDepartements.hook";

import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";

function getServiceOptions(services, departementCodes) {
  const servicesByDepartement =
    departementCodes && services.length > 0
      ? services.filter((ser) => departementCodes.includes(ser.departement))
      : [];

  return toOptions(servicesByDepartement, "id", "etablissement");
}

function SignupSdpfForm({ sdpfDatas, ...props }) {
  const history = useHistory();
  const { user, sdpf, setSdpf, validateStepOne } = useContext(SignupContext);

  const { departements, loading } = useDepartements();

  const formik = useFormik({
    initialValues: {
      departements: sdpf?.departements || null,
      service: sdpf?.service || null,
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const body = {
        sdpf: {
          sdpf_id: values.service,
        },
        user: user,
      };

      signup({
        body,
        onComplete: () => setSubmitting(false),
        onError: (errors) => setErrors(errors),
        onSuccess: () => history.push("/signup/congratulation"),
      });
    },
    validationSchema: signupServiceSchema,
  });

  if (loading) {
    return null;
  }

  const serviceOptions = getServiceOptions(
    sdpfDatas,
    formik.values.departements
  );

  const departementsOptions = toOptions(departements, "id", "nom");

  return (
    <>
      <HeadingTitle p="1" m="1">
        {"Création d'un compte de service DPF"}
      </HeadingTitle>
      <form noValidate onSubmit={formik.handleSubmit}>
        <SrOnly id="instructions">
          {"Tous les champs marqués d'un astérisque * sont obligatoires"}
        </SrOnly>
        <SignupGeneralError errors={formik.errors} />
        <Flex role="group" aria-labelledby="votre_service_heading">
          <FormGrayBox>
            <Heading size={4}>{"Votre service"}</Heading>
            <Text
              lineHeight="1.5"
              color="textSecondary"
              id="votre_service_heading"
            >
              {
                "Sélectionnez le département dans lequel se situe le siège social du service DPF pour lequel vous travaillez."
              }
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <Box style={{ marginBottom: "10px" }}>
              <AccessibleSelect
                id="departements"
                formik={formik}
                placeholder="Département(s) de votre service"
                options={departementsOptions}
                isMulti
                value={findOptions(
                  departementsOptions,
                  formik.values.departements
                )}
                hasError={
                  formik.errors.departements && formik.touched.departements
                }
                onChange={(selected) => {
                  if (selected.length === 0) {
                    formik.setFieldValue("service", null);
                  }
                  formik.setFieldValue(
                    "departements",
                    (selected || []).map((o) => o.value)
                  );
                }}
                required
              />
            </Box>
            <FormGroupSelect
              id="service"
              formik={formik}
              placeholder="Votre service"
              options={serviceOptions}
              isClearable
              required
              aria-label="Votre service"
            />
          </FormInputBox>
        </Flex>
        <Flex justifyContent="flex-end" p={1}>
          <Box>
            <Button
              mr="2"
              variant="outline"
              as="a"
              type={null}
              aria-label="Annuler la création de votre compte"
              title="Annuler la création de votre compte"
              href="/"
            >
              Annuler
            </Button>
          </Box>
          <Box>
            <Button
              mr="2"
              variant="outline"
              onClick={() => {
                setSdpf(null);
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

function SignupSdpf(props) {
  return (
    <SignupDatas
      {...props}
      Component={(props) => <SignupSdpfForm {...props} />}
    />
  );
}

export { SignupSdpf };
