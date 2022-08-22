import { Box } from "rebass";

import { Tabs as TabsComponent } from "~/components";

import TabPanelPaginatedList from "./TabPanelPaginatedList";

const { Tabs, TabList, Tab, TabPanel } = TabsComponent;

const TYPE_OPTIONS = [
  { label: "Tous les types", value: null },
  { label: "Mandataire Individuel", value: "individuel" },
  { label: "Mandataire Préposé", value: "prepose" },
  { label: "Service Mandataire", value: "service" },
  { label: "DPF Individuel", value: "dpfi" },
  { label: "Service DPF", value: "sdpf" },
  { label: "Magistrat", value: "ti" },
  { label: "Greffier", value: "greffier" },
  { label: "Direction", value: "direction" },
  { label: "Admin", value: "admin" },
];

function AdminUsers() {
  return (
    <Box>
      <Tabs>
        <TabList>
          {TYPE_OPTIONS.map(({ label }, index) => (
            <Tab key={index}>{label}</Tab>
          ))}
        </TabList>

        {TYPE_OPTIONS.map(({ value }, index) => (
          <TabPanel key={index}>
            <TabPanelPaginatedList type={value} />
          </TabPanel>
        ))}
      </Tabs>
    </Box>
  );
}

export { AdminUsers };
