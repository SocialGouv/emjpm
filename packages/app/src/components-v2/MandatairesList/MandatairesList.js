import React, { useState } from "react";
import { Box } from "rebass";
import { useQuery } from "@apollo/react-hooks";
import { Card, Heading2, Heading4, Spinner, Button, Text } from "@socialgouv/emjpm-ui-core";
import { Mandatairelist } from "@socialgouv/emjpm-ui-components";

import { MandatairesListStyle } from "./style";
import { GET_MANDATAIRES } from "./queries";

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

  const datas = data.view_mesure_gestionnaire.map(mandataire => {
    let currentDiscriminator = {};
    const {
      discriminator,
      user,
      service,
      mesures_max,
      mesures_in_progress,
      source_id
    } = mandataire;
    const common = {
      currentAvailability: mesures_max - mesures_in_progress,
      dispo_max: mesures_max || 0,
      id: source_id,
      isAvailable: mesures_max < mesures_in_progress,
      cvLink: "test"
    };
    if (discriminator === "SERVICE") {
      currentDiscriminator = {
        email: service.email,
        nom: service.nom,
        prenom: service.prenom,
        telephone_portable: service.telephone,
        ville: service.ville
      };
    } else {
      currentDiscriminator = {
        email: user ? user.email : "Email",
        nom: user ? user.nom : "",
        prenom: user ? user.prenom : "",
        telephone_portable: user && user.mandataire ? user.mandataire.telephone : "Téléphone",
        ville: user && user.mandataire ? user.mandataire.ville : "Ville",
        isWoman: user && user.mandataire ? user.mandataire.genre === "H" : true
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
