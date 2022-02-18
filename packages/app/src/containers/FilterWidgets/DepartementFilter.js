import { useContext } from "react";
import { Box } from "rebass";
import { AccessibleSelect } from "~/components";
import { useDepartementsOptions } from "~/utils/departements";
import useQueryReady from "~/hooks/useQueryReady";
import { Context } from "./context";

import { findOption } from "~/utils/form";

const departementsOptionsConfig = {
  nullOption: {
    label: "Tous les départements",
  },
};

export default function DepartementFilter() {
  const {
    filters: { departementCode },
    setFilter,
  } = useContext(Context);
  const { departementsOptions, error, loading } = useDepartementsOptions(
    departementsOptionsConfig
  );

  if (!useQueryReady(loading, error)) {
    return null;
  }

  return (
    <Box width="250px" mr={1}>
      <AccessibleSelect
        instanceId={"departement-filter"}
        value={findOption(departementsOptions, departementCode)}
        options={departementsOptions}
        onChange={(option) => setFilter("departementCode", option.value)}
        name="departement"
        size="small"
        placeholder="Département"
      />
    </Box>
  );
}
