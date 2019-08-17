import React from "react";
import { Box, Button } from "rebass";
import { XCircle } from "styled-icons/boxicons-regular";
import { Card, Heading4, Text1Bold, Text1S } from "@socialgouv/emjpm-ui-core";

const ButtonStyle = {
  outline: "none",
  p: 1,
  bg: "cardSecondary",
  color: "black",
  border: "none",
  position: "absolute",
  right: 0,
  top: 0
};

const Panel = props => {
  const { currentPanel, togglePanel } = props;
  const available =
    currentPanel.mesures_max - currentPanel.mesures_in_progress - currentPanel.mesures_awaiting;
  return (
    <Box sx={{ position: "absolute", left: "0", bottom: "10px", minWidth: "230px" }}>
      <Card variant="sideCard">
        <Button sx={ButtonStyle} onClick={() => togglePanel({ isActive: false })}>
          <XCircle size={25} />
        </Button>
        <Heading4 mb="2">{currentPanel.department.nom}</Heading4>
        <Text1S mb="6px">{"Mesures en cours"}</Text1S>
        <Text1Bold mb="2">{currentPanel.mesures_in_progress}</Text1Bold>
        <Text1S mb="6px">{"Mesures disponibles"}</Text1S>
        <Text1Bold mb="2" color={available > 0 ? "success" : "error"}>
          {available}
        </Text1Bold>
        <Text1S mb="6px">{"Mesures max"}</Text1S>
        <Text1Bold mb="2">{currentPanel.mesures_max}</Text1Bold>
        <Text1S mb="6px">{"Mesures en attente"}</Text1S>
        <Text1Bold mb="2">{currentPanel.mesures_awaiting || 0}</Text1Bold>
      </Card>
    </Box>
  );
};

export default Panel;
