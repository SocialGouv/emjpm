// @flow
import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import styled from "styled-components";
import geolib from "geolib";
import dynamic from "next/dynamic";
import PanelFilterMandataires from "../src/components/PanelFilterMandataires";
import TableMandataire from "../src/components/TableMandataire";
import Navigation from "../src/components/Navigation";
import RowModal from "../src/components/RowModal";
import Footer from "../src/components/Footer";
import Commentaire from "../src/components/Commentaire";
import apiFetch from "../src/components/Api";
import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const TIPageStlye = styled.div`
  background-color: #cad4de;
  min-height: 100%;
`;

const tabStyle = {
    backgroundColor: "#ebeff2",
    paddingBottom: 5,
    bottom: 0,
    textAlign: "middle",
    verticalAlign: "middle",
    lineHeight: "40px",
    width: "50%",
    display: "inline-flex"
};
const imageStyle = {
    lineHeight: "50px",
    width: "35px",
    height: "35px",
    color: "black",
    display: "inline-block"
};

const Pill = styled.p`
  font-size: 18px;
  width: 100px;
  height: 28px;
  line-height: 28px;
  border-radius: 2px;
  text-align: center;
  color: white;
  display: inline-block;
  margin-right: 10px;
`;

const PanelMandataire = styled.div`
  text-align: "left",
  background-size: cover;
  heigth: 100px !important;
  background-color: #cad4de;
`;

const ContainerMandataire = styled.div`
  padding-right: 0px;
  padding-bottom: 10px;
  padding-top: 10px;
  padding-left: 0px;
  font-size: 1.2em;
  margin-top: 0px;
`;

const TabsShowMandataire = styled.div`
  padding-right: 0px;
  padding-left: 0px;
  background-color: #ebeff2;
  height: 60px;
`;
const TabsPanelMandataire = styled.div`
  background-color: white;
  min-height: 70vh;
  padding: 0px;
`;

const FormuaireMandataire = styled.div`
  min-height: 70vh;
  padding-top: 10px;
`;

const OpenStreeMapMandataire = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const MandatairesPageStlye = styled.div`
  background-color: #cad4de;
  min-height: 100%;
`;

const OpenStreeMap = dynamic(import("../src/components/Map"), {
  ssr: false,
  loading: () => <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
});

const OpenStreeMapMandataires = dynamic(import("../src/components/MapMandataire"), {
    ssr: false,
    loading: () => <div style={{ textAlign: "center", paddingTop: 20 }}>Chargement…</div>
});

// postCode => [lat, lon]
const getPostCodeCoordinates = postCode => {
  // return null if no input
  if (!postCode || !postCode.trim()) {
    return Promise.resolve(null);
  }

  return fetch(`https://api-adresse.data.gouv.fr/search/?q=postcode=${postCode}`)
    .then(response => response.json())
    .then(json => json.features[0].geometry.coordinates);
};

const stringMatch = (str, needle) => str.toLowerCase().indexOf(needle.toLowerCase()) !== -1;

// filter and sort list of mandataires
const filterMandataires = (mandataires, filters) => {
  let filteredMandataires = mandataires.filter(mandataire => {
    return (
      stringMatch(mandataire.type, filters.searchType) &&
      (stringMatch(mandataire.type, filters.searchTypeIn) &&
        stringMatch(mandataire.type, filters.searchTypePr) &&
        stringMatch(mandataire.type, filters.searchTypeSe)) &&
      stringMatch(mandataire.etablissement, filters.searchNom) &&
      stringMatch(mandataire.ville, filters.searchVille)
    );
  });

  filteredMandataires.sort((a, b) =>
    sortByDispo(a.dispo_max - a.disponibilite, b.dispo_max - b.disponibilite)
  );

  // add lat/lon
  // if (filters.postcodeCoordinates) {
  //   filteredMandataires = geolib.orderByDistance(
  //     {
  //       latitude: filters.postcodeCoordinates[1],
  //       longitude: filters.postcodeCoordinates[0]
  //     },
  //     // add lat/lng properties to mandataires data so they can be sorted and returned as is
  //     filteredMandataires.map(mandataire => ({
  //       latitude: mandataire.latitude,
  //       longitude: mandataire.longitude,
  //       ...mandataire
  //     }))
  //   );
  // }

  return filteredMandataires;
};

const filterMesures = (mesures, filters) => {
  return mesures.filter(mesure => {
  return (
      stringMatch(mesure.type, filters.searchType) &&
      (stringMatch(mesure.etablissement, filters.searchNom) ||
          stringMatch(mesure.prenom, filters.searchNom) ||
      stringMatch(mesure.nom, filters.searchNom)) &&
      stringMatch(mesure.ville, filters.searchVille)
      // stringMatch(mesure.type, filters.searchTypeIn) &&
    // stringMatch(mesure.      type, filters.searchTypePr) &&
    // stringMatch(mesure.type, filters.searchTypeSe)
    // stringMatch(mesure.type, filters.searchVille)
  )});
};

const sortByDispo = (a, b) => {
  const dispoA = parseInt(a, 10) || -Infinity;
  const dispoB = parseInt(b, 10) || -Infinity;
  if (dispoA < dispoB) {
    return 1;
  }
  if (dispoA > dispoB) {
    return -1;
  }
  return 0;
};

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding: 15px;
`;

const ModalMandataire = ({ isOpen, closeModal, children }) => (
  <Modal
    isOpen={isOpen}
    onRequestClose={closeModal}
    style={modalStyles}
    contentLabel="mandataire"
    background="#e9ecef"
    className="Modal"
    overlayClassName="Overlay"
  >
    <button onClick={closeModal}>X</button>
    {children}
  </Modal>
);

const TitleMandataire = styled.div`
  text-align: left;
  font-size: 1.5em;
  font-weight: bold;
`;
type FicheMandataireProps = {
  style: Object,
  mandataire: Object
};
export const FicheMandataire = ({ style, mandataire }: FicheMandataireProps) => (
  <div className="container" style={style}>
    <div className="row">
      <div className="col-6">
        <TitleMandataire>{mandataire.etablissement}</TitleMandataire>
        <div>{mandataire.type.toUpperCase()}</div>
        <RowModal value={mandataire.adresse} />
        <div>
          {mandataire.code_postal} {mandataire.ville.toUpperCase()}
        </div>
        <br />
        <RowModal label="Contact" value={mandataire.referent} />
        <div>{mandataire.telephone}</div>
        <div>{mandataire.email}</div>
        <br />
        <br />
          {<RowModal label="Secrétariat" value={mandataire.secretariat === false ? "Pas de secrétariat": mandataire.secretariat } />}
          {<RowModal value={mandataire.nb_secretariat} />}

      </div>
      <div className="col-6">
        <div
          style={{
            verticalAlign: "middle",
            paddingLeft: 10,
            borderBottom: "20px",
            lineHeight: "40px"
          }}
        >
          Mesures en cours : {mandataire.disponibilite} / {mandataire.dispo_max}
        </div>
        <br />
        <Commentaire currentMandataire={mandataire} />
      </div>
    </div>
  </div>
);

type Props = {
  mandataires: Array<mixed>
};

type State = {
  searchType: string,
  modalIsOpen: boolean,
  postcodeCoordinates: string,
  data: Array<mixed>,
  searchTypeIn: string,
  searchTypePr: string,
  searchTypeSe: string,
  searchNom: string,
  searchVille: string,
  currentMandataire: string,
  postcodeCoordinates: string,
  specialite: string,
  mandaMesures: Array<mixed>
};

class Ti extends React.Component<Props, State> {
  state = {
    data: [],
    datamesure: [],
    mandaMesures: [],
      manda: [],
    searchType: "",
    searchTypeIn: "",
    searchTypePr: "",
    searchTypeSe: "",
    searchNom: "",
    searchVille: "",
    currentMandataire: "",
    modalIsOpen: false,
    postcodeCoordinates: "",
    specialite: "",
      value:""
  };

  componentDidMount() {
    apiFetch("/mandataires").then(mandataires =>
      apiFetch("/mesures/popup")
        .then(mesures => {
          this.setState({
            data: mandataires,
            datamesure: mesures
          });
        })
        .catch(e => {
          console.log(e);
        })
    );
  }

  openModal = mandataire => {
    this.setState({ modalIsOpen: true, currentMandataire: mandataire });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  updateMesures = mesures => {
    this.setState({ datamesure: mesures });
  };

  updateMandataireMesures = mesures => {
    this.setState({ mandaMesures: mesures });
  };

    updateMandataireFilters = mandataires => {
        this.setState({ manda: mandataires });
    };

  updateFilters = filters => {
    console.log("filter", filters);
    this.setState(filters);
  };
    updateValue = value => {
        this.setState({ value: value });
    };

    updatePostCodeMandataires= mesures => {
      console.log("ouioui", mesures)
        this.setState({ postcodeCoordinates: [mesures.longitude, mesures.latitude] });
    };

    updatePostCodeMandatairesByCommune= mesures => {
        this.setState({ postcodeCoordinates: mesures });
    };

  findPostcode = postCode =>
    getPostCodeCoordinates(postCode).then(coordinates =>
      this.setState({
        postcodeCoordinates: coordinates
      })
    );

  render() {
    const filteredMandataires = filterMandataires(
      this.state.manda,
      {
        searchType: this.state.searchType,
        searchTypeIn: this.state.searchTypeIn,
        searchTypePr: this.state.searchTypePr,
        searchTypeSe: this.state.searchTypeSe,
        searchNom: this.state.searchNom,
        searchVille: this.state.searchVille,
        postcodeCoordinates: this.state.postcodeCoordinates,
        specialite: this.state.specialite
      }
      // this.state.specialite
    );
    const filteredMesures = filterMesures(this.state.mandaMesures, {
      searchType: this.state.searchType,
        searchNom: this.state.searchNom,
        searchVille: this.state.searchVille
    });

    const mesureCount = this.state.mandaMesures.length;
    const mandataireCount = filteredMandataires.length;
    return (
      <div className="container" style={{ backgroundColor: "#ebeff2", minHeight: "60vh" }}>
          <Tabs>
              <TabList>
                      <TabsShowMandataire className="container">
                          <Tab style={tabStyle}>
                              <b> Majeurs Protégés</b>
                          </Tab>
                          <Tab style={tabStyle}>
                              <b>Mandataires</b>
                          </Tab>
                      </TabsShowMandataire>
              </TabList>
                  <TabPanel>
                      <OpenStreeMap
                          mesures={this.state.datamesure}
                          postcodeMandataire={this.state.postcodeCoordinates}
                          width={"100%"}
                          height={"65vh"}
                          updateMesures={this.updateMesures}
                          updateMandataireMesures={this.updateMandataireMesures}
                          filteredMesures={filteredMesures}
                          openModal={this.openModal}
                          mesureCount={mesureCount}
                          updateFilters={this.updateFilters}
                          findPostcode={this.findPostcode}
                          updatePostCodeMandataires={this.updatePostCodeMandataires}
                          updatePostCodeMandatairesByCommune={this.updatePostCodeMandatairesByCommune}
                          value={this.state.value}
                          updateValue={this.updateValue}
                      />
                  </TabPanel>
                  <TabPanel>
                      <OpenStreeMapMandataires
                          mandataires={this.state.data}
                          postcodeMandataire={this.state.postcodeCoordinates}
                          width={"100%"}
                          height={"65vh"}
                          updateMandataireFilters={this.updateMandataireFilters}
                          updateMandataireMesures={this.updateMandataireMesures}
                          filteredMesures={filteredMandataires}
                          openModal={this.openModal}
                          mandataireCount={mandataireCount}
                          updateFilters={this.updateFilters}
                          findPostcode={this.findPostcode}
                          updatePostCodeMandataires={this.updatePostCodeMandataires}
                          updatePostCodeMandatairesByCommune={this.updatePostCodeMandatairesByCommune}
                          value={this.state.value}
                          updateValue={this.updateValue}
                      />
                  </TabPanel>
          </Tabs>
        {/*<div className="container">*/}
        {/*/!*<Title>*!/*/}
        {/*/!*{mandatairesCount} Professionel{(mandatairesCount > 1 && "s") || null} référencé{(mandatairesCount >*!/*/}
        {/*/!*1 &&*!/*/}
        {/*/!*"s") ||*!/*/}
        {/*/!*null}{" "}*!/*/}
        {/*/!*</Title>*!/*/}
        {/*/!*<TableMandataire rows={filteredMandataires} openModal={this.openModal} />*!/*/}
        {/*<ModalMandataire isOpen={this.state.modalIsOpen} closeModal={this.closeModal}>*/}
        {/*{this.state.currentMandataire && (*/}
        {/*<FicheMandataire*/}
        {/*mandataire={this.state.currentMandataire}*/}
        {/*style={{ textAlign: "left" }}*/}
        {/*/>*/}
        {/*)}*/}
        {/*</ModalMandataire>*/}
        {/*</div>*/}
      </div>
    );
  }
}

const TiPage = () => (
  <div style={{ minHeight: "100%", backgroundColor: "#cad4de" }}>
    <Navigation logout />
    <div className="container">
      <h1>Chercher au plus proche du majeur à protéger</h1>
      <br />
    </div>
    <Ti style={{ marginTop: "100%" }} />
    <Footer />
  </div>
);

export default TiPage;
