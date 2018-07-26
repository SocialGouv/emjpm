import styled from "styled-components";
import { User, UserCheck } from "react-feather";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TableUser from "./TableUser";

const tabStyle = {
  backgroundColor: "#ebeff2",
  paddingBottom: 5,
  bottom: 0,
  verticalAlign: "middle",
  lineHeight: "40px",
  width: "33.33%",
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

const PanelUser = styled.div`
  text-align: "left",
  background-size: cover;
  heigth: 100px !important;
  background-color: #cad4de;
`;

const ContainerUser = styled.div`
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

const Users = () => (
  <Tabs className="container">
    <TabList>
      <PanelUser className="panel">
        <ContainerUser className="container">
          <Title>Gestion des Utilisateurs</Title>
        </ContainerUser>
        <Tab data-cy="TabUsers" style={tabStyle}>
          <UserCheck style={imageStyle} />
          <b>Actifs</b>
        </Tab>
        <Tab data-cy="TabIdleUsers" style={tabStyle}>
          <User style={imageStyle} />
          <b>En attente de validation</b>
        </Tab>
      </PanelUser>
    </TabList>
    <TabPanel>
      <TableUser filters={{ "users.active": true }} />
    </TabPanel>
    <TabPanel>
      <TableUser filters={{ "users.active": false }} />
    </TabPanel>
  </Tabs>
);
export default Users;
