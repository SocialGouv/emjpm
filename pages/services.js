import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import geolib from "geolib";
import TableMesure from "../src/components/TableMesure";
import Navigation from "../src/components/Navigation";
import RowModal from "../src/components/RowModal";
import ImageBandeau from "../src/components/ImageBandeau";
import PanelGrisMandataire from "../src/components/PanelGrisMandataire";
import Footer from "../src/components/Footer";
import Commentaire from "../src/components/Commentaire";
import dynamic from "next/dynamic";
// import { Map, Marker, Popup, TileLayer } from "react-leaflet-universal";
// import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import FormulaireMandataire from "../src/components/formulaire_mandataire";
require("leaflet/dist/leaflet.css");
import "bootstrap/dist/css/bootstrap.css";
import "../static/css/hero.css";
import "../static/css/panel.css";
import "../static/css/footer.css";
import "../static/css/custom.css";
import "../node_modules/react-tabs/style/react-tabs.css";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class MandatairesIndex extends React.Component {
  state = {
    data: [],
    datamesure: [],
    currentMandataire: ""
  };

  componentDidMount() {
    const url = "http://localhost:3005/api/v1/srvices";
    fetch(url, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": "true",
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        service_id: 1
      })
    })
      .then(response => response.json())
      .then(json => {
        this.setState({
          data: json
        });
      });
  }
  render() {
    const filteredMesures = this.state.datamesure;
    return (
      <div>
        <Tabs>
          <TabList>
            <div
              className="panel"
              style={{
                textAlign: "left",
                backgroundSize: "cover",
                heigth: "100px !important",
                backgroundColor: "#cccccc"
              }}
            >
              <div className="panel__container" style={{ paddingBottom: "0px" }}>
                <div className="container" style={{ paddingRight: "27px", paddingLeft: "27px" }}>
                  <h2 style={{ color: "black" }}> Mme Isabelle Tulliez </h2>
                  <Tab>Mesures en cours</Tab>
                  <Tab>Information des antennes</Tab>
                </div>
              </div>
            </div>
          </TabList>
          <div className="container">
            <TabPanel>
              <TableMesure rows={filteredMesures} />
            </TabPanel>
            <TabPanel>
              <FormulaireMandataire />
            </TabPanel>
          </div>
        </Tabs>
        <Footer />
      </div>
    );
  }
}

const AppMandataireIndex = () => (
  <div style={styles}>
    <Navigation />
    <div style={{ overflowY: "auto", maxHeight: "100vh" }}>
      <MandatairesIndex />
    </div>
  </div>
);

export default AppMandataireIndex;
