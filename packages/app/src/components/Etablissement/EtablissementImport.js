import React from "react";
import { useMutation } from "react-apollo";

import { useFormik } from "formik";
import { IMPORT_FINESS } from "./mutations";
import { Button, Input } from "@emjpm/ui";
import { Box, Flex } from "rebass";

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
  );
};

export default EtablissementImport;
