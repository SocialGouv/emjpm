import { Box } from "rebass";

import { Indicator } from "~/components";
import { FlexWrapper, fourColumnStyle } from "~/components/Grid";

export function DirectionEnqueteDetailsInformationsClesIndicators(props) {
  const {
    preposesCount,
    individuelsCount,
    servicesCount,
    enqueteDraftCount,
    enqueteValidatedCount,
    enqueteSubmittedCount,
    daysBeforeClosing,
  } = props;

  return (
    <FlexWrapper flexWrap={"wrap"}>
      <Box sx={fourColumnStyle}>
        <Indicator title="Individuels" indicator={individuelsCount} />
      </Box>
      <Box sx={fourColumnStyle}>
        <Indicator title="Préposés" indicator={preposesCount} />
      </Box>
      <Box sx={fourColumnStyle}>
        <Indicator title="Services" indicator={servicesCount} />
      </Box>
      {daysBeforeClosing !== undefined && (
        <Box sx={fourColumnStyle}>
          {daysBeforeClosing >= 0 ? (
            <Indicator
              title="Jours avant cloture"
              indicator={daysBeforeClosing}
            />
          ) : (
            <Indicator
              title="Jours depuis la cloture"
              indicator={-daysBeforeClosing}
            />
          )}
        </Box>
      )}
      <Box sx={fourColumnStyle}>
        <Indicator
          title="Réponses attendues"
          indicator={preposesCount + individuelsCount + servicesCount}
        />
      </Box>
      <Box sx={fourColumnStyle}>
        <Indicator title="Réponses en cours" indicator={enqueteDraftCount} />
      </Box>
      <Box sx={fourColumnStyle}>
        <Indicator
          title="Réponses envoyées"
          indicator={enqueteSubmittedCount}
        />
      </Box>
      <Box sx={fourColumnStyle}>
        <Indicator
          title="Réponses validées"
          indicator={enqueteValidatedCount}
        />
      </Box>
    </FlexWrapper>
  );
}
