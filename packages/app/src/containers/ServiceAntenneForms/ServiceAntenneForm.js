import { useFormik } from "formik";

import { Box, Flex, Text } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Geocode, geocodeInitialValue } from "~/components/Geocode";
import { serviceAntenneSchema } from "~/validation-schemas";
import { Button, Field, Heading, InlineError, SrOnly } from "~/components";
import { useHistory } from "react-router-dom";

function ServiceAntenneForm(props) {
  const {
    antenne = {},
    handleSubmit,
    mesuresMax,
    otherAntennesMesuresMaxSum,
  } = props;
  const {
    contact_email,
    contact_phone,
    contact_lastname,
    contact_firstname,
    mesures_max,
    name,
  } = antenne;
  const geocode = geocodeInitialValue(antenne);
  const formik = useFormik({
    initialValues: {
      contact_email: contact_email || "",
      contact_firstname: contact_firstname || "",
      contact_lastname: contact_lastname || "",
      contact_phone: contact_phone || "",
      geocode,
      mesures_max: mesures_max || "",
      name: name || "",
      mesuresMax,
      otherAntennesMesuresMaxSum,
    },
    onSubmit: handleSubmit,
    validationSchema: serviceAntenneSchema,
  });

  const history = useHistory();

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Antenne"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            value={formik.values.name}
            id="name"
            placeholder="Nom de l'antenne"
            formik={formik}
            validationSchema={serviceAntenneSchema}
            autoComplete="organization"
            ariaLabel="Nom de l'antenne"
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1} id="responsable_heading">
            {"Responsable"}
          </Heading>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="responsable_heading">
          <FormGroupInput
            value={formik.values.contact_firstname}
            id="contact_firstname"
            placeholder="Nom du responsable"
            formik={formik}
            validationSchema={serviceAntenneSchema}
            autoComplete="family-name"
            ariaLabel="Nom du responsable"
          />
          <FormGroupInput
            value={formik.values.contact_lastname}
            id="contact_lastname"
            placeholder="Prénom du responsable"
            formik={formik}
            validationSchema={serviceAntenneSchema}
            autoComplete="given-name"
            ariaLabel="Prénom du responsable"
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1} id="coordonnes_heading">
            {"Coordonnées"}
          </Heading>
        </FormGrayBox>
        <FormInputBox role="group" aria-labelledby="coordonnes_heading">
          <FormGroupInput
            value={formik.values.contact_phone}
            id="contact_phone"
            placeholder="Téléphone"
            formik={formik}
            validationSchema={serviceAntenneSchema}
            autoComplete="tel"
            ariaLabel="Votre téléphone"
            ariaDescribedBy="format_contact_phone"
          />
          <SrOnly id="format_contact_phone">Format attendu:0601020304 </SrOnly>
          <FormGroupInput
            value={formik.values.contact_email}
            id="contact_email"
            placeholder="Email"
            formik={formik}
            validationSchema={serviceAntenneSchema}
            autoComplete="email"
            ariaLabel="Votre email"
            ariaDescribedBy="format_contact_email"
          />
          <SrOnly id="format_contact_email">
            format attendu : nom@justice.fr{" "}
          </SrOnly>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4}>{"Adresse"}</Heading>
          <Text lineHeight="1.5" color="textSecondary">
            {
              "Cette adresse permettra de localiser l'antenne sur la carte des mesures"
            }
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <Field>
            <Geocode
              id="geocode"
              onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
              resource={antenne}
              aria-describedby="msg-geocode"
            />
            <div id="msg-geocode">
              <InlineError message={formik.errors.geocode} fieldId="geocode" />
            </div>
          </Field>
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Activité"}
          </Heading>
          <Text lineHeight="1.5" color="textSecondary">
            Ces informations seront visibles par les magistrats.
          </Text>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            value={formik.values.mesures_max}
            id="mesures_max"
            placeholder="nombre de mesures souhaité"
            formik={formik}
            ariaLabel="nombre de mesures souhaité"
          />
        </FormInputBox>
      </Flex>
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Button
            type={null}
            as="a"
            href="/services/informations"
            variant="outline"
            title="Annuler la création d'antenne"
            aria-label="Annuler la création d'antenne"
          >
            Annuler
          </Button>
        </Box>
        <Box>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
            title="Enregistrer la création d'antenne"
            aria-label="Enregistrer la création d'antenne"
          >
            Enregistrer
          </Button>
        </Box>
      </Flex>
    </form>
  );
}

export { ServiceAntenneForm };
