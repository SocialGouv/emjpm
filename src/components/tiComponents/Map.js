import React, { createRef } from "react";
import styled from "styled-components";
import { Map, CircleMarker, TileLayer } from "react-leaflet";

import apiFetch from "../communComponents/Api";
import TableMandataire from "./TableMandataire";
import FilterMesuresMap from "./FilterMesuresMap";

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
  overflow-y: scroll;`
;

export const MapsView = ({
  mesures,
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
  value,
  updateTimer,
  services,
  display
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
          {mesures &&
            mesures.map(manda => (
              <CircleMarker
                center={[manda.latitude, manda.longitude]}
                color="red"
                radius={10}
                key={manda.id}
              />
            ))}
          ;
        </Map>
      </MapsWidth>
      <MandatairesWidth>
        {(mesureCount && (
          <React.Fragment>
            <Title>
              {mesureCount} Professionnel{(mesureCount > 1 && "s") || null}
            </Title>

            <TableMandataire
              rows={filteredMesures}
              openModal={openModal}
              updateFilters={updateFilters}
            />
            <Title>Services</Title>
            <div style={{ maxHeight: "60vh", overflow: "auto" }}>
              <TableMandataire
                rows={services}
                openModal={openModal}
                updateFilters={updateFilters}
                display={display}
              />
            </div>
          </React.Fragment>
        )) || (
          <div style={{ textAlign: "center", marginTop: 20 }}>
            Aucune mesure actuellement dans cette région
          </div>
        )}
      </MandatairesWidth>`
      </div>
      Le nombre de mesures indiqué n'inclut pas les mesures attribuées aux services
    </div>
);

class Mapstry extends React.Component {
  state = {
    zoom: 10,
    datamesure: "",
    value: "",
    services: "",
    display: "none"
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
          this.setState({ modalIsOpen: false, services: services }, () => {
            this.props.updateMandataireMesures(mesures);
          });
        })
        .catch(e => {
          console.log(e);
        })
    );
  }

  handleMoveend = () => {
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
        this.setState({ modalIsOpen: false }, () => {
          this.props.updateMandataireMesures(mesures);
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
    const center = this.props.postcodeMandataire
      ? [this.props.postcodeMandataire[1], this.props.postcodeMandataire[0]]
      : [50.459441, 2.693963];
    return (
      <MapsView
        innerRef={this.mapRef}
        zoom={this.state.zoom}
        width={this.props.width}
        height={this.props.height}
        updateTimer={this.props.updateTimer}
        onMoveend={() => this.handleMoveend(this.mapRef)}
        center={center}
        mesures={this.props.mesures}
        openModal={this.props.openModal}
        filteredMesures={this.props.filteredMesures}
        mesureCount={this.props.mesureCount}
        updateFilters={this.props.updateFilters}
        zoomCodePostal={this.zoomCodePostal}
        getPostCodeCoordinates={this.getPostCodeCoordinates}
        updateValue={this.props.updateValue}
        value={this.props.value}
        services={this.state.services}
        display={this.state.display}
      />
    );
  }
}

export default Mapstry;
