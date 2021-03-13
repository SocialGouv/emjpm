import { useQuery } from "@apollo/client";
import { useContext, useState } from "react";

import { AdminFilterContext } from "~/containers/AdminFilterBar/context";
import { PaginatedList } from "~/containers/PaginatedList";
import useQueryReady from "~/hooks/useQueryReady";

import useEffectObjectValuesChangeCallback from "~/hooks/useEffectObjectValuesChangeCallback";

import { SERVICES } from "./queries";

import RowItem from "./RowItem";

function AdminServices() {
  const [currentOffset, setCurrentOffset] = useState(0);
  const resultPerPage = 10;
  const { debouncedSearchText } = useContext(AdminFilterContext);

  useEffectObjectValuesChangeCallback({ debouncedSearchText }, () => {
    if (currentOffset !== 0) {
      setCurrentOffset(0);
    }
  });

  const { data, error, loading } = useQuery(SERVICES, {
    fetchPolicy: "network-only",
    variables: {
      limit: resultPerPage,
      offset: currentOffset,
      searchText:
        debouncedSearchText && debouncedSearchText !== ""
          ? `%${debouncedSearchText}%`
          : null,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { count } = data.services_aggregate.aggregate;
  const services = data.services;

  return (
    <PaginatedList
      entries={services}
      RowItem={RowItem}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
}

export { AdminServices };
