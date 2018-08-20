import React, { createRef } from "react";
import styled from "styled-components";
import { Map, TileLayer, CircleMarker } from "react-leaflet";

//Redux
import { connect } from "react-redux";

import apiFetch from "../communComponents/Api";
import getCenter from "../communComponents/getCenter";
import FilterMesuresMap from "./FilterMesuresMap";
import { filterDataForMandataires } from "../index";
import FiltersMandataireTableMap from "./FilterMandataires";
import DisplayMandataire from "./DisplayMandataire";

const MapsWidth = styled.div`
  width: 49%;
  margin-left: 1%;
  margin-top: 10px;
  margin-right: 1%;
  margin-bottom: 1%;
`;

const Attribution = () => (
  <TileLayer
    attribution="&copy; <a href=&quot;http://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors"
    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}{r}.png"
  />
);

const MesureMarker = ({
  marker,
  updateFilterMandataire,
  updateIsMandataireClick,
  isMandataire,
  circleSelected
}) => {
  const isSelected = isMandataire
    ? circleSelected.id === marker.id
    : circleSelected.code_postal === marker.code_postal;

  const onClick = () => (isSelected ? updateIsMandataireClick() : updateFilterMandataire(marker));
  const markerColor = isSelected ? "blue" : "red";
  return (
    <CircleMarker
      center={[marker.latitude, marker.longitude]}
      color={markerColor}
      radius={10}
      key={marker.id}
      onClick={onClick}
    />
  );
};

class MapTi extends React.Component {
  state = {
    filterData: [],
    zoom: 7,
    center: "",
    loading: false,
    postcodeCoordinates: [2, 51.2],
    showMandataireOfOneMesure: "",
    circleSelected: "",
    value: ""
  };

  mapRef = createRef();

  fetchData = state => {
    const mapRefGetBound = this.mapRef.current.leafletElement.getBounds();
    if (!this.state.loading) {
      this.setState({ loading: true }, () =>
        apiFetch(`${this.props.fetch}`, {
          method: "POST",
          body: JSON.stringify({
            latNorthEast: mapRefGetBound._northEast.lat,
            latSouthWest: mapRefGetBound._southWest.lat,
            longNorthEast: mapRefGetBound._northEast.lng,
            longSouthWest: mapRefGetBound._southWest.lng
          })
        })
          .then(data => {
            this.setState({
              filterData: data,
              loading: false
            });
          })
          .catch(console.log)
      );
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  handleMoveend = () => {
    this.fetchData();
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
        this.setState({ postcodeCoordinates: [mesures.longitude, mesures.latitude] });
      })
      .catch(e => {
        console.log(e);
      });
  };

  updateIsMandataireClick = () => {
    this.setState(
      {
        circleSelected: ""
      },
      () => this.handleMoveend()
    );
  };

  updateFilterMandataire = data => {
    const selectedMandataires = this.props.isMandataire
      ? [data]
      : data.mandataire_ids
          .map(mandataireId => this.props.data.find(mandataire => mandataire.id === mandataireId))
          .filter(Boolean)
          .concat(this.props.services);
    this.setState({
      filterData: selectedMandataires,
      circleSelected: data
    });
  };

  updateValue = value => {
    this.setState({
      value
    });
  };

  render() {
    const { data, datamesure, isMandataire, services, filters } = this.props;
    const dataShow = isMandataire ? data : datamesure;
    const center = getCenter(this.state, this.state.postcodeCoordinates);
    const filterMesure = [
      {
        content: "type",
        filter: filters,
        connector: ""
      }
    ];
    const filteredData = filterDataForMandataires(this.state.filterData, filterMesure);
    const mesureCount = filteredData.length;
    return (
      <>
        <div style={{ display: "flex" }}>
          <FilterMesuresMap
            zoomCodePostal={this.zoomCodePostal}
            updateValue={this.updateValue}
            value={this.state.value}
            style={{ zIndex: "1000", flex: "1" }}
          />
          <FiltersMandataireTableMap style={{ zIndex: "9999", flex: "1" }} />
        </div>
        <div
          style={{
            display: "flex"
          }}
        >
          <MapsWidth>
            <Map
              center={center}
              zoom={this.state.zoom}
              style={{ width: "100%", height: "68vh", padding: 0 }}
              ref={this.mapRef}
              onMoveend={() => this.handleMoveend(this.mapRef)}
            >
              <Attribution />
              {dataShow &&
                dataShow.map((marker, i) => (
                  <MesureMarker
                    key={marker.id + "" + i}
                    marker={marker}
                    isMandataire={isMandataire}
                    circleSelected={this.state.circleSelected}
                    updateIsMandataireClick={this.updateIsMandataireClick}
                    updateFilterMandataire={this.updateFilterMandataire}
                  />
                ))}
            </Map>
          </MapsWidth>
          <DisplayMandataire mesureCount={mesureCount} filteredData={filteredData} />
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  data: state.mandataire.data,
  datamesure: state.mandataire.datamesure,
  services: state.mandataire.services,
  filters: state.mandataire.filters
});

export default connect(mapStateToProps)(MapTi);
