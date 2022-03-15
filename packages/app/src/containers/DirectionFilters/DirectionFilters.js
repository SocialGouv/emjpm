import { useContext, useMemo } from "react";
import { Box, Flex } from "rebass";

import { FiltersContextSerializable } from "~/containers/FiltersContextSerializable";
import { Card, Input, AccessibleSelect, InputDate, SrOnly } from "~/components";
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
    <Card id="direction_filter" tabIndex="-1">
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
              <AccessibleSelect
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
              <AccessibleSelect
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
                ariaDescribedBy="format_attendu"
                ariaLabelledBy="start_date_label"
              />
              <SrOnly id="start_date_label">date de début</SrOnly>
            </Box>
            <Box sx={SimpleBoxStyle}>
              <InputDate
                value={filters.endDate || ""}
                onChange={(value) => onFilterChange({ endDate: value })}
                name="endDate"
                label="au"
                placeholderText="date de fin"
                ariaDescribedBy="format_attendu"
                ariaLabelledBy="end_date_label"
              />
            </Box>
            <SrOnly id="end_date_label">date de fin</SrOnly>
            <SrOnly id="format_attendu">format attendu : jj/mm/aaaa</SrOnly>
          </Flex>
        </Box>
      </Flex>
    </Card>
  );
}

export default DirectionFilters;
