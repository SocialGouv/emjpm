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
`;

export const MapsView = ({
  mandataires,
  zoom,
  width,
  height,
  onMoveend,
  innerRef,
  filteredMandataires,
  openModal,
  updateFilters,
  zoomCodePostal,
  getPostCodeCoordinates,
  updateValue,
  mandataireCount,
  value,
  updateFilterMandataire,
  currentMandataireSelected,
  updateIsMandataireClick,
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
          {mandataires &&
            mandataires.map(manda => {
              const isSelected = currentMandataireSelected.id === manda.id;
              const onClick = () =>
                isSelected ? updateIsMandataireClick() : updateFilterMandataire(manda);
              const markerColor = isSelected ? "blue" : "red";
              return (
                <CircleMarker
                  center={[manda.latitude, manda.longitude]}
                  color={markerColor}
                  radius={10}
                  key={manda.id}
                  onClick={onClick}
                />
              );
            })}
          ;
        </Map>
      </MapsWidth>
      <MandatairesWidth>
        {(mandataireCount > 0 && (
          <React.Fragment>
            <Title>
              {mandataireCount} Professionnel{(mandataireCount > 1 && "s") || null}
            </Title>
            <div style={{ maxHeight: "60vh", overflow: "auto" }}>
              <TableMandataire
                rows={filteredMandataires}
                openModal={openModal}
                updateFilters={updateFilters}
              />
            </div>
          </React.Fragment>
        )) || (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            Aucun mandataire actuellement dans cette région
          </div>
        )}
      </MandatairesWidth>
    </div>
  </div>
);

class Mapstry extends React.Component {
  state = {
    zoom: 8,
    datamesure: "",
    value: "",
    showMandataireOfOneMesure: "",
    currentMandataireSelected: "",
    center: ""
  };

  mapRef = createRef();

  componentDidMount() {
    const mapRefGetBound = this.mapRef.current.leafletElement.getBounds();
    apiFetch("/mandataires/filters", {
      method: "POST",
      body: JSON.stringify({
        latNorthEast: mapRefGetBound._northEast.lat,
        latSouthWest: mapRefGetBound._southWest.lat,
        longNorthEast: mapRefGetBound._northEast.lng,
        longSouthWest: mapRefGetBound._southWest.lng
      })
    })
      .then(mesures => {
        this.setState({ modalIsOpen: false }, () => {
          this.props.updateMandataireFilters(mesures);
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleMoveend = () => {
    const mapRefGetBound = this.mapRef.current.leafletElement.getBounds();
    apiFetch("/mandataires/filters", {
      method: "POST",
      body: JSON.stringify({
        latNorthEast: mapRefGetBound._northEast.lat,
        latSouthWest: mapRefGetBound._southWest.lat,
        longNorthEast: mapRefGetBound._northEast.lng,
        longSouthWest: mapRefGetBound._southWest.lng
      })
    })
      .then(mesures => {
        this.setState({ modalIsOpen: false }, () => {
          this.props.updateMandataireFilters(mesures);
        });
      })
      .catch(e => {
        console.log(e);
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

  updateIsMandataireClick = () => {
    this.setState(
      {
        currentMandataireSelected: ""
      },
      () => this.handleMoveend()
    );
  };

  updateFilterMandataire = mandataire => {
    this.setState(
      {
        currentMandataireSelected: mandataire
      },
      () => this.props.updateMandataireFilters([mandataire])
    );
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
        onCenter={center}
        onMoveend={() => this.handleMoveend(this.mapRef)}
        mandataires={this.props.mandataires}
        openModal={this.props.openModal}
        filteredMandataires={this.props.filteredMandataires}
        mesureCount={this.props.mesureCount}
        updateFilters={this.props.updateFilters}
        zoomCodePostal={this.zoomCodePostal}
        getPostCodeCoordinates={this.getPostCodeCoordinates}
        updateValue={this.props.updateValue}
        mandataireCount={this.props.mandataireCount}
        value={this.props.value}
        updateFilterMandataire={this.updateFilterMandataire}
        currentMandataireSelected={this.state.currentMandataireSelected}
        updateIsMandataireClick={this.updateIsMandataireClick}
      />
    );
  }
}

export default Mapstry;
