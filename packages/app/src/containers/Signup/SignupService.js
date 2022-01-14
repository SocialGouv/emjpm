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
import { Link } from "~/components/Link";
import { signupServiceSchema } from "~/validation-schemas";
import { Select, Button, Heading, Text } from "~/components";
import { toOptions, findOptions } from "~/utils/form";
import { useDepartements } from "~/utils/departements/useDepartements.hook";

import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";

function getServiceOptions(services, departementCodes) {
  const servicesByDepartement = departementCodes
    ? services.filter((service) => {
        if (!service.departements) {
          return false;
        }
        return service.departements.some(({ departement_code }) =>
          departementCodes.includes(departement_code)
        );
      })
    : [];

  return toOptions(servicesByDepartement, "id", "etablissement");
}

function SignupServiceForm({ serviceDatas }) {
  const history = useHistory();
  const { user, service, setService, validateStepOne } =
    useContext(SignupContext);
  const { departements, loading } = useDepartements();

  const formik = useFormik({
    initialValues: {
      departements: service?.departements || null,
      service: service?.service || null,
    },
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const body = {
        service: {
          service_id: values.service,
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
    serviceDatas,
    formik.values.departements
  );

  const departementsOptions = toOptions(departements, "id", "nom");

  return (
    <>
      <HeadingTitle p="1" m="1">
        {"Création d'un compte de service mandataire"}
      </HeadingTitle>
      <form noValidate onSubmit={formik.handleSubmit}>
        <SignupGeneralError errors={formik.errors} />
        <Flex>
          <FormGrayBox>
            <Heading size={4}>{"Votre service"}</Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {
                "Sélectionnez le département dans lequel se situe le siège social du service mandataire pour lequel vous travaillez."
              }
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <Box style={{ marginBottom: "10px" }}>
              <Select
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
                onChange={(options) => {
                  formik.setFieldValue(
                    "departements",
                    (options || []).map((o) => o.value)
                  );
                }}
              />
            </Box>
            <FormGroupSelect
              id="service"
              formik={formik}
              placeholder="Votre service"
              options={serviceOptions}
              isClearable
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
                setService(null);
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

function SignupService(props) {
  return (
    <SignupDatas
      {...props}
      Component={(props) => <SignupServiceForm {...props} />}
    />
  );
}

export { SignupService };
