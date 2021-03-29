import { Input } from "~/components";
import { Box } from "rebass";
import { Context } from "./context";
import { useContext, useCallback } from "react";

export default function SearchFilter() {
  const {
    filters: { searchText },
    setFilter,
  } = useContext(Context);

  const changeSearchText = useCallback(
    (value) => {
      setFilter("searchText", value);
    },
    [setFilter]
  );

  return (
    <Box width="170px" mr={1}>
      <Input
        value={searchText}
        spellCheck="false"
        autoComplete="false"
        onChange={(event) => changeSearchText(event.target.value)}
        name="search"
        size="small"
        label="Rechercher"
      />
    </Box>
  );
}
