import { useFormik } from "formik";

import { Box, Flex, Text } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Geocode, geocodeInitialValue } from "~/components/Geocode";
import { serviceAntenneSchema } from "~/validation-schemas";
import { Button, Field, Heading, InlineError } from "~/components";
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
          />
          <FormGroupInput
            value={formik.values.contact_lastname}
            id="contact_lastname"
            placeholder="Prénom du responsable"
            formik={formik}
            validationSchema={serviceAntenneSchema}
            autoComplete="given-name"
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
          />
          <FormGroupInput
            value={formik.values.contact_email}
            id="contact_email"
            placeholder="Email"
            formik={formik}
            validationSchema={serviceAntenneSchema}
            autoComplete="email"
            aria-label="Votre email"
          />
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
          />
        </FormInputBox>
      </Flex>
      <Flex p={2} alignItems="center" justifyContent="flex-end">
        <Box mr="2">
          <Button
            variant="outline"
            onClick={() => {
              history.push("/services/informations");
            }}
          >
            Annuler
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
  );
}

export { ServiceAntenneForm };
