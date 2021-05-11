import { useMemo, useEffect } from "react";
import { format } from "date-fns";
import { useFormik } from "formik";

import { useMutation, useQuery } from "@apollo/client";
import { Box, Card, Flex } from "rebass";

import { Button, Heading, Input, Text } from "~/components";
import useQueryReady from "~/hooks/useQueryReady";

import { IMPORT_FINESS, CONFIG_FINESS_DATASET_URL } from "./mutations";
import { ROUTINE_IMPORT_FINESS } from "./queries";

import { toast } from "react-toastify";

const timeout = 3600;

export function EtablissementImport() {
  const { data, loading, error } = useQuery(ROUTINE_IMPORT_FINESS, {
    fetchPolicy: "network-only",
  });
  const [importFiness, { loading: loading1, error: error1 }] =
    useMutation(IMPORT_FINESS);
  const [configFinessDatasetUrl, { loading: loading2, error: error2 }] =
    useMutation(CONFIG_FINESS_DATASET_URL);

  useQueryReady(loading1, error1);
  useQueryReady(loading2, error2);

  const initialFinessDatasetUrl = data?.config_finess_dataset_url.value;

  const runImportFiness = async () => {
    await importFiness();
    document.location.reload();
  };

  const formik = useFormik({
    initialValues: {
      url: initialFinessDatasetUrl,
    },
    onSubmit: async (values, { setSubmitting }) => {
      await configFinessDatasetUrl({
        variables: {
          url: formik.values.url,
        },
      });
      toast.success("Nouvelle configuration enregistrée");
      setSubmitting(false);
    },
  });

  const { setFieldValue } = formik;
  useEffect(() => {
    if (initialFinessDatasetUrl) {
      setFieldValue("url", initialFinessDatasetUrl);
    }
  }, [initialFinessDatasetUrl, setFieldValue]);

  let isRunning = false;
  const expired = useMemo(() => {
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() - timeout);
    return expiration;
  }, []);

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const [lastStarted] = data.routine_log;
  if (
    lastStarted &&
    lastStarted.end_date === null &&
    new Date(lastStarted.start_date) > expired
  ) {
    isRunning = true;
  }

  if (isRunning) {
    return (
      <Card mb="5">
        <Flex flexDirection="column">
          <Box mt={2}>
            <Heading size={3} mb="2">
              {"Mise à jour de la base de données FINESS"}
            </Heading>
            <Text mb="1" lineHeight="2">
              {`Un import des données de FINESS est en cours. Date de début: ${format(
                new Date(lastStarted.start_date),
                "dd/MM/yyyy HH:mm"
              )}`}
            </Text>
          </Box>
        </Flex>
      </Card>
    );
  }

  const [last] = data.last;
  return (
    <Card mb="5">
      <Flex flexDirection="column">
        <Box mt={2}>
          <Heading size={3} mb="2">
            {"Mise à jour de la base de données FINESS"}
          </Heading>
          <Text mb="1" lineHeight="2">
            {`Dernière mise à jour de la base FINESS: ${
              last?.end_date
                ? format(new Date(last.end_date), "dd/MM/yyyy HH:mm")
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
            <Flex mt={4} justifyContent="space-between">
              <Box>
                <Button type="submit">Enregister</Button>
              </Box>
              <Box>
                <Button onClick={runImportFiness}>Importer maintenant</Button>
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </Card>
  );
}

export default EtablissementImport;
