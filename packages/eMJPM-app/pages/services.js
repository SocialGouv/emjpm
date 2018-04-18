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

import FormulaireService from "../src/components/formulaireService";
import AppLogin from "./login";
import apiFetch from "../src/components/Api";
import FooterBottom from "../src/components/FooterBottom"
import Router from "next/router";
const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

const MapSearchMesures = dynamic(import("../src/components/MapMesures"), {
    ssr: false,
    loading: () => <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
});
const logo = require("!!url-loader?limit=0!../static/images/logo_emjpm.png");


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

    onlogout = () => {
        fetch(`${API_URL}/auth/logout`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }})
            .then(response => response.json())
            .then(json => {
                Router.push("/login");
            });
    };
    updateMadataire = mesures => {
        this.setState({currentMandataire: mesures })
    };

    render() {
        const filteredMesures = this.state.datamesure;
        return (
            <div>
                <div className="" style={{verticalAlign: "center", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "white"}}>
                    <img src={logo} style={{ width: "20%"}} alt="Accueil de eMJPM.beta.gouv.fr" />
                    <button type="submit" style={{position: "absolute",right: "100px"}} className="btn btn-linkt" onClick={this.onlogout}>Se déconnecter</button>
                </div>
                <Tabs>
                    <TabList>
                        <div
                            className="panel"
                            style={{
                                textAlign: "left",
                                backgroundSize: "cover",
                                heigth: "100px !important",
                                backgroundColor: "#cad4de"
                            }}
                        >
                            <div className="panel__container" style={{ paddingBottom: "0px" }}>
                                <div className="container" style={{ paddingRight: "0px", paddingLeft: "0px" }}>
                                    <h2 style={{ color: "black" }}> {this.state.currentMandataire.nom} {this.state.currentMandataire.prenom} </h2>
                                    <div style={{backgroundColor: "#ebeff2", lineHeight: "40px",paddingBottom: "5px" }}>
                                    <Tab>Vos informations</Tab>
                                </div>
                            </div>
                            </div>
                        </div>
                    </TabList>
                    <div className="container" style={{ backgroundColor: "white",minHeight: "70vh"}}>
                        <TabPanel>
                            <div style={{minHeight: "70vh", paddingTop: "10px"}}>
                            <FormulaireService currentMandataireModal={this.state.currentMandataire} updateMadataire={this.updateMadataire}/>
                            </div>
                        </TabPanel>
                    </div>
                </Tabs>
            </div>
        );
    }
}

const Apprender = () => (
    <div style={styles}>
        <div style={{ overflowY: "auto", minHeight: "70vh",backgroundColor: "#cad4de"}}>
            <MandatairesIndex />
        </div>
        <div style={{ overflowY: "auto", maxHeight: "20vh" }}>
            <Footer />
        </div>

    </div>
);

export default Apprender;
