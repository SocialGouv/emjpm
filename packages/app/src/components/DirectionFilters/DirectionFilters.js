import { useQuery } from "@apollo/react-hooks";
import { Card, Input, Select } from "@emjpm/ui";
import React, { useContext, useMemo } from "react";
import { Box, Flex, Text } from "rebass";

import { departementToOptions, regionsToOptions } from "../../util/option/OptionUtil";
import { FiltersContextSerializable } from "../FiltersContextSerializable";
import { GET_REGIONS } from "./queries";
import { BoxStyle, SimpleBoxStyle, TextStyle } from "./style";

export const DirectionFilters = (props) => {
  const { useNameFilter = false } = props;

  const { data: regionsData, loading, error } = useQuery(GET_REGIONS);
  const { filters, onFilterChange } = useContext(FiltersContextSerializable);

  const { regions, departements } = useMemo(() => {
    const departements =
      regionsData && regionsData.regions
        ? regionsData.regions
            .filter((r) =>
              filters.region && filters.region.value ? r.id === filters.region.value : true
            )
            .reduce((acc, item) => {
              item.departements.forEach((departement) => {
                acc.push(departement);
              });
              return acc;
            }, [])
        : [];

    return { regions: regionsData ? regionsData.regions : [], departements };
  }, [regionsData, filters]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Une erreur est survenue, veuillez réessayer plus tard.</div>;
  }

  return (
    <Card>
      <Flex justifyContent={"space-between"} flexWrap="wrap">
        <Box>
          <Flex>
            <Text sx={TextStyle}>Affiner</Text>
            {useNameFilter && (
              <Box sx={BoxStyle}>
                <Input
                  value={filters.nom}
                  spellCheck="false"
                  autoComplete="false"
                  onChange={(event) => onFilterChange({ nom: event.target.value })}
                  name="nom"
                  size="small"
                  placeholder="nom"
                />
              </Box>
            )}
            <Box sx={BoxStyle}>
              <Select
                size="small"
                options={regionsToOptions(regions)}
                placeholder={"region"}
                value={filters.region}
                onChange={(selectedOption) =>
                  onFilterChange({ region: selectedOption, departement: null })
                }
              />
            </Box>
            <Box sx={BoxStyle}>
              <Select
                size="small"
                options={departementToOptions(departements)}
                placeholder={"departement"}
                value={filters.departement}
                onChange={(selectedOption) => onFilterChange({ departement: selectedOption })}
              />
            </Box>
          </Flex>
        </Box>
        <Box>
          <Flex>
            <Box sx={BoxStyle}>
              <Input
                value={filters.startDate}
                spellCheck="false"
                autoComplete="false"
                onChange={(event) => onFilterChange({ startDate: event.target.value })}
                name="startDate"
                size="small"
                type="date"
                placeholder="du"
              />
            </Box>
            <Box sx={SimpleBoxStyle}>
              <Input
                value={filters.endDate}
                spellCheck="false"
                autoComplete="false"
                onChange={(event) => onFilterChange({ endDate: event.target.value })}
                name="endDate"
                size="small"
                type="date"
                placeholder="au"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
};

export default DirectionFilters;
