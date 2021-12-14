import { isMandataire, isService } from "@emjpm/biz";
import { Box, Flex } from "rebass";

import { MesureBadge } from "~/containers/MesureBadge";
import useUser from "~/hooks/useUser";

import Link from "./Link";

function ServiceBadge({ service }) {
  const { mesures_in_progress: mesures_en_cours, dispo_max } = service;
  return (
    <Box pl="5">
      <MesureBadge mesures_en_cours={mesures_en_cours} dispo_max={dispo_max} />
    </Box>
  );
}

function MandataireBadge({ mandataire }) {
  const { mesures_en_cours, dispo_max } = mandataire;
  return (
    <Box pl="5">
      <MesureBadge mesures_en_cours={mesures_en_cours} dispo_max={dispo_max} />
    </Box>
  );
}

function Navigation({ links }) {
  const user = useUser();
  const suspendActivity = isService(user)
    ? user.service.suspend_activity
    : isMandataire(user)
    ? user.mandataire.suspend_activity
    : false;
  return (
    <Box mt="2">
      <Flex alignItems="center" flexWrap="wrap">
        {links.map(({ title, to, isActive }) => (
          <Box key={title} px={1}>
            <Link to={to} isActive={isActive}>
              {title}
            </Link>
          </Box>
        ))}
        {isMandataire(user) && <MandataireBadge mandataire={user.mandataire} />}
        {isService(user) && <ServiceBadge service={user.service} />}
        {suspendActivity && (
          <Box
            sx={{
              bg: "error",
              borderRadius: 9999,
              color: "white",
              ml: 3,
              mb: 2,
              px: 1,
            }}
          >
            Activité interrompue
          </Box>
        )}
      </Flex>
    </Box>
  );
}

export { Navigation };
