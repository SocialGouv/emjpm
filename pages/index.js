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
import FormulaireMandataire from "../src/components/formulaire_mandataire";
require("leaflet/dist/leaflet.css");
import App from "./index";
import "bootstrap/dist/css/bootstrap.css";
import "../static/css/hero.css";
import "../static/css/panel.css";
import "../static/css/footer.css";
import "../static/css/custom.css";

import Router from "next/router";

import MandatairesIndex from "./mandataires_index";
import Form from "react-jsonschema-form";
import { redirectIfAuthenticated } from "../lib/auth";

import Apprender from "./login"
// import {
//     // BrowserRouter as Router,
//     Route,
//     Link,
//     Redirect,
//     withRouter
// } from 'react-router-dom'
import LoginIndex from "./login";

class Index extends React.Component {
  state = {
    datamesure: "",
    error: false,
    history: "",
    redirectToReferrer: false
  };

  render() {
    return (
      <div> <Apprender/> </div>
    );
  }
}

export default Index;
