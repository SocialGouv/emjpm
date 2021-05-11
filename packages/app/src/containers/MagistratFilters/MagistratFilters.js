import { MESURE_PROTECTION } from "@emjpm/biz";
import { useContext } from "react";
import { Box, Flex } from "rebass";

import { DEFAULT_MESURE_NATURE } from "~/constants/mesures";
import { Card, Input, Select } from "~/components";

import { FiltersContext } from "./context";

function MagistratFilters() {
  const { natureMesure, changeNatureMesure, searchText, changeSearchText } =
    useContext(FiltersContext);

  return (
    <Card mt="3">
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Box width="200px" mr={1}>
              <Select
                instanceId={"nature-mesure-filter"}
                size="small"
                options={[DEFAULT_MESURE_NATURE].concat(
                  MESURE_PROTECTION.NATURE_MESURE.options
                )}
                placeholder={"Nature de la mesure"}
                value={natureMesure}
                onChange={(option) => changeNatureMesure(option)}
              />
            </Box>
            <Box width="320px" mr={1}>
              <Input
                value={searchText}
                spellCheck="false"
                autoComplete="false"
                onChange={(event) => changeSearchText(event.target.value)}
                name="search"
                size="small"
                placeholder="Numéro RG, Dossier, Ville, Code Postal..."
                label="Rechercher"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}
export { MagistratFilters };
