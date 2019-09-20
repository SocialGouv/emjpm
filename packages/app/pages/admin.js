import React from "react";
import { Home, User } from "react-feather";

import { Layout, DummyTabs } from "../src/components";
import Users from "../src/components/admin/Users";
import TableState from "../src/components/common/TableState";

const tabs = [
  {
    text: "Utilisateurs",
    url: "/admin/users",
    icon: <User />,
    content: (
      <div style={{ paddingTop: 10, background: "rgb(215, 223, 232)" }}>
        <h2 style={{ padding: "10px" }}>Gestion des utilisateurs</h2>
        <Users type={"mandataires"} />
      </div>
    )
  },
  {
    text: "TI",
    url: "/admin/ti",
    icon: <Home />,
    content: (
      <div style={{ paddingTop: 10, background: "rgb(215, 223, 232)" }}>
        <h2 style={{ padding: "10px" }}>Gestion des TI</h2>
        <Users type={"tis"} />
      </div>
    )
  },
  {
    text: "Direction",
    url: "/admin/direction",
    icon: <Home />,
    content: (
      <div style={{ paddingTop: 10, background: "rgb(215, 223, 232)" }}>
        <h2 style={{ padding: "10px" }}>Gestion des DR-DD</h2>
        <Users type={"directions"} />
      </div>
    )
  }
];

const AdminPage = () => (
  <Layout logout>
    <h2 style={{ margin: "30px 0" }}>Administration e-MJPM</h2>

    <TableState
      render={({ onSelect, activeTabIndex }) => {
        return <DummyTabs tabs={tabs} onSelect={onSelect} activeTabIndex={activeTabIndex} />;
      }}
    />
  </Layout>
);
export default AdminPage;
