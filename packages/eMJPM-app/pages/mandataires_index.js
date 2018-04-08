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
import App from "./index";
// import { redirectIfNotAuthenticated, getJwt } from "../lib/auth";
// import { getUser, getCurrentUser } from "../services/userApi";
// import {
//     BrowserRouter as Router,
//     Route,
//     Redirect,
//     withRouter
// } from "react-router-dom";

import AppLogin from "./login";

const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};

const MapSearchMesures = dynamic(import("../src/components/MapMesures"), {
    ssr: false,
    loading: () => (
        <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
    )
});

class MandatairesIndex extends React.Component {
    state = {
        data: [],
        datamesure: [],
        currentMandataire: ""
    };
    // static async getInitialProps(ctx) {
    //
    //     console.log(222)
    //     // If it does not exist session, it gets redirected
    //     if (redirectIfNotAuthenticated(ctx)) {
    //         return {};
    //     }
    //     //
    //     // const id = ctx.query && ctx.query.id;
    //     // const jwt = getJwt(ctx);
    //     // const res = await (id ? getUser(jwt, id) : getCurrentUser(jwt));
    //     // // const res = await (id ? getUser(jwt, id) : getCurrentUser(jwt));
    //     // return {
    //     //     user: res.data,
    //     //     authenticated: !!jwt,
    //     //     query: !!id
    //     // };
    // }

    componentDidMount() {
        const url = "http://localhost:3005/api/v1/mesures/index";
        fetch(url, {
            credentials: "include",
            method: "POST",
            headers: {
                "Access-Control-Allow-Credentials": "true",
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                mandataire_id: 1
            })
        })
            .then(response => response.json())
            .then(json => {
                this.setState({
                    datamesure: json
                });
            });

        const mandataireurl = "http://localhost:3005/api/v1/mandataires/1";
        fetch(mandataireurl)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    currentMandataire: json
                });
            });
    }

    render() {
        const filteredMesures = this.state.datamesure;
        console.log(111);
        console.log(
            fetch("http://localhost:3005/api/v1/mandataires/1")
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        currentMandataire: json
                    });
                })
        );

        return (
            <div>
                <Navigation />
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
                            <div
                                className="panel__container"
                                style={{ paddingBottom: "0px" }}
                            >
                                <div
                                    className="container"
                                    style={{ paddingRight: "27px", paddingLeft: "27px" }}
                                >
                                    <h2 style={{ color: "black" }}> Mme Isabelle Tulliez </h2>
                                    <Tab>Mesures en cours</Tab>
                                    <Tab>Vos informations</Tab>
                                </div>
                            </div>
                        </div>
                    </TabList>
                    <div className="container">
                        <TabPanel>
                            <TableMesure rows={filteredMesures} />
                        </TabPanel>
                        {/*<TabPanel>*/}
                        {/*<MapSearchMesures mesure={filteredMesures} />*/}
                        {/*</TabPanel>*/}
                        {/*<TabPanel>*/}
                        {/*<TableMesure rows={filteredMesures} />*/}
                        {/*</TabPanel>*/}
                        <TabPanel>
                            <FormulaireMandataire
                                currentMandataireModal={this.state.currentMandataire}
                            />
                        </TabPanel>
                    </div>
                </Tabs>
                <Footer />
            </div>
        );
    }
}

export default MandatairesIndex;

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest}
//         render={props =>
//             fakeAuth.isAuthenticated === true ? (
//                 <Component {...props} />
//             ) : (
//                 <Redirect
//                     to={{
//                         pathname: "/login",
//                         state: { from: props.location }
//                     }}
//                 />
//             )
//         }
//     />
// );

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

// export default function AuthExample() {
//     return (
//         {/*<Router>*/}
//             {/*<div>*/}
//                 {/*/!*<AuthButton/>*!/*/}
//                 {/*/!*<ul>*!/*/}
//                 {/*/!*<li><Link to="/public">Public Page</Link></li>*!/*/}
//                 {/*/!*<li><Link to="/protected">Protected Page</Link></li>*!/*/}
//                 {/*/!*</ul>*!/*/}
//                 {/*<Route path="/login" component={AppLogin} />*/}
//                 {/*<PrivateRoute path="/manataire_index" component={MandatairesIndex} />*/}
//             {/*</div>*/}
//         {/*</Router>*/}
//     );
// }
