import { useApolloClient } from "@apollo/client";
import { findDepartementByCodeOrId, isIndividuel } from "@emjpm/biz";
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
import { signupMandataireSchema } from "~/validation-schemas";
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

function SignupMandataireForm() {
  const history = useHistory();
  const { user, mandataire, setMandataire, validateStepOne } =
    useContext(SignupContext);

  const { departements } = useDepartements();

  const client = useApolloClient();

  const formik = useFormik({
    initialValues: {
      dispo_max: mandataire ? mandataire.dispo_max : "",
      geocode: "",
      siret: mandataire ? mandataire.siret : "",
      telephone: mandataire ? mandataire.telephone : "",
      telephone_portable: mandataire ? mandataire.telephone_portable : "",
      user: user,
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      if (isIndividuel(user) && (await isSiretExists(client, values.siret))) {
        setErrors({ siret: "Ce SIRET existe déjà" });
      } else {
        const codeDepartement = values.geocode.depcode;
        const departement = findDepartementByCodeOrId(departements, {
          code: codeDepartement,
        });
        const body = {
          mandataire: {
            location_adresse: values.geocode.label,
            code_postal: values.geocode.postcode,
            ville: values.geocode.city,
            departement_code: departement.id,
            dispo_max: parseInt(values.dispo_max),
            genre: user.genre,
            latitude: values.geocode.latitude,
            longitude: values.geocode.longitude,
            siret: isIndividuel(user) ? values.siret : null,
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
    validationSchema: signupMandataireSchema,
  });

  return (
    <>
      <HeadingTitle p="1" m="1">
        {"Demande de création d'un compte de mandataire"}
      </HeadingTitle>

      <form noValidate onSubmit={formik.handleSubmit}>
        <SrOnly id="instructions">
          {"Tous les champs marqués d'un astérisque * sont obligatoires"}
        </SrOnly>
        <SignupGeneralError errors={formik.errors} />
        {isIndividuel(user) && (
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
                validationSchema={signupMandataireSchema}
                required={isIndividuel(user)}
                aria-label="Siret"
                ariaDescribedBy="format_siret"
              />
              <SrOnly id="format_siret">format attendu : 82254321300027</SrOnly>
            </FormInputBox>
          </Flex>
        )}
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
              validationSchema={signupMandataireSchema}
              autoComplete="tel"
              aria-label="Votre téléphone"
              ariaDescribedBy="format_telephone"
            />
            <SrOnly id="format_telephone">format attendu : 0301020304</SrOnly>
            <FormGroupInput
              id="telephone_portable"
              formik={formik}
              placeholder="Téléphone portable"
              value={formik.values.telephone_portable}
              validationSchema={signupMandataireSchema}
              autoComplete="tel"
              aria-label="Votre téléphone portable"
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
                resource={mandataire}
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

        <Flex role="group" aria-labelledby="mesure_max">
          <FormGrayBox>
            <Heading size={4} id="mesure_max">
              {"Capacité"}
            </Heading>
            <Text lineHeight="1.5" color="textSecondary">
              {"Indiquez le nombre de mesures maximal souhaité"}
            </Text>
          </FormGrayBox>
          <FormInputBox>
            <FormGroupInput
              id="dispo_max"
              formik={formik}
              placeholder="Nombre de mesures souhaité"
              value={formik.values.dispo_max}
              validationSchema={signupMandataireSchema}
              aria-label="Nombre de mesures souhaité"
            />
          </FormInputBox>
        </Flex>
        <Flex justifyContent="flex-end" p={1}>
          <Box mr="2">
            <Button
              variant="outline"
              onClick={() => history.push("/")}
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
                setMandataire(formik.values);
                validateStepOne(false);
              }}
              aria-label="Retour à la page précédente"
              title="Retour"
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

const SignupMandataire = (props) => (
  <SignupDatas
    {...props}
    Component={(props) => <SignupMandataireForm {...props} />}
  />
);

export { SignupMandataire };
