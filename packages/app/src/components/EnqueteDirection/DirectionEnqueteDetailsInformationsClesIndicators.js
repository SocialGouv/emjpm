import { FlexWrapper, fourColumnStyle, Indicator } from "@emjpm/ui";
import React from "react";
import { Box } from "rebass";

export const DirectionEnqueteDetailsInformationsClesIndicators = (props) => {
  const { destinatairesCount, enqueteDraftCount, enqueteSubmittedCount, daysBeforeClosing } = props;

  return (
    <FlexWrapper flexWrap={"wrap"}>
      <Box sx={fourColumnStyle}>
        <Indicator title="Destinataires" indicator={destinatairesCount} />
      </Box>
      <Box sx={fourColumnStyle}>
        <Indicator title="Réponses en cours" indicator={enqueteDraftCount} />
      </Box>
      <Box sx={fourColumnStyle}>
        <Indicator title="Réponses envoyées" indicator={enqueteSubmittedCount} />
      </Box>
      {daysBeforeClosing !== undefined && (
        <Box sx={fourColumnStyle}>
          {daysBeforeClosing >= 0 ? (
            <Indicator title="Jours avant cloture" indicator={daysBeforeClosing} />
          ) : (
            <Indicator title="Jours depuis la cloture" indicator={-daysBeforeClosing} />
          )}
        </Box>
      )}
    </FlexWrapper>
  );
};
