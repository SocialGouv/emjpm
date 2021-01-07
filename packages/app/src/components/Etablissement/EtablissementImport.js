import { format } from "date-fns";
import { useFormik } from "formik";
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Box, Card, Flex } from "rebass";

import { Button, Heading3, Input, Text } from "~/ui";

import { IMPORT_FINESS } from "./mutations";
import { PROCESSUS_STATE } from "./queries";

export const EtablissementImport = () => {
  const { data, loading, error } = useQuery(PROCESSUS_STATE, {
    fetchPolicy: "network-only",

    variables: { id: "import_finess" },
  });

  const [importFiness] = useMutation(IMPORT_FINESS);

  const formik = useFormik({
    initialValues: {
      url:
        "https://www.data.gouv.fr/fr/datasets/r/16ee2cd3-b9fe-459e-8a57-46e03ba3adbd",
    },
    onSubmit: async (values, { setSubmitting }) => {
      await importFiness({
        variables: {
          url: values.url,
        },
      });
      setSubmitting(false);
      document.location.reload(true);
    },
  });

  if (error) {
    return <Text>Oups, une erreur est survenue.</Text>;
  }

  if (loading) {
    return <Box>Chargement...</Box>;
  }
  const processusState = data.processus_states_by_pk;

  if (processusState && processusState.start_date && !processusState.end_date) {
    return (
      <Card mb="5">
        <Flex flexDirection="column">
          <Box mt={2}>
            <Heading3 mb="2">
              {"Mise à jour de la base de données FINESS"}
            </Heading3>
            <Text mb="1" lineHeight="2">
              {`Un import des données de FINESS est en cours. Date de début ${format(
                new Date(processusState.start_date),
                "dd/MM/yyyy HH:mm"
              )}`}
            </Text>
          </Box>
        </Flex>
      </Card>
    );
  }

  return (
    <Card mb="5">
      <Flex flexDirection="column">
        <Box mt={2}>
          <Heading3 mb="2">
            {"Mise à jour de la base de données FINESS"}
          </Heading3>
          <Text mb="1" lineHeight="2">
            {`Dernière mise à jour de la base FINESS: ${
              processusState
                ? format(new Date(processusState.end_date), "dd/MM/yyyy HH:mm")
                : ""
            }`}
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
