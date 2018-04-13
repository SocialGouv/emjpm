import fetch from "isomorphic-fetch";
import PropTypes from "prop-types";
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
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import FormulaireMandataire from "../src/components/formulaire_mandataire";
require("leaflet/dist/leaflet.css");
import "bootstrap/dist/css/bootstrap.css";
import "../static/css/hero.css";
import "../static/css/panel.css";
import "../static/css/footer.css";
import "../static/css/custom.css";
import "../node_modules/react-tabs/style/react-tabs.css";
import App from "./index";

import FormulaireServices from "../src/components/FormulaireServices";
import AppLogin from "./login";
import apiFetch from "../src/components/Api";
import FooterBottom from "../src/components/FooterBottom"
const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

const MapSearchMesures = dynamic(import("../src/components/MapMesures"), {
    ssr: false,
    loading: () => <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
});

class MandatairesIndex extends React.Component {
    state = {
        data: [],
        datamesure: [],
        currentMandataire: ""
    };

    componentDidMount() {
        apiFetch(`/mandataires/1/mesures`,)
            .then(json => {
                this.setState({
                    datamesure: json
                });
            });

        apiFetch(`/mandataires/1`,)
            .then(json => {
                this.setState({
                    currentMandataire: json
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
                                    <h2 style={{ color: "black" }}> {this.state.currentMandataire.nom} {this.state.currentMandataire.prenom} </h2>
                                    <Tab>Vos informations</Tab>
                                </div>
                            </div>
                        </div>
                    </TabList>
                    <div className="container">
                        <TabPanel>
                            <FormulaireServices currentMandataireModal={this.state.currentMandataire} />
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        );
    }
}

const Apprender = () => (
    <div style={styles}>
        <Navigation />

        <div style={{ overflowY: "auto", maxHeight: "70vh" }}>
            <MandatairesIndex />
        </div>
        <div style={{ overflowY: "auto", maxHeight: "20vh" }}>
            <FooterBottom />
        </div>

    </div>
);

export default Apprender;
