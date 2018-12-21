import { User, UserCheck } from "react-feather";
import TableUser from "./TableUser";
import { DummyTabs } from "..";

const tabs = type =>
  [
    {
      text: "Actifs",
      type: "mandataire",
      icon: <UserCheck />,
      url: "/admin/users/actifs",
      content: (
        <TableUser
          type={type}
          filters={{ "users.active": true }}
          hideColumns={["cabinet", "email"]}
        />
      )
    },
    {
      text: "En attente de validation",
      icon: <User />,
      type: "mandataire",
      url: "/admin/users/en-attente",
      content: (
        <TableUser
          type={type}
          filters={{ "users.active": false }}
          hideColumns={["cabinet", "email"]}
        />
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

const Users = ({ type }) => <DummyTabs tabs={tabs(type)} />;

export default Users;
