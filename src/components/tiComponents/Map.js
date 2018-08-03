import React, { createRef } from "react";
import styled from "styled-components";
import { Map, CircleMarker, TileLayer } from "react-leaflet";

import apiFetch from "../communComponents/Api";
import TableMandataire from "./TableMandataire";
import FilterMesuresMap from "./FilterMesuresMap";
import getCenter from "../communComponents/getCenter";

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding: 15px;
`;

const MapsWidth = styled.div`
  width: 60%;
  margin-top: 10px;
  margin-right: 3%;
`;

const MandatairesWidth = styled.div`
  background-color: white;
  margin-top: 10px;
  width: 37%;
  max-height: 72vh;
  overflow-y: scroll;
`;

export const MapsView = ({
  mesures,
  zoom,
  width,
  height,
  onMoveend,
  innerRef,
  filteredMesures,
  openModal,
  mesureCount,
  updateFilters,
  zoomCodePostal,
  getPostCodeCoordinates,
  updateValue,
  value,
  updateFilterMandataire,
  currentMesureSelected,
  updateIsMesureClick,
  onCenter
}) => (
  <div className="container">
    <div className="row">
      <MapsWidth>
        <FilterMesuresMap
          updateFilters={updateFilters}
          zoomCodePostal={zoomCodePostal}
          getPostCodeCoordinates={getPostCodeCoordinates}
          updateValue={updateValue}
          value={value}
          style={{ zIndex: "1000", width: "100%" }}
        />
        <Map
          center={onCenter}
          zoom={zoom}
          style={{ width, height }}
          onMoveend={onMoveend}
          ref={innerRef}
        >
          <TileLayer
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
          {mesures &&
            mesures.map(mesure => {
              const isSelected = currentMesureSelected.code_postal === mesure.code_postal;
              const onClick = () =>
                isSelected ? updateIsMesureClick() : updateFilterMandataire(mesure);
              const markerColor = isSelected ? "blue" : "red";
              return (
                <CircleMarker
                  center={[mesure.latitude, mesure.longitude]}
                  color={markerColor}
                  radius={10}
                  key={mesure.id}
                  onClick={onClick}
                />
              );
            })}
          ;
        </Map>
      </MapsWidth>
      <MandatairesWidth>
        {(mesureCount && (
          <React.Fragment>
            <Title>
              {mesureCount} Professionnel
              {(mesureCount > 1 && "s") || null}
            </Title>

            <TableMandataire
              rows={filteredMesures}
              openModal={openModal}
              updateFilters={updateFilters}
            />
          </React.Fragment>
        )) || (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            Aucune mesure actuellement dans cette région
          </div>
        )}
      </MandatairesWidth>
      `
    </div>
  </div>
);

class Mapstry extends React.Component {
  state = {
    zoom: 8,
    datamesure: "",
    value: "",
    services: "",
    display: "none",
    showMandataireOfOneMesure: "",
    currentMesureSelected: "",
    center: ""
  };

  mapRef = createRef();

  componentDidMount() {
    const mapRefGetBound = this.mapRef.current.leafletElement.getBounds();
    apiFetch("/mesures/filters", {
      method: "POST",
      body: JSON.stringify({
        latNorthEast: mapRefGetBound._northEast.lat,
        latSouthWest: mapRefGetBound._southWest.lat,
        longNorthEast: mapRefGetBound._northEast.lng,
        longSouthWest: mapRefGetBound._southWest.lng
      })
    }).then(mesures =>
      apiFetch("/mandataires/services")
        .then(services => {
          this.setState(
            {
              modalIsOpen: false,
              services: services
            },
            () => {
              this.props.updateMandataireMesures(mesures);
            }
          );
        })
        .catch(e => {
          console.log(e);
        })
    );
  }

  handleMoveend = () => {
    const mapRefGetCenter = this.mapRef.current.leafletElement.getCenter();
    const mapRefGetZoom = this.mapRef.current.leafletElement.getZoom();
    const mapRefGetBound = this.mapRef.current.leafletElement.getBounds();
    apiFetch("/mesures/filters", {
      method: "POST",
      body: JSON.stringify({
        latNorthEast: mapRefGetBound._northEast.lat,
        latSouthWest: mapRefGetBound._southWest.lat,
        longNorthEast: mapRefGetBound._northEast.lng,
        longSouthWest: mapRefGetBound._southWest.lng
      })
    })
      .then(mesures => {
        this.setState({ modalIsOpen: false, zoom: mapRefGetZoom, center: mapRefGetCenter }, () => {
          this.props.updateMandataireMesures(mesures);
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  updateIsMesureClick = () => {
    this.setState(
      {
        currentMesureSelected: ""
      },
      () => this.handleMoveend()
    );
  };

  updateFilterMandataire = mesure => {
    apiFetch("/mandataires/services").then(services => {
      const selectedMandataires = mesure.mandataire_ids
        .map(mandataireId =>
          this.props.mandataires.find(mandataire => mandataire.id === mandataireId)
        )
        .filter(Boolean)
        .concat(services);

      this.setState(
        {
          showMandataireOfOneMesure: selectedMandataires,
          currentMesureSelected: mesure
        },
        () => {
          this.props.updateMandataireMesures(selectedMandataires);
        }
      );
    });
  };

  zoomCodePostal = codePostal => {
    if (!codePostal || !codePostal.trim()) {
      return Promise.resolve(null);
    }
    apiFetch("/mandataires/PosteCode", {
      method: "POST",
      body: JSON.stringify({
        codePoste: codePostal
      })
    })
      .then(mesures => {
        this.props.updatePostCodeMandataires(mesures);
        this.setState({ zoom: 13 });
      })
      .catch(e => {
        console.log(e);
      });
  };

  getPostCodeCoordinates = commune => {
    // return null if no input
    if (!commune || !commune.trim()) {
      return Promise.resolve(null);
    }
    return fetch(`https://api-adresse.data.gouv.fr/search/?q=${commune}`)
      .then(response => response.json())
      .then(json =>
        this.props.updatePostCodeMandatairesByCommune(json.features[0].geometry.coordinates)
      );
    // .then(json => json);
  };

  render() {
    const center = getCenter(this.state.center, this.props.postcodeMandataire);

    return (
      <MapsView
        innerRef={this.mapRef}
        zoom={this.state.zoom}
        width={this.props.width}
        height={this.props.height}
        onMoveend={() => this.handleMoveend(this.mapRef)}
        onCenter={center}
        mesures={this.props.mesures}
        openModal={this.props.openModal}
        filteredMesures={this.props.filteredMesures}
        mesureCount={this.props.mesureCount}
        updateFilters={this.props.updateFilters}
        zoomCodePostal={this.zoomCodePostal}
        getPostCodeCoordinates={this.getPostCodeCoordinates}
        updateValue={this.props.updateValue}
        value={this.props.value}
        updateFilterMandataire={this.updateFilterMandataire}
        currentMesureSelected={this.state.currentMesureSelected}
        updateIsMesureClick={this.updateIsMesureClick}
      />
    );
  }
}

export default Mapstry;
