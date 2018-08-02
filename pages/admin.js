import styled from "styled-components";
import { Home, User } from "react-feather";

import { Layout, DummyTabs } from "../src/components";
import Navigation from "../src/components/communComponents/Navigation";
import Footer from "../src/components/communComponents/Footer";
import Users from "../src/components/admin/Users";

const Title = styled.div`
  color: black;
  font-size: 1.5em;
  margin: 10px;
`;

const tabs = [
  {
    text: "Utilisateurs",
    icon: <User />,
    content: (
      <div style={{ paddingTop: 10, background: "rgb(215, 223, 232)" }}>
        <h2 style={{ padding: "10px" }}>Gestion des utilisateurs</h2>
        <Users />
      </div>
    )
  },
  {
    text: "TI",
    icon: <Home />,
    content: <div style={{ padding: 50, textAlign: "center" }}>Gestion des TI [todo]</div>
  }
];

const AdminPart = () => (
  <div>
    <h2>Administration e-MJPM</h2>
    <DummyTabs tabs={tabs} />
  </div>
);

const AdminPage = () => (
  <Layout>
    <h2 style={{ margin: "30px 0" }}>Administration e-MJPM</h2>
    <DummyTabs tabs={tabs} />
  </Layout>
);
export default AdminPage;
