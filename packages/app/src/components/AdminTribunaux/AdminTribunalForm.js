import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import { Geocode, geocodeInitialValue } from "~/components/Geocode";
import { adminTribunalSchema } from "~/lib/validationSchemas";
import { Button, Card, Field, Heading4, InlineError, Input, Text } from "~/ui";

import { cardStyle } from "./style";

export const AdminTribunalForm = ({ tribunal, onSubmit, onCancel }) => {
  const geocode = geocodeInitialValue(tribunal);

  const formik = useFormik({
    initialValues: {
      email: tribunal && tribunal.email ? tribunal.email : "",
      etablissement: tribunal ? tribunal.etablissement : "",
      geocode,
      siret: tribunal && tribunal.siret ? tribunal.siret : "",
      telephone: tribunal && tribunal.telephone ? tribunal.telephone : "",
    },
    onSubmit: (values, { setSubmitting }) => {
      onSubmit(values);
      setSubmitting(false);
    },
    validationSchema: adminTribunalSchema,
  });

  return (
    <Card sx={cardStyle} width="100%">
      <Flex flexWrap="wrap">
        <Box
          width={[1, 2 / 5]}
          bg="cardSecondary"
          borderRadius="5px 0 0 5px"
          p="5"
        >
          <Box height="230px">
            <Heading4>{"Information du tribunal"}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {"Informations relatives au tribunal"}
            </Text>
          </Box>
          <Box height="150px">
            <Heading4>{"Contact du tribunal"}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              Contact du tribunal
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box mb="2">
            <form onSubmit={formik.handleSubmit}>
              <Field>
                <Input
                  value={formik.values.etablissement}
                  id="etablissement"
                  name="etablissement"
                  hasError={
                    formik.errors.etablissement && formik.touched.etablissement
                  }
                  onChange={formik.handleChange}
                  placeholder="Nom du tribunal"
                />
                <InlineError
                  message={formik.errors.etablissement}
                  fieldId="etablissement"
                />
              </Field>
              <Field>
                <Input
                  value={formik.values.siret}
                  id="siret"
                  name="siret"
                  hasError={formik.errors.siret && formik.touched.siret}
                  onChange={formik.handleChange}
                  placeholder="SIRET"
                />
                <InlineError message={formik.errors.siret} fieldId="siret" />
              </Field>
              <Field mt="5">
                <Input
                  value={formik.values.email}
                  id="email"
                  name="email"
                  hasError={formik.errors.email && formik.touched.email}
                  onChange={formik.handleChange}
                  placeholder="Email"
                />
                <InlineError message={formik.errors.email} fieldId="email" />
              </Field>
              <Field>
                <Input
                  value={formik.values.telephone}
                  id="telephone"
                  name="telephone"
                  hasError={formik.errors.telephone && formik.touched.telephone}
                  onChange={formik.handleChange}
                  placeholder="Téléphone"
                />
                <InlineError
                  message={formik.errors.telephone}
                  fieldId="telephone"
                />
              </Field>
              <Field>
                <Geocode
                  resource={tribunal}
                  onChange={(geocode) =>
                    formik.setFieldValue("geocode", geocode)
                  }
                />
                <InlineError
                  message={formik.errors.geocode}
                  fieldId="geocode"
                />
              </Field>
              <Flex justifyContent="flex-end">
                <Box>
                  <Button mr="2" variant="outline" onClick={onCancel}>
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
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};
