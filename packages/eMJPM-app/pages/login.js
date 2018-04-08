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

import MandatairesIndex from "./mandataires_index";
import Form from "react-jsonschema-form";
import { redirectIfAuthenticated } from "../lib/auth";
import axios from "axios";

import Link from "next/link";

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    withRouter
} from "react-router-dom";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};
const schema = {
    title: "Se connecter",
    type: "object",
    required: [],
    properties: {
        identifiant: { type: "string", title: " ", default: "Identifiant" },
        password: { type: "string", title: " ", default: "password" },
        done: {
            type: "boolean",
            title: " se souvenir de mes informations ",
            default: false
        }
    }
};

const formData = {};

class LoginIndex extends React.Component {
    state = {
        datamesure: "",
        error: false,
        history: "",
        redirectToReferrer: false
    };

    //     onSubmit = ({formData}) => {
    //     return axios.post("http://localhost:3005/auth/login", {
    //     username: formData.identifiant,
    //     password: formData.password
    // })
    // .then(function (response) {
    //     console.log(response);
    // })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    onSubmit = ({ formData }) => {
        const url = "http://localhost:3005/auth/login";
        fetch(url, {
            credentials: "include",
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: formData.identifiant,
                password: formData.password
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    datamesure: json
                });
            });

        // store.set('loggedIn', true);
    };

    render() {
        return (
            <div style={{ textAlign: "center" }}>
                <Navigation />

                <div
                    style={{
                        textAlign: "center",
                        backgroundSize: "cover",
                        heigth: "60%",
                        backgroundColor: "#cccccc",
                        width: "60%",
                        margin: "0 auto",
                        paddingTop: "70px",
                        paddingBotttom: "70px"
                    }}
                >
                    <div
                        style={{
                            textAlign: "center",
                            fontSize: "2em",
                            paddingBottom: "15px"
                        }}
                    >
                        <b>Espace professionnels </b>
                    </div>

                    <div
                        style={{
                            textAlign: "center",
                            backgroundSize: "cover",
                            heigth: "30% !important",
                            backgroundColor: "white",
                            width: "50%",
                            margin: "0 auto",
                            marginBottom: "70px",
                            border: "black 1px",
                            borderStyle: "solid",
                            borderRadius: "10px",
                            padding: "10px",
                            paddingRight: "30%",
                            display: "inline-block"
                        }}
                    >
                        <Form schema={schema} formData={formData} onSubmit={this.onSubmit}>
                            <div style={{ textAlign: "left", paddingBottom: "10px" }}>
                                <button type="submit" className="btn btn-success">
                                    Me connecter
                                </button>
                            </div>
                        </Form>
                    </div>
                </div>
                <div
                    style={{
                        position: "fixed",
                        width: "100%",
                        bottom: "0"
                    }}
                >
                    <Footer />
                </div>
            </div>
        );
    }
}

// const AuthButton = withRouter(({ history }) => (
//     fakeAuth.isAuthenticated ? (
//         <p>
//             Welcome! <button onClick={() => {
//             fakeAuth.signout(() => history.push('/'))
//         }}>Sign out</button>
//         </p>
//     ) : (
//         <p>You are not logged in.</p>
//     )
// ))

export default LoginIndex;
