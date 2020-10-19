import React, { useContext } from "react";
import { Box, Flex } from "rebass";

import { isMandataire } from "../../util";
import { UserContext } from "../UserContext";
import Link from "./Link";

const MandataireBadge = ({ mandataire }) => {
  const { mesures_en_cours, dispo_max } = mandataire;
  return (
    <Box
      sx={{
        color: "white",
        bg: mesures_en_cours > dispo_max ? "error" : "primary",
        px: 1,
        mb: 2,
        ml: 3,
        borderRadius: 9999,
      }}
      variant="badge"
    >
      {mesures_en_cours} / {dispo_max} mesures
    </Box>
  );
};

export const Navigation = (props) => {
  const { links } = props;
  const user = useContext(UserContext);
  const { type } = user;
  return (
    <Box mt="2">
      <Flex alignItems="center" flexWrap="wrap">
        {links.map(({ title, url, as }) => (
          <Box key={title} px={1}>
            <Link href={url} as={as}>
              {title}
            </Link>
          </Box>
        ))}
        {isMandataire(type) && <MandataireBadge mandataire={user.mandataire} />}
      </Flex>
    </Box>
  );
};
