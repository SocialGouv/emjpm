import { Heading1, Tab, TabList, TabPanel, Tabs } from "@emjpm/ui";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { useQuery } from "react-apollo";
import { Box } from "rebass";

import { MandataireEnqueteInformations } from "./MandataireEnqueteInformations";
import { ENQUETE } from "./queries";

export const MandataireEnquete = ({ id }) => {
  const { data, loading } = useQuery(ENQUETE, {
    variables: { id }
  });

  if (loading) {
    return <Box>Chargement...</Box>;
  }

  const { enquiries_by_pk: enquete } = data;
  const { year } = enquete;

  return (
    <Fragment>
      <Heading1 mb={5}>Enquête {year}</Heading1>
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
        <TabPanel>{/* <IndividuelInformationAgrement /> */}</TabPanel>
        <TabPanel>{/* <IndividuelInformationExercice /> */}</TabPanel>
        <TabPanel>{/* <IndividuelInformationFormation /> */}</TabPanel>
      </Tabs>
    </Fragment>
  );
};

MandataireEnquete.propTypes = {
  id: PropTypes.number.isRequired
};

export default MandataireEnquete;
