import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  AsyncSelect,
  Button,
  Card,
  Heading4,
  Input,
  Select,
  Text
} from "@socialgouv/emjpm-ui-core";
import { useFormik } from "formik";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import { CIVILITY, MESURE_TYPE_LABEL_VALUE, RESIDENCE } from "../../constants/mesures";
import { serviceMesureSchema } from "../../lib/validationSchemas";
import { getRegionCode } from "../../util/departements";
import { debouncedGeocode } from "../../util/geocode";
import { ADD_MESURE, UPDATE_ANTENNE_COUTERS, UPDATE_SERVICES_COUTERS } from "./mutations";
import { DEPARTEMENTS, SERVICE_TRIBUNAL } from "./queries";
import { formatServiceTribunalList } from "./utils";

const initialValues = {
  annee: "",
  antenne: "",
  civilite: "",
  code_postal: "",
  date_ouverture: "",
  numero_dossier: "",
  numero_rg: "",
  tribunal: "",
  geocode: {}
};

export const ServiceAddMesure = props => {
  const {
    user_antennes,
    service_admins: [service]
  } = props;

  const formik = useFormik({
    onSubmit: (values, { setSubmitting, setErrors }) => {
      const regionCode = getRegionCode(values.geocode.postcode);
      const departements = departementsData.departements;
      const departement = departements.find(dep => dep.code === regionCode);

      if (!departement) {
        setErrors({
          code_postal: `Aucun département trouvé pour le code postal ${values.code_postal}`
        });
      } else {
        addMesure({
          awaitRefetchQueries: true,
          refetchQueries: ["mesures", "mesures_aggregate"],
          variables: {
            annee: values.annee.toString(),
            antenne_id: values.antenne ? Number.parseInt(values.antenne.value) : null,
            civilite: values.civilite.value,
            code_postal: values.geocode.postcode,
            ville: values.geocode.city,
            latitude: values.geocode.lat,
            longitude: values.geocode.lng,
            date_ouverture: values.date_ouverture,
            department_id: departement.id,
            numero_dossier: values.numero_dossier,
            numero_rg: values.numero_rg,
            residence: values.residence.value,
            ti_id: values.tribunal.value,
            type: values.type.value
          }
        });

        Router.push("/services");
      }

      setSubmitting(false);
    },
    initialValues,
    validationSchema: serviceMesureSchema
  });

  const { loading, error, data } = useQuery(SERVICE_TRIBUNAL, {
    variables: { serviceId: service.service_id }
  });

  const {
    data: departementsData,
    loading: departementsLoading,
    error: departementsError
  } = useQuery(DEPARTEMENTS);

  const [updateAntenneCounters] = useMutation(UPDATE_ANTENNE_COUTERS);
  const [updateServicesCounter] = useMutation(UPDATE_SERVICES_COUTERS);

  const [addMesure] = useMutation(ADD_MESURE, {
    options: { refetchQueries: ["mesures", "mesures_aggregate"] },
    update(
      cache,
      {
        data: {
          insert_mesures: { returning }
        }
      }
    ) {
      const [mesure] = returning;

      updateServicesCounter({
        variables: {
          mesures_awaiting: 0,
          mesures_in_progress: 1,
          service_id: mesure.service_id
        }
      });

      if (mesure.antenne_id) {
        updateAntenneCounters({
          variables: {
            antenne_id: mesure.antenne_id,
            inc_mesures_awaiting: -1,
            inc_mesures_in_progress: 1
          }
        });
      }
    }
  });

  if (loading || departementsLoading) {
    return <div>Chargement...</div>;
  }

  if (error || departementsError) {
    return <div>Erreur...</div>;
  }

  const antenneOptions = user_antennes.map(ua => ({
    label: ua.service_antenne.name,
    value: ua.service_antenne.id
  }));

  const tribunalList = formatServiceTribunalList(data.service_tis);

  return (
    <Card m="1" mt="5" p="0">
      <Flex flexWrap="wrap" {...props}>
        <Box width={[1, 2 / 5]} bg="cardSecondary" p="5">
          <Box height="280px">
            <Heading4>{`Informations générales`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              {`Informations relatives à votre mesure`}
            </Text>
          </Box>
          <Box height="280px">
            <Heading4>{`Caractéristique de la mesure`}</Heading4>
            <Text lineHeight="1.5" color="textSecondary">
              Ces informations nous permettent de vous présenter les mesures de mandataires les plus
              adaptés.
            </Text>
          </Box>
        </Box>
        <Box p="5" width={[1, 3 / 5]}>
          <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                <Input
                  value={formik.values.numero_rg}
                  id="numero_rg"
                  name="numero_rg"
                  hasError={formik.errors.numero_rg && formik.touched.numero_rg}
                  onChange={formik.handleChange}
                  placeholder="Numéro RG"
                />
                {formik.errors.numero_rg && formik.touched.numero_rg && (
                  <Text>{formik.errors.numero_rg}</Text>
                )}
              </Box>
              <Box sx={{ position: "relative", zIndex: "70" }} mb="2">
                <Select
                  id="tribunal"
                  name="tribunal"
                  placeholder="Tribunal"
                  value={formik.values.tribunal}
                  options={tribunalList}
                  hasError={formik.errors.tribunal && formik.touched.tribunal}
                  onChange={option => formik.setFieldValue("tribunal", option)}
                />
                {formik.errors.tribunal && formik.touched.tribunal && (
                  <Text>{formik.errors.tribunal}</Text>
                )}
              </Box>
              <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                <Input
                  value={formik.values.numero_dossier}
                  id="numero_dossier"
                  name="numero_dossier"
                  hasError={formik.errors.numero_dossier && formik.touched.numero_dossier}
                  onChange={formik.handleChange}
                  placeholder="Numero de dossier"
                />
                {formik.errors.numero_dossier && formik.touched.numero_dossier && (
                  <Text>{formik.errors.numero_dossier}</Text>
                )}
              </Box>
              <Box sx={{ position: "relative", zIndex: "110" }} mb="2">
                <Select
                  id="antenne"
                  name="antenne"
                  placeholder="Antenne"
                  value={formik.values.antenne}
                  hasError={formik.errors.antenne_id && formik.touched.antenne_id}
                  onChange={option => formik.setFieldValue("antenne", option)}
                  options={antenneOptions}
                />
                {formik.errors.antenne_id && formik.touched.antenne_id && (
                  <Text>{formik.errors.antenne_id}</Text>
                )}
              </Box>
              <Box mb="2" mt="5">
                <Input
                  value={formik.values.date_ouverture}
                  id="date_ouverture"
                  type="date"
                  name="date_ouverture"
                  hasError={formik.errors.date_ouverture && formik.touched.date_ouverture}
                  onChange={formik.handleChange}
                  placeholder="Date d'ouverture"
                />
                {formik.errors.date_ouverture && formik.touched.date_ouverture && (
                  <Text>{formik.errors.date_ouverture}</Text>
                )}
              </Box>
              <Box sx={{ position: "relative", zIndex: "100" }} mb="2">
                <Select
                  id="type"
                  name="type"
                  placeholder="Type de mesure"
                  value={formik.values.type}
                  hasError={formik.errors.type && formik.touched.type}
                  onChange={option => formik.setFieldValue("type", option)}
                  options={MESURE_TYPE_LABEL_VALUE}
                />
                {formik.errors.type && formik.touched.type && <Text>{formik.errors.type}</Text>}
              </Box>
              <Box sx={{ position: "relative", zIndex: "80" }} mb="2">
                <Select
                  id="civilite"
                  name="civilite"
                  placeholder="Civilité"
                  value={formik.values.civilite}
                  hasError={formik.errors.civilite && formik.touched.civilite}
                  onChange={option => formik.setFieldValue("civilite", option)}
                  options={CIVILITY}
                />
                {formik.errors.civilite && formik.touched.civilite && (
                  <Text>{formik.errors.civilite}</Text>
                )}
              </Box>

              <Box sx={{ position: "relative", zIndex: "1" }} mb="2">
                <Input
                  value={formik.values.annee}
                  id="annee"
                  name="annee"
                  type="number"
                  hasError={formik.errors.annee && formik.touched.annee}
                  onChange={formik.handleChange}
                  placeholder="année"
                />
                {formik.errors.annee && formik.touched.annee && <Text>{formik.errors.annee}</Text>}
              </Box>
              <Box sx={{ position: "relative", zIndex: "90" }} mt="5" mb="2">
                <Select
                  id="residence"
                  name="residence"
                  placeholder="Type de residence"
                  value={formik.values.residence}
                  hasError={formik.errors.residence && formik.touched.residence}
                  onChange={option => formik.setFieldValue("residence", option)}
                  options={RESIDENCE}
                />
                {formik.errors.residence && formik.touched.residence && (
                  <Text>{formik.errors.residence}</Text>
                )}
              </Box>

              <Box sx={{ position: "relative", zIndex: "85" }} mb="2">
                <AsyncSelect
                  name="geocode"
                  cacheOptions
                  defaultOptions
                  hasError={formik.errors}
                  isClearable
                  loadOptions={debouncedGeocode}
                  placeholder="Ville, code postal, ..."
                  noOptionsMessage={() => "Pas de résultats"}
                  onChange={option => formik.setFieldValue("geocode", option ? option.value : null)}
                />
                {formik.errors.geocode && formik.touched.geocode && (
                  <Text>{formik.errors.geocode}</Text>
                )}
                {formik.errors.code_postal && <Text>{formik.errors.codePostal}</Text>}
              </Box>

              <Flex justifyContent="flex-end">
                <Box>
                  <Button mr="2" variant="outline">
                    <Link href="/services">
                      <a>Annuler</a>
                    </Link>
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
