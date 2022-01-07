import { useHistory } from "react-router-dom";

import { Box } from "rebass";

import { Tabs as TabsComponent } from "~/components";

import TabPanelPaginatedList from "./TabPanelPaginatedList";

const { Tabs, TabList, Tab, TabPanel } = TabsComponent;

const TYPE_OPTIONS = [
  { label: "Tous les types", value: null },
  { label: "Mandataire Individuel", value: "individuel" },
  { label: "Mandataire Préposé", value: "prepose" },
  { label: "Service", value: "service" },
];

export function ListeBlanche(props) {
  const { origin } = props;
  const history = useHistory();

  const getHref = (item) => {
    const { liste_blanche } = item;
    return `/${origin}/liste-blanche/${liste_blanche.id}`;
  };

  const onRowClick = async (item, e) => {
    if (e.ctrlKey) {
      return;
    }
    e.preventDefault();
    const selection = window.getSelection().toString();
    if (selection.length > 0) {
      return;
    }
    const to = getHref(item);
    if (to) {
      await history.push(to);
    }
    window.scrollTo(0, 0);
  };

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
            <TabPanelPaginatedList
              {...props}
              type={value}
              getHref={getHref}
              onRowClick={onRowClick}
            />
          </TabPanel>
        ))}
      </Tabs>
    </Box>
  );
}

export default ListeBlanche;
