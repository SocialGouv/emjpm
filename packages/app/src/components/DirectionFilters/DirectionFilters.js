import { useQuery } from "@apollo/react-hooks";
import { Card, Input, Select } from "@emjpm/ui";
import React, { useContext, useMemo } from "react";
import { Box, Flex, Text } from "rebass";

import { FiltersContextSerializable } from "~/components/FiltersContextSerializable";
import {
  departementToOptions,
  findOption,
  regionsToOptions,
} from "~/util/option/OptionUtil";

import { GET_REGIONS } from "./queries";
import { BoxStyle, SimpleBoxStyle, TextStyle } from "./style";

export const DirectionFilters = (props) => {
  const { useNameFilter = false } = props;

  const { data: regionsData, loading, error } = useQuery(GET_REGIONS);
  const { filters, onFilterChange } = useContext(FiltersContextSerializable);

  const { regions, departements } = useMemo(() => {
    const regions = regionsData?.regions || [];

    if (!filters?.region) {
      return { departements: [], regions };
    }

    const departements = regions
      .filter((r) => r.id === filters.region)
      .reduce((acc, item) => {
        item.departements.forEach((departement) => {
          acc.push(departement);
        });
        return acc;
      }, []);

    return { departements, regions };
  }, [regionsData, filters]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Une erreur est survenue, veuillez réessayer plus tard.</div>;
  }

  const regionOptions = regionsToOptions(regions);
  const departementOptions = departementToOptions(departements);

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
                  onChange={(event) =>
                    onFilterChange({ nom: event.target.value })
                  }
                  name="nom"
                  size="small"
                  placeholder="nom"
                />
              </Box>
            )}
            <Box sx={BoxStyle}>
              <Select
                size="small"
                options={regionOptions}
                placeholder={"region"}
                value={findOption(regionOptions, filters.region)}
                onChange={(option) =>
                  onFilterChange({
                    departement: null,
                    region: option.value,
                  })
                }
              />
            </Box>
            <Box sx={BoxStyle}>
              <Select
                size="small"
                options={departementOptions}
                placeholder={"departement"}
                value={findOption(departementOptions, filters.departement)}
                onChange={(option) =>
                  onFilterChange({ departement: option.value })
                }
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
                onChange={(event) =>
                  onFilterChange({ startDate: event.target.value })
                }
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
                onChange={(event) =>
                  onFilterChange({ endDate: event.target.value })
                }
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
