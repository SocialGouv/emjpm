import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box } from "rebass";

import useEffectObjectValuesChangeCallback from "~/hooks/useEffectObjectValuesChangeCallback";

import { AdminFilterContext } from "~/containers/AdminFilterBar/context";
import { PaginatedList } from "~/containers/PaginatedList";
import { Tabs as TabsComponent } from "~/components";

import { USERS } from "./queries";

import useQueryReady from "~/hooks/useQueryReady";
import RowItem from "./RowItem";

const { Tabs, TabList, Tab, TabPanel } = TabsComponent;

const TYPE_OPTIONS = [
  { label: "Tous les types", value: null },
  { label: "Mandataire individuel", value: "individuel" },
  { label: "Mandataire préposé d'établissement", value: "prepose" },
  { label: "Membre d'un service", value: "service" },
  { label: "Magistrat", value: "ti" },
  { label: "Direction", value: "direction" },
  { label: "Admin", value: "admin" },
];

function TabPaginatedList({ type: selectedType }) {
  const resultPerPage = 10;
  const [currentOffset, setCurrentOffset] = useState(0);
  const { debouncedSearchText, debouncedSearchId } = useContext(
    AdminFilterContext
  );
  // const { debouncedSearchText, debouncedSearchId, selectedType } = useContext(
  //   AdminFilterContext
  // );

  useEffectObjectValuesChangeCallback(
    { debouncedSearchText, selectedType },
    () => {
      if (currentOffset !== 0) {
        setCurrentOffset(0);
      }
    }
  );

  const { data, error, loading } = useQuery(USERS, {
    fetchPolicy: "network-only",

    variables: {
      limit: resultPerPage,
      offset: currentOffset,
      searchId: debouncedSearchId,
      searchText:
        debouncedSearchText && debouncedSearchText !== ""
          ? `%${debouncedSearchText}%`
          : null,
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

function AdminUsers() {
  return (
    <Box>
      <Tabs>
        <TabList>
          {TYPE_OPTIONS.map(({ label }) => (
            <Tab>{label}</Tab>
          ))}
        </TabList>

        {TYPE_OPTIONS.map(({ value }) => (
          <TabPanel>
            <TabPaginatedList type={value} />
          </TabPanel>
        ))}
        <TabPanel></TabPanel>
      </Tabs>
    </Box>
  );
}

export { AdminUsers };
