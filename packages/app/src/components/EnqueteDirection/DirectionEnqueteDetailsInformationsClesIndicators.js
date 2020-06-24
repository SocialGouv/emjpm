import { FlexWrapper, fourColumnStyle, Indicator } from "@emjpm/ui";
import React from "react";
import { Box } from "rebass";

export const DirectionEnqueteDetailsInformationsClesIndicators = ({ directionEnqueteDetails }) => {
  const { destinatairesCount, enqueteReponsesCount, daysBeforeClosing } = directionEnqueteDetails;

  return (
    <FlexWrapper flexWrap={"wrap"}>
      <Box sx={fourColumnStyle}>
        <Indicator title="Destinataires" indicator={destinatairesCount} />
      </Box>
      <Box sx={fourColumnStyle}>
        <Indicator title="Réponses envoyées" indicator={enqueteReponsesCount} />
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
