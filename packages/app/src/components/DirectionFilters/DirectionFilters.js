import { useQuery } from "@apollo/client";
import { useContext, useMemo } from "react";
import { Box, Flex, Text } from "rebass";

import { FiltersContextSerializable } from "~/components/FiltersContextSerializable";
import { Card, Input, Select } from "~/ui";
import { findOption } from "~/util/option/OptionUtil";

import { BoxStyle, SimpleBoxStyle, TextStyle } from "./style";

import {
  createDepartementOptions,
  departementList,
  regionOptions,
} from "~/util/geodata";

export function DirectionFilters(props) {
  const { useNameFilter = false } = props;

  const { filters, onFilterChange } = useContext(FiltersContextSerializable);

  const regionFilter = filters.region;
  const departementOptions = useMemo(() => {
    const departements = departementList.filter(
      ({ region }) =>
        !regionFilter || region.toString() === regionFilter.toString()
    );

    return createDepartementOptions(departements);
  }, [regionFilter]);

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
                instanceId={"direction-region-filter"}
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
                instanceId={"direction-departement-filter"}
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
}

export default DirectionFilters;
