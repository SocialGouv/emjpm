import { User, UserCheck } from "react-feather";
import TableUser from "./TableUser";
import { DummyTabs } from "..";
import TableMesures from "../mandataires/TableMesures";

const tabs = type =>
  [
    {
      text: "Actifs",
      type: "mandataire",
      icon: <UserCheck />,
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
      content: (
        <TableUser
          type={type}
          filters={{ "users.active": true, "users.type": "ti" }}
          hideColumns={["nom", "code_postal"]}
        />
      )
    },
    {
      text: "En attente de validation",
      icon: <User />,
      type: "ti",
      content: (
        <TableUser
          type={type}
          filters={{ "users.active": false, "users.type": "ti" }}
          hideColumns={["nom", "code_postal"]}
        />
      )
    }
  ].filter(tab => tab.type.toLowerCase().indexOf(type.toLowerCase()) > -1);

const Users = ({ type }) => <DummyTabs tabs={tabs(type)} />;

export default Users;
