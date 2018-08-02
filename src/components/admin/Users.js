import { User, UserCheck } from "react-feather";
import TableUser from "./TableUser";
import { DummyTabs } from "..";

const tabs = [
  {
    text: "Actifs",
    icon: <UserCheck />,
    content: <TableUser filters={{ "users.active": true }} />
  },
  {
    text: "En attente de validation",
    icon: <User />,
    content: <TableUser filters={{ "users.active": false }} />
  }
];

const Users = () => <DummyTabs tabs={tabs} />;

export default Users;
