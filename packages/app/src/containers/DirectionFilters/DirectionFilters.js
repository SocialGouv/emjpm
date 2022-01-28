import { useContext, useMemo } from "react";
import { Box, Flex } from "rebass";

import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import {
  Card,
  Input,
  AccessibleSelect as Select,
  InputDate,
} from "~/components";
import { findOption } from "~/utils/form";

import { BoxStyle, SimpleBoxStyle } from "./style";

import {
  createDepartementOptions,
  departementList,
  regionOptions,
} from "~/utils/geodata";

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
                label={"Région"}
                placeholder={"Région"}
                value={findOption(
                  regionOptions,
                  filters.region?.toString() || null
                )}
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
                label={"Département"}
                placeholder={"Département"}
                value={findOption(
                  departementOptions,
                  filters.departement || null
                )}
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
              <InputDate
                value={filters.startDate || ""}
                onChange={(value) => onFilterChange({ startDate: value })}
                name="startDate"
                label="du"
                placeholderText="date de début"
              />
            </Box>
            <Box sx={SimpleBoxStyle}>
              <InputDate
                value={filters.endDate || ""}
                onChange={(value) => onFilterChange({ endDate: value })}
                name="endDate"
                label="au"
                placeholderText="date de fin"
              />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}

export default DirectionFilters;
