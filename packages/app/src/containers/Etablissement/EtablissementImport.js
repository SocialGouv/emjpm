import { useMemo } from "react";
import { format } from "date-fns";
import { useFormik } from "formik";

import { useMutation, useQuery } from "@apollo/client";
import { Box, Card, Flex } from "rebass";

import { Button, Heading, Input, Text } from "~/components";
import useQueryReady from "~/hooks/useQueryReady";

import { IMPORT_FINESS } from "./mutations";
import { RUNNING_PROCESSUS_STATE } from "./queries";

export function EtablissementImport() {
  const now = useMemo(() => new Date(), []);
  const { data, loading, error } = useQuery(RUNNING_PROCESSUS_STATE, {
    fetchPolicy: "network-only",
    variables: {
      now,
    },
  });

  const [importFiness] = useMutation(IMPORT_FINESS);

  const formik = useFormik({
    initialValues: {
      url:
        "https://www.data.gouv.fr/fr/datasets/r/9b81484a-0deb-42f7-a7c4-eb9869ea580a",
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

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const processusState = data.processus_states[0];
  if (processusState) {
    return (
      <Card mb="5">
        <Flex flexDirection="column">
          <Box mt={2}>
            <Heading size={3} mb="2">
              {"Mise à jour de la base de données FINESS"}
            </Heading>
            <Text mb="1" lineHeight="2">
              {`Un import des données de FINESS est en cours. Date de début: ${format(
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
          <Heading size={3} mb="2">
            {"Mise à jour de la base de données FINESS"}
          </Heading>
          <Text mb="1" lineHeight="2">
            {`Dernière mise à jour de la base FINESS: ${
              processusState?.end_date
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
}

export default EtablissementImport;
