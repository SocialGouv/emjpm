import React, { createRef, Component } from "react";
import { Map, Marker, Popup, CircleMarker, Circle, TileLayer, Tooltip } from "react-leaflet";
import apiFetch from "../communComponents/Api";
import TableMandataire from "./TableMandataire";
import styled from "styled-components";
import FilterMesuresMap from "./FilterMesuresMap";
var Hellomap = (center, zoom, style) => {
  Map.map("map", {
    center,
    zoom,
    style
  });
};

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding: 15px;
`;

export const MapsView = ({
  mandataires,
  zoom,
  center,
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
  value
}) => (
  <div className="container">
    {" "}
    <div className="row">
      <div style={{ width: "60%", marginTop: "10px", marginRight: "3%" }}>
        <FilterMesuresMap
          updateFilters={updateFilters}
          zoomCodePostal={zoomCodePostal}
          getPostCodeCoordinates={getPostCodeCoordinates}
          updateValue={updateValue}
          value={value}
          style={{ zIndex: "1000", width: "100%" }}
        />

        <Map
          center={center}
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
            mandataires.map(manda => (
              <CircleMarker
                center={[manda.latitude, manda.longitude]}
                color="red"
                radius={10}
                key={manda.latitude}
              />
            ))}
          ;
        </Map>
      </div>
      <div style={{ backgroundColor: "white", marginTop: "10px", width: "37%" }}>
        <Title>
          {mesureCount} Professionnel{(mesureCount > 1 && "s") || null}
        </Title>
        <div style={{ maxHeight: "60vh",overflow: "auto" }}>
          <TableMandataire
            rows={filteredMesures}
            openModal={openModal}
            updateFilters={updateFilters}
          />
        </div>
      </div>
    </div>
  </div>
);

class Mapstry extends React.Component {
  state = {
    zoom: 10,
    datamesure: "",
    value: ""
  };

  mapRef = createRef();

  componentDidMount() {
    apiFetch("/mandataires/filters", {
      method: "POST",
      body: JSON.stringify({
        latNorthEast: this.mapRef.current.leafletElement.getBounds()._northEast.lat,
        latSouthWest: this.mapRef.current.leafletElement.getBounds()._southWest.lat,
        longNorthEast: this.mapRef.current.leafletElement.getBounds()._northEast.lng,
        longSouthWest: this.mapRef.current.leafletElement.getBounds()._southWest.lng
      })
    })
      .then(mesures => {
        console.log("APImesures", mesures);
        this.setState({ modalIsOpen: false });
        this.props.updateMandataireFilters(mesures);
      })
      .catch(e => {
        console.log(e);
      });
  }

  handleMoveend = mapRef => {
    apiFetch("/mandataires/filters", {
      method: "POST",
      body: JSON.stringify({
        latNorthEast: mapRef.current.leafletElement.getBounds()._northEast.lat,
        latSouthWest: mapRef.current.leafletElement.getBounds()._southWest.lat,
        longNorthEast: mapRef.current.leafletElement.getBounds()._northEast.lng,
        longSouthWest: mapRef.current.leafletElement.getBounds()._southWest.lng
      })
    })
      .then(mesures => {
        console.log("APImesures", mesures);
        this.setState({ modalIsOpen: false });
        this.props.updateMandataireFilters(mesures);
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
        console.log("heelo", mesures);
        this.props.updatePostCodeMandataires(mesures);
        this.setState({ zoom: 13 });
      })
      .catch(e => {
        console.log(e);
      });
  };

  getPostCodeCoordinates = commune => {
    console.log("input", commune);
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
    console.log("value", this.state.value);
    const center = this.props.postcodeMandataire
      ? [this.props.postcodeMandataire[1], this.props.postcodeMandataire[0]]
      : [50.459441, 2.693963];
    return (
      <MapsView
        innerRef={this.mapRef}
        zoom={this.state.zoom}
        width={this.props.width}
        height={this.props.height}
        onMoveend={() => this.handleMoveend(this.mapRef)}
        center={center}
        mandataires={this.props.mandataires}
        openModal={this.props.openModal}
        filteredMesures={this.props.filteredMesures}
        mesureCount={this.props.mesureCount}
        updateFilters={this.props.updateFilters}
        zoomCodePostal={this.zoomCodePostal}
        getPostCodeCoordinates={this.getPostCodeCoordinates}
        updateValue={this.props.updateValue}
        value={this.props.value}
      />
    );
  }
}

export default Mapstry;
