import { useQuery } from "@apollo/react-hooks";
import { Mandatairelist } from "@socialgouv/emjpm-ui-components";
import { Button, Card, Heading2, Heading4, Spinner, Text } from "@socialgouv/emjpm-ui-core";
import React, { useState } from "react";
import { Box } from "rebass";
import { GET_MANDATAIRES } from "./queries";
import { MandatairesListStyle } from "./style";

const MandatairesList = props => {
  const [current, setCurrentPage] = useState(0);
  const { data, error, loading } = useQuery(GET_MANDATAIRES, {
    variables: {
      offset: current
    }
  });
  if (loading) {
    return (
      <Card>
        <Heading2>Répartition des mesures à date</Heading2>
        <Box my="5">
          <Spinner />
        </Box>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <Heading2>Répartition des mesures à date</Heading2>
        <Heading4>erreur</Heading4>
      </Card>
    );
  }

  const datas = data.mandatairesList.map(row => {
    let currentDiscriminator = {};
    const { mesures_max, mesures_in_progress, service, mandataire } = row;
    const common = {
      currentAvailability: mesures_max - mesures_in_progress,
      dispo_max: mesures_max || 0,
      isAvailable: mesures_max < mesures_in_progress,
      cvLink: "test"
    };
    if (service) {
      currentDiscriminator = {
        email: service.email,
        nom: service.nom,
        prenom: service.prenom,
        telephone_portable: service.telephone,
        ville: service.ville
      };
    } else {
      currentDiscriminator = {
        email: mandataire.user.email ? mandataire.user.email : "Email",
        nom: mandataire.user.nom,
        prenom: mandataire.user.prenom,
        telephone_portable: mandataire.telephone ? mandataire.user.telephone : "Téléphone",
        ville: mandataire.ville ? mandataire.ville : "Ville",
        isWoman: mandataire.genre === "H" ? false : true
      };
    }
    return {
      ...common,
      ...currentDiscriminator
    };
  });

  return (
    <Box sx={MandatairesListStyle} {...props}>
      <Mandatairelist mandataires={datas} />
      <Button onClick={() => setCurrentPage(current - 10)}>Prev</Button>
      <Text>{current / 10 + 1}</Text>
      <Button onClick={() => setCurrentPage(current + 10)}>Next</Button>
    </Box>
  );
};

export { MandatairesList };
