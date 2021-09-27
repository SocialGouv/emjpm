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
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Responsable"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            value={formik.values.contact_firstname}
            id="contact_firstname"
            placeholder="Nom du responsable"
            formik={formik}
            validationSchema={serviceAntenneSchema}
          />
          <FormGroupInput
            value={formik.values.contact_lastname}
            id="contact_lastname"
            placeholder="Prénom du responsable"
            formik={formik}
            validationSchema={serviceAntenneSchema}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading size={4} mb={1}>
            {"Coordonnées"}
          </Heading>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            value={formik.values.contact_phone}
            id="contact_phone"
            placeholder="Téléphone"
            formik={formik}
            validationSchema={serviceAntenneSchema}
          />
          <FormGroupInput
            value={formik.values.contact_email}
            id="contact_email"
            placeholder="Email"
            formik={formik}
            validationSchema={serviceAntenneSchema}
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
              onChange={(geocode) => formik.setFieldValue("geocode", geocode)}
              resource={antenne}
            />
            <InlineError message={formik.errors.geocode} fieldId="geocode" />
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
