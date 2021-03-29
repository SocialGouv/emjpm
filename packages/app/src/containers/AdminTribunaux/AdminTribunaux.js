import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";

import useQueryReady from "~/hooks/useQueryReady";
import { Context as AdminFilterContext } from "~/containers/FilterWidgets/context";
import { PaginatedList } from "~/containers/PaginatedList";

import useEffectObjectValuesChangeCallback from "~/hooks/useEffectObjectValuesChangeCallback";

import { TRIBUNAUX } from "./queries";

import RowItem from "./RowItem";

function AdminTribunaux() {
  const resultPerPage = 10;
  const [currentOffset, setCurrentOffset] = useState(0);
  const {
    debouncedFilters: { searchText },
    filters: { departementCode },
  } = useContext(AdminFilterContext);

  useEffectObjectValuesChangeCallback({ searchText, departementCode }, () => {
    if (currentOffset !== 0) {
      setCurrentOffset(0);
    }
  });

  const { data, error, loading } = useQuery(TRIBUNAUX, {
    fetchPolicy: "network-only",
    variables: {
      departementCode,
      limit: resultPerPage,
      offset: currentOffset,
      searchText: searchText && searchText !== "" ? `%${searchText}%` : null,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { count } = data.tis_aggregate.aggregate;
  const tis = data.tis;

  return (
    <PaginatedList
      entries={tis}
      RowItem={RowItem}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
}

export { AdminTribunaux };
