import { useApolloClient } from "@apollo/client";
import { findDepartementByCodeOrId } from "@emjpm/biz";
import { useFormik } from "formik";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Box, Flex } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Geocode } from "~/components/Geocode";
import { HeadingTitle } from "~/containers/HeadingTitle";
import { signupDpfiSchema } from "~/validation-schemas";
import isSiretExists from "~/query-service/emjpm-hasura/isSiretExists";
import {
  Button,
  Field,
  Heading,
  InlineError,
  Text,
  SrOnly,
} from "~/components";
import { useDepartements } from "~/utils/departements/useDepartements.hook";

import { SignupContext } from "./context";
import signup from "./signup";
import { SignupDatas } from "./SignupDatas";
import { SignupGeneralError } from "./SignupGeneralError";

function SignupDpfiForm() {
  const history = useHistory();
  const { user, dpfi, setDpfi, validateStepOne } = useContext(SignupContext);

  const { departements } = useDepartements();

  const client = useApolloClient();

  const formik = useFormik({
    initialValues: {
      geocode: "",
      siret: dpfi ? dpfi.siret : "",
      telephone: dpfi ? dpfi.telephone : "",
      telephone_portable: dpfi ? dpfi.telephone_portable : "",
      user: user,
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (await isSiretExists(client, values.siret)) {
        setErrors({ siret: "Ce SIRET existe déjà" });
      } else {
        const codeDepartement = values.geocode.depcode;
        const departement = findDepartementByCodeOrId(departements, {
          code: codeDepartement,
        });
        const body = {
          dpfi: {
            location_adresse: values.geocode.label,
            code_postal: values.geocode.postcode,
            ville: values.geocode.city,
            departement_code: departement.id,
            genre: user.genre,
            latitude: values.geocode.latitude,
            longitude: values.geocode.longitude,
            siret: values.siret,
            telephone: values.telephone,
            telephone_portable: values.telephone_portable,
          },
          user: user,
        };

        await signup({
          body,
          onComplete: () => setSubmitting(false),
          onError: (errors) => setErrors(errors),
          onSuccess: () => history.push("/signup/congratulation"),
        });
      }
      setSubmitting(false);
    },
    validationSchema: signupDpfiSchema,
  });

  return (
    <>
      <HeadingTitle p="1" m="1">
        {"Demande de création d'un compte agent  DPF"}
      </HeadingTitle>

      <form noValidate onSubmit={formik.handleSubmit}>
        <SrOnly id="instructions">
          {"Tous les champs marqués d'un astérisque * sont obligatoires"}
        </SrOnly>
        <SignupGeneralError errors={formik.errors} />

        <Flex role="group" aria-labelledby="informations">
          <FormGrayBox>
            <Heading size={4} id="informations">
              {"Information professionnelle"}
            </Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {`Votre SIRET sera utilisé pour vous identifier en cas d'échanges de données avec
                d'autres systèmes (OCMI par exemple)`}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupInput
              id="siret"
              formik={formik}
              placeholder="SIRET"
              value={formik.values.siret}
              validationSchema={signupDpfiSchema}
              required
              ariaLabel="Numéro de siret"
              ariaDescribedBy="format_siret"
            />
            <SrOnly id="format_siret">format attendu : 82254321300027</SrOnly>
          </FormInputBox>
        </Flex>

        <Flex role="group" aria-labelledby="Téléphone">
          <FormGrayBox>
            <Heading size={4} id="telephone_heading">
              {"Téléphone"}
            </Heading>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupInput
              id="telephone"
              formik={formik}
              placeholder="Téléphone"
              value={formik.values.telephone}
              validationSchema={signupDpfiSchema}
              autoComplete="tel"
              ariaLabel="Votre téléphone"
              ariaDescribedBy="format_telephone"
            />
            <SrOnly id="format_telephone">format attendu : 0301020304</SrOnly>
            <FormGroupInput
              id="telephone_portable"
              formik={formik}
              placeholder="Téléphone portable"
              value={formik.values.telephone_portable}
              validationSchema={signupDpfiSchema}
              autoComplete="tel"
              ariaLabel="Votre téléphone portable"
              ariaDescribedBy="format_telephone_portable"
            />
            <SrOnly id="format_telephone_portable">
              format attendu : 0601020304
            </SrOnly>
          </FormInputBox>
        </Flex>

        <Flex role="group" aria-labelledby="adresse">
          <FormGrayBox>
            <Heading size={4} id="adresse">
              {"Adresse"}
            </Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {
                "Cette adresse permettra de vous localiser sur la carte des mesures"
              }
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <Field>
              <Geocode
                id="geocode"
                resource={dpfi}
                onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
                aria-describedby="msg-geocode"
                required
                aria-label="geocode"
                hasError={formik.errors.geocode}
              />
              <div id="msg-geocode">
                {(formik.touched.geocode || formik.submitCount > 0) && (
                  <InlineError
                    message={formik.errors.geocode}
                    fieldId="geocode"
                  />
                )}
              </div>
            </Field>
          </FormInputBox>
        </Flex>

        <Flex justifyContent="flex-end" p={1}>
          <Box mr="2">
            <Button
              type={null}
              as="a"
              href="/"
              variant="outline"
              aria-label="Annuler la création de votre compte"
              title="Annuler la création de votre compte"
            >
              Annuler
            </Button>
          </Box>
          <Box mr="2">
            <Button
              variant="outline"
              onClick={() => {
                setDpfi(formik.values);
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

const SignupDpfi = (props) => (
  <SignupDatas
    {...props}
    Component={(props) => <SignupDpfiForm {...props} />}
  />
);

export { SignupDpfi };
