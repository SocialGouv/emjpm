import React from "react";
import { User, UserCheck } from "react-feather";
import TableUser from "./TableUser";
import { DummyTabs } from "..";
import TableState from "../common/TableState";

const tabs = type =>
  [
    {
      text: "Actifs",
      type: "mandataire",
      icon: <UserCheck />,
      url: "/admin/users/actifs",
      content: (
        <TableUser type={type} filters={{ "users.active": true }} hideColumns={["cabinet"]} />
      )
    },
    {
      text: "En attente de validation",
      icon: <User />,
      type: "mandataire",
      url: "/admin/users/en-attente",
      content: (
        <TableUser type={type} filters={{ "users.active": false }} hideColumns={["cabinet"]} />
      )
    },
    {
      text: "Actifs",
      icon: <UserCheck />,
      type: "ti",
      url: "/admin/users/actifs/ti",
      content: (
        <TableUser
          type={type}
          filters={{ "users.active": true, "users.type": "ti" }}
          hideColumns={["code_postal"]}
        />
      )
    },
    {
      text: "En attente de validation",
      icon: <User />,
      type: "ti",
      url: "/admin/users/en-attente/ti",
      content: (
        <TableUser
          type={type}
          filters={{ "users.active": false, "users.type": "ti" }}
          hideColumns={["code_postal"]}
        />
      )
    }
  ].filter(tab => tab.type.toLowerCase().indexOf(type.toLowerCase()) > -1);

const Users = ({ type }) => (
  <TableState
    render={({ onSelect, activeTabIndex }) => {
      return <DummyTabs tabs={tabs(type)} onSelect={onSelect} activeTabIndex={activeTabIndex} />;
    }}
  />
);

export default Users;
