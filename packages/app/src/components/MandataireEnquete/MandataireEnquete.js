import { Heading1, Tab, TabList, TabPanel, Tabs } from "@emjpm/ui";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useQuery } from "react-apollo";
import { Box } from "rebass";

import { MandataireEnqueteInformationAgrement } from "./MandataireEnqueteInformationAgrement";
import { MandataireEnqueteInformationExercice } from "./MandataireEnqueteInformationExercice";
import { MandataireEnqueteInformationFormation } from "./MandataireEnqueteInformationFormation";
import { MandataireEnqueteInformations } from "./MandataireEnqueteInformations";
import { ENQUETE } from "./queries";

export const MandataireEnquete = ({ id }) => {
  const { data, loading } = useQuery(ENQUETE, {
    variables: { id }
  });

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  const { enquetes_by_pk: enquete } = data;
  if (!enquete) {
    return null;
  }

  const { annee } = enquete;

  return (
    <Fragment>
      <Heading1 mb={5}>Enquête {annee}</Heading1>
      <Tabs p={0}>
        <TabList>
          <Tab>{`Informations générales`}</Tab>
          <Tab>{`Agrément`}</Tab>
          <Tab>{`Modalité d'exercice`}</Tab>
          <Tab>{`Formation`}</Tab>
        </TabList>
        <TabPanel>
          <MandataireEnqueteInformations />
        </TabPanel>
        <TabPanel>
          <MandataireEnqueteInformationAgrement />
        </TabPanel>
        <TabPanel>
          <MandataireEnqueteInformationExercice />
        </TabPanel>
        <TabPanel>
          <MandataireEnqueteInformationFormation />
        </TabPanel>
      </Tabs>
    </Fragment>
  );
};

MandataireEnquete.propTypes = {
  id: PropTypes.number.isRequired
};

export default MandataireEnquete;
