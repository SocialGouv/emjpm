import { isMandataire, isService } from "@emjpm/biz";
import { useContext } from "react";
import { Box, Flex } from "rebass";

import { MesureBadge } from "~/components/MesureBadge";
import { UserContext } from "~/components/UserContext";

import Link from "./Link";

const ServiceBadge = ({ service }) => {
  const { mesures_in_progress: mesures_en_cours, dispo_max } = service;
  return (
    <Box pl="5">
      <MesureBadge mesures_en_cours={mesures_en_cours} dispo_max={dispo_max} />
    </Box>
  );
};

const MandataireBadge = ({ mandataire }) => {
  const { mesures_en_cours, dispo_max } = mandataire;
  return (
    <Box pl="5">
      <MesureBadge mesures_en_cours={mesures_en_cours} dispo_max={dispo_max} />
    </Box>
  );
};

export const Navigation = (props) => {
  const { links } = props;
  const user = useContext(UserContext);
  return (
    <Box mt="2">
      <Flex alignItems="center" flexWrap="wrap">
        {links.map(({ title, to }) => (
          <Box key={title} px={1}>
            <Link to={to}>{title}</Link>
          </Box>
        ))}
        {isMandataire(user) && <MandataireBadge mandataire={user.mandataire} />}
        {isService(user) && <ServiceBadge service={user.service} />}
      </Flex>
    </Box>
  );
};
