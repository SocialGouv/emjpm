import { useMutation, useQuery } from "@apollo/react-hooks";
import { Card, Heading4, Text } from "@emjpm/ui";
import Router from "next/router";
import React from "react";
import { Box, Flex } from "rebass";

import { getRegionCode } from "../../util/departements";
import { formatServiceTribunalList } from "../../util/services";
import { ADD_MESURE, RECALCULATE_SERVICE_MESURES } from "./mutations";
import { DEPARTEMENTS, SERVICE_TRIBUNAL } from "./queries";
import { ServiceMesureCreateForm } from "./ServiceMesureCreateForm";

export const ServiceMesureCreate = props => {
  const { service } = props;
  const { service_antennes } = service;

  const { loading, error, data } = useQuery(SERVICE_TRIBUNAL, {
    variables: { serviceId: service.id }
  });

  const {
    data: departementsData,
    loading: departementsLoading,
    error: departementsError
  } = useQuery(DEPARTEMENTS);

  const [recalculateServiceMesure] = useMutation(RECALCULATE_SERVICE_MESURES);
  const [addMesure] = useMutation(ADD_MESURE, {
    options: { refetchQueries: ["mesures", "mesures_aggregate"] },
    onCompleted: async ({ insert_mesures }) => {
      const [mesure] = insert_mesures.returning;
      await recalculateServiceMesure({ variables: { service_id: mesure.service_id } });
      await Router.push("/services/mesures/[mesure_id]", `/services/mesures/${mesure.id}`, {
        shallow: true
      });
    }
  });

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const variables = {};

    if (values.country.value === "FR") {
      const regionCode = getRegionCode(values.geocode.postcode);
      const departements = departementsData.departements;
      const departement = departements.find(dep => dep.code === regionCode);

      if (!departement) {
        setErrors({
          code_postal: `Aucun département trouvé pour le code postal ${values.code_postal}`
        });
        return setSubmitting(false);
      } else {
        variables.code_postal = values.geocode.postcode;
        variables.ville = values.geocode.city;
        variables.latitude = values.geocode.latitude;
        variables.longitude = values.geocode.longitude;
        variables.department_id = departement.id;
      }
    }

    addMesure({
      awaitRefetchQueries: true,
      refetchQueries: ["mesures", "mesures_aggregate"],
      variables: {
        ...variables,
        annee: values.annee.toString(),
        antenne_id: values.antenne ? Number.parseInt(values.antenne.value) : null,
        civilite: values.civilite.value,
        date_ouverture: values.date_ouverture,
        numero_dossier: values.numero_dossier,
        numero_rg: values.numero_rg,
        residence: values.residence.value,
        ti_id: values.tribunal.value,
        type: values.type.value,
        pays: values.country.value,
        cabinet: values.cabinet
      }
    });

    setSubmitting(false);
  };

  if (loading || departementsLoading) {
    return <div>Chargement...</div>;
  }

  if (error || departementsError) {
    return <div>Erreur...</div>;
  }

  const antenneOptions = service_antennes.map(antenne => ({
    label: antenne.name,
    value: antenne.id
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
          <ServiceMesureCreateForm
            handleSubmit={handleSubmit}
            tribunalList={tribunalList}
            antenneOptions={antenneOptions}
          />
        </Box>
      </Flex>
    </Card>
  );
};
