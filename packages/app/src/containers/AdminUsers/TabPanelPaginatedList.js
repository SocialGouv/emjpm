import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box } from "rebass";

import useEffectObjectValuesChangeCallback from "~/hooks/useEffectObjectValuesChangeCallback";

import { Context as AdminFilterContext } from "~/containers/FilterWidgets/context";
import { PaginatedList } from "~/containers/PaginatedList";

import { AdminInvitationCreate } from "~/containers/AdminInvitationCreate";
import { AdminInvitations } from "~/containers/AdminInvitations";

import { USERS } from "./queries";

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

  const orderBy = [];
  if (!searchText) {
    orderBy.push({ active: "asc" });
    orderBy.push({ id: "desc" });
  }

  const { data, error, loading } = useQuery(USERS, {
    fetchPolicy: "network-only",
    variables: {
      orderBy,
      limit: resultPerPage,
      offset: currentOffset,
      search: searchText || null,
      type: selectedType,
    },
  });

  if (!useQueryReady(loading, error)) {
    return null;
  }

  const { count } = data.search_users_aggregate.aggregate;
  const users = data.search_users;

  return (
    <>
      <PaginatedList
        entries={users}
        RowItem={RowItem}
        count={count}
        resultPerPage={resultPerPage}
        currentOffset={currentOffset}
        setCurrentOffset={setCurrentOffset}
      />
      {selectedType === "admin" && (
        <Box mt={3}>
          <AdminInvitations />
          <AdminInvitationCreate />
        </Box>
      )}
    </>
  );
}
