import { useFormik } from "formik";

import { Box, Flex, Text } from "rebass";

import {
  FormGrayBox,
  FormGroupInput,
  FormInputBox,
} from "~/components/AppForm";
import { Geocode, geocodeInitialValue } from "~/components/Geocode";
import { serviceAntenneSchema } from "~/lib/validationSchemas";
import { Button, Field, Heading4, InlineError } from "~/ui";

const ServiceAntenneForm = (props) => {
  const { antenne = {}, handleSubmit } = props;
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
    },
    onSubmit: handleSubmit,
    validationSchema: serviceAntenneSchema,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Antenne"}</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            value={formik.values.name}
            id="name"
            placeholder="Nom de l'antenne"
            formik={formik}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Responsable"}</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            value={formik.values.contact_firstname}
            id="contact_firstname"
            placeholder="Nom du responsable"
            formik={formik}
          />
          <FormGroupInput
            value={formik.values.contact_lastname}
            id="contact_lastname"
            placeholder="Prénom du responsable"
            formik={formik}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4 mb={1}>{"Coordonnées"}</Heading4>
        </FormGrayBox>
        <FormInputBox>
          <FormGroupInput
            value={formik.values.contact_phone}
            id="contact_phone"
            placeholder="Téléphone"
            formik={formik}
          />
          <FormGroupInput
            value={formik.values.contact_email}
            id="contact_email"
            placeholder="Email"
            formik={formik}
          />
        </FormInputBox>
      </Flex>
      <Flex>
        <FormGrayBox>
          <Heading4>{"Adresse"}</Heading4>
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
          <Heading4 mb={1}>{"Activité"}</Heading4>
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
};

export { ServiceAntenneForm };
