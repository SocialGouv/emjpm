import { Button, Input, Text, Heading3 } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { useMutation } from "react-apollo";
import { Card, Box, Flex } from "rebass";

import { IMPORT_FINESS } from "./mutations";

export const EtablissementImport = () => {
  const [importFiness] = useMutation(IMPORT_FINESS);

  const formik = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await importFiness({
        variables: {
          url: values.url,
        },
      });
      setSubmitting(false);
    },
    initialValues: {
      url: "https://www.data.gouv.fr/fr/datasets/r/16ee2cd3-b9fe-459e-8a57-46e03ba3adbd",
    },
  });

  return (
    <Card mb="5">
      <Flex flexDirection="column">
        <Box mt={2}>
          <Heading3 mb="2">{`Mise à jour de la base de données FINESS`}</Heading3>
          <Text mb="1" lineHeight="2">
            {`La mise à jour de la base de données FINESS est très longue!`}
          </Text>
          <Box as="form" onSubmit={formik.handleSubmit}>
            <Box mb={2}>
              <Box mb={2}>
                <Input
                  name="url"
                  type="text"
                  value={formik.values.url}
                  placeholder="Lien de téléchargement de la base FINESS"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              </Box>
            </Box>
            <Flex mt={4} justifyContent="flex-end">
              <Box>
                <Button type="submit">Importer la base FINESS</Button>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
};

export default EtablissementImport;
