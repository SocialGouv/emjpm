import styled from "styled-components";
import { Home, User } from "react-feather";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import Navigation from "../src/components/communComponents/Navigation";
import Footer from "../src/components/communComponents/Footer";
import Users from "../src/components/admin/Users";

const tabStyle = {
  backgroundColor: "#ebeff2",
  paddingBottom: 5,
  bottom: 0,
  verticalAlign: "middle",
  lineHeight: "40px",
  width: "50%",
  display: "inline-flex"
};

const imageStyle = {
  lineHeight: "50px",
  width: "20px",
  height: "20px",
  color: "black",
  display: "inline-block",
  margin: 10
};

const PanelAdmin = styled.div`
  text-align: "left",
  background-size: cover;
  heigth: 100px !important;
  background-color: #cad4de;
`;

const ContainerAdmin = styled.div`
  padding-right: 0px;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 0px;
  font-size: 1.2em;
  margin-top: 0px;
`;

const Title = styled.div`
  color: black;
  font-size: 1.5em;
  margin: 10px;
`;

const AdminPart = () => (
  <Tabs className="container">
    <TabList>
      <PanelAdmin className="panel">
        <ContainerAdmin className="container">
          <Title> Administration e-MJPM </Title>
        </ContainerAdmin>
        <Tab style={tabStyle}>
          <User style={imageStyle} />
          <b>Utilisateurs</b>
        </Tab>
        <Tab style={tabStyle}>
          <Home style={imageStyle} />
          <b>TI</b>
        </Tab>
      </PanelAdmin>
    </TabList>
    <TabPanel>
      <Users />
    </TabPanel>
    <TabPanel>
      <div>Gestion des TI</div>
    </TabPanel>
  </Tabs>
);

const AdminPage = () => (
  <div style={{ display: "block", backgroundColor: "#cad4de", minHeight: "100%" }}>
    <Navigation />
    <AdminPart />
    <Footer />
  </div>
);
export default AdminPage;
