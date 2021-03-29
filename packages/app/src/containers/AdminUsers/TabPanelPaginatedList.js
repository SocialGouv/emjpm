import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";

import useEffectObjectValuesChangeCallback from "~/hooks/useEffectObjectValuesChangeCallback";

import { Context as AdminFilterContext } from "~/containers/FilterWidgets/context";
import { PaginatedList } from "~/containers/PaginatedList";

import { USERS } from "./queries";

import castInt from "~/utils/std/castInt";
import useQueryReady from "~/hooks/useQueryReady";
import RowItem from "./RowItem";

export default function TabPanelPaginatedList({ type: selectedType }) {
  const resultPerPage = 10;
  const [currentOffset, setCurrentOffset] = useState(0);
  const {
    debouncedFilters: { searchText },
  } = useContext(AdminFilterContext);

  useEffectObjectValuesChangeCallback({ searchText, selectedType }, () => {
    if (currentOffset !== 0) {
      setCurrentOffset(0);
    }
  });

  const searchId = castInt(searchText);

  const { data, error, loading } = useQuery(USERS, {
    fetchPolicy: "network-only",

    variables: {
      limit: resultPerPage,
      offset: currentOffset,
      searchId,
      searchText: searchText && searchText !== "" ? `%${searchText}%` : null,
      type: selectedType,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { count } = data.users_aggregate.aggregate;
  const users = data.users;

  return (
    <PaginatedList
      entries={users}
      RowItem={RowItem}
      count={count}
      resultPerPage={resultPerPage}
      currentOffset={currentOffset}
      setCurrentOffset={setCurrentOffset}
    />
  );
}
