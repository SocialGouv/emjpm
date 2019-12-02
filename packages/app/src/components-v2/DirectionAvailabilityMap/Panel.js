import { Card, Heading4 } from "@socialgouv/emjpm-ui-core";
import React from "react";
import { Box, Button, Text } from "rebass";
import { XCircle } from "styled-icons/boxicons-regular";

const ButtonStyle = {
  bg: "cardSecondary",
  border: "none",
  color: "black",
  outline: "none",
  p: 1,
  position: "absolute",
  right: 0,
  top: 0
};

const Panel = props => {
  const { currentPanel, togglePanel } = props;
  const available =
    currentPanel.mesures_max - currentPanel.mesures_in_progress - currentPanel.mesures_awaiting;
  return (
    <Box sx={{ bottom: "10px", left: "0", minWidth: "230px", position: "absolute" }}>
      <Card variant="sideCard">
        <Button sx={ButtonStyle} onClick={() => togglePanel({ isActive: false })}>
          <XCircle size={25} />
        </Button>
        <Heading4 mb="2">{currentPanel.department.nom}</Heading4>
        <Text mb="6px">{"Mesures en cours"}</Text>
        <Text fontWeight="bold" mb="2">{`${currentPanel.mesures_in_progress}`}</Text>
        <Text mb="6px">{"Disponibilités"}</Text>
        <Text fontWeight="bold" mb="2" color={available > 0 ? "success" : "error"}>
          {available}
        </Text>
        <Text mb="6px">{"Mesures max"}</Text>
        <Text fontWeight="bold" mb="2">
          {currentPanel.mesures_max}
        </Text>
        <Text mb="6px">{"Mesures en attente"}</Text>
        <Text fontWeight="bold" mb="2">
          {currentPanel.mesures_awaiting || 0}
        </Text>
      </Card>
    </Box>
  );
};

export { Panel };
