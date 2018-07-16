// @flow
import * as React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import fetch from "isomorphic-fetch";
import Modal from "react-modal";
import styled from "styled-components";
import dynamic from "next/dynamic";
import Router from "next/router";

import Navigation from "../src/components/communComponents/Navigation";
import RowModal from "../src/components/communComponents/RowModal";
import Footer from "../src/components/communComponents/Footer";
import Commentaire from "../src/components/tiComponents/Commentaire";
import apiFetch from "../src/components/communComponents/Api";

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

const TabsShowMandataire = styled.div`
  padding-right: 0px;
  padding-left: 0px;
  background-color: #ebeff2;
  height: 60px;
`;

const OpenStreeMap = dynamic({
  modules: props => ({
    Map: import("../src/components/tiComponents/Map")
  }),
  render: (props, { Map }) => <Map {...props} />
});

const OpenStreeMapMandataires = dynamic({
  modules: props => ({
    MapMandataire: import("../src/components/tiComponents/MapMandataire")
  }),
  render: (props, { MapMandataire }) => <MapMandataire {...props} />
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

  return filteredMandataires.sort((a, b) => {
    return sortMandataires(a, b);
  });
};

const filterMesures = (mesures, filters) => {
  let filteredMesures = mesures.filter(mesure => {
    return (
      stringMatch(mesure.type, filters.searchType) &&
      (stringMatch(mesure.etablissement, filters.searchNom) ||
        stringMatch(mesure.prenom, filters.searchNom) ||
        stringMatch(mesure.nom, filters.searchNom)) &&
      stringMatch(mesure.ville, filters.searchVille)
    );
  });
  return filteredMesures.sort((a, b) => {
    return sortMandataires(a, b);
  });
};

const sortByDispo = (a, b) => {
  const dispoA = parseFloat(a) || -Infinity;
  const dispoB = parseFloat(b) || -Infinity;
  if (dispoA < dispoB) {
    return -1;
  }
  if (dispoA > dispoB) {
    return 1;
  }
  return 0;
};

const sortMandataires = (a, b) =>
  sortByDispo(a.mesures_en_cours / a.dispo_max, b.mesures_en_cours / b.dispo_max);

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

export const FicheMandataire = ({
  mandataire,
  currentEtablissementsForSelectedMandataire,
  allTisForOneMandataire
}: FicheMandataireProps) => (
  <div className="container">
    <div className="row">
      <div className="col-6">
        <TitleMandataire>{mandataire.etablissement}</TitleMandataire>
        <div>{mandataire.type.toUpperCase()}</div>
        <RowModal value={mandataire.adresse} />
        <div>
          {mandataire.code_postal} {mandataire.ville.toUpperCase()}
        </div>
        <br />
        <div data-cy="tab-telephone">{mandataire.telephone}</div>
        <div>{mandataire.email}</div>
        <br />
        <div style={{ textAlign: "left" }}>
          <b>Secrétariat </b>
          <br />
          {mandataire.secretariat === true ? "Oui" : "Non"} - {mandataire.nb_secretariat}
          <br />
          {currentEtablissementsForSelectedMandataire && (
            <React.Fragment>
              <b>Etablissement </b> <br />
              {currentEtablissementsForSelectedMandataire.map(etablissement => (
                <div>{etablissement.nom}</div>
              ))}
              <br />
            </React.Fragment>
          )}
          {allTisForOneMandataire && (
            <React.Fragment>
              <b>Tis </b> <br />
              {allTisForOneMandataire.map(ti => (
                <div>
                  {ti.etablissement} <br />
                </div>
              ))}
            </React.Fragment>
          )}
        </div>
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
          Mesures en cours : {mandataire.mesures_en_cours} / {mandataire.dispo_max}
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
    currentEtablissementsForSelectedMandataire: [],
    modalIsOpen: false,
    postcodeCoordinates: "",
    specialite: "",
    value: "",
    allTisForOneMandataire: [],
    timer: "inline-block"
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
    return apiFetch(`/mandataires/${mandataire.id}/tisEtablissement`).then(
      currentEtablissementsForSelectedMandataire =>
        apiFetch(`/mandataires/${mandataire.id}/tis-by-mandataire`)
          .then(allTisForOneMandataire => {
            this.setState({
              currentEtablissementsForSelectedMandataire,
              allTisForOneMandataire,
              modalIsOpen: true,
              currentMandataire: mandataire
            });
          })
          .catch(e => {
            console.log(e);
          })
    );
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
    this.setState(filters);
  };
  updateValue = value => {
    this.setState({ value: value });
  };

  updatePostCodeMandataires = mesures => {
    this.setState({ postcodeCoordinates: [mesures.longitude, mesures.latitude] });
  };

  updatePostCodeMandatairesByCommune = mesures => {
    this.setState({ postcodeCoordinates: mesures });
  };

  updateTimer = time => {
    this.setState({ timer: time });
  };

  findPostcode = postCode =>
    getPostCodeCoordinates(postCode).then(coordinates =>
      this.setState({
        postcodeCoordinates: coordinates
      })
    );

  reloadMaps = () => {
    Router.push("/tis");
  };

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
      <TiView
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
        mandataires={this.state.data}
        updateMandataireFilters={this.updateMandataireFilters}
        mandataireCount={mandataireCount}
        filteredMandataires={filteredMandataires}
        isOpen={this.state.modalIsOpen}
        closeModal={this.closeModal}
        mandataire={this.state.currentMandataire}
        updateTimer={this.updateTimer}
        currentEtablissementsForSelectedMandataire={
          this.state.currentEtablissementsForSelectedMandataire
        }
        allTisForOneMandataire={this.state.allTisForOneMandataire}
      />
    );
  }
}

const TiView = ({
  mesures,
  currentEtablissementsForSelectedMandataire,
  postcodeMandataire,
  width,
  height,
  updateMesures,
  updateMandataireMesures,
  filteredMesures,
  openModal,
  mesureCount,
  updateFilters,
  findPostcode,
  updatePostCodeMandataires,
  updatePostCodeMandatairesByCommune,
  value,
  updateValue,
  mandataires,
  updateMandataireFilters,
  mandataireCount,
  filteredMandataires,
  isOpen,
  closeModal,
  mandataire,
  updateTimer,
  allTisForOneMandataire
}) => (
  <div className="container" style={{ backgroundColor: "#ebeff2", minHeight: "60vh" }}>
    <Tabs>
      <TabList>
        <TabsShowMandataire className="container">
          <Tab style={tabStyle}>
            <b> Majeurs Protégés</b>
          </Tab>
          <Tab style={tabStyle} data-cy="tab-mandataire">
            <b>Mandataires</b>
          </Tab>
        </TabsShowMandataire>
      </TabList>
      <TabPanel>
        <OpenStreeMap
          mesures={mesures}
          postcodeMandataire={postcodeMandataire}
          width={width}
          height={height}
          updateMesures={updateMesures}
          updateMandataireMesures={updateMandataireMesures}
          filteredMesures={filteredMesures}
          openModal={openModal}
          mesureCount={mesureCount}
          updateFilters={updateFilters}
          findPostcode={findPostcode}
          updatePostCodeMandataires={updatePostCodeMandataires}
          updatePostCodeMandatairesByCommune={updatePostCodeMandatairesByCommune}
          reloadMaps={this.reloadMaps}
          value={value}
          updateValue={updateValue}
          updateTimer={updateTimer}
          mandataires={mandataires}
        />
        <ModalMandataire isOpen={isOpen} closeModal={closeModal}>
          <FicheMandataire
            mandataire={mandataire}
            currentEtablissementsForSelectedMandataire={currentEtablissementsForSelectedMandataire}
            allTisForOneMandataire={allTisForOneMandataire}
          />
        </ModalMandataire>
      </TabPanel>
      <TabPanel>
        <OpenStreeMapMandataires
          mandataires={mandataires}
          postcodeMandataire={postcodeMandataire}
          width={width}
          height={height}
          updateMandataireFilters={updateMandataireFilters}
          updateMandataireMesures={updateMandataireMesures}
          filteredMesures={filteredMandataires}
          openModal={openModal}
          mandataireCount={mandataireCount}
          updateFilters={updateFilters}
          findPostcode={findPostcode}
          updatePostCodeMandataires={updatePostCodeMandataires}
          updatePostCodeMandatairesByCommune={updatePostCodeMandatairesByCommune}
          value={value}
          updateValue={updateValue}
          updateTimer={updateTimer}
        />
        <ModalMandataire isOpen={isOpen} closeModal={closeModal}>
          <FicheMandataire
            mandataire={mandataire}
            currentEtablissementsForSelectedMandataire={currentEtablissementsForSelectedMandataire}
            allTisForOneMandataire={allTisForOneMandataire}
          />
        </ModalMandataire>
      </TabPanel>
    </Tabs>
  </div>
);
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
