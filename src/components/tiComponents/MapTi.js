import React, { createRef } from "react";
import { connect } from "react-redux";
import { Map, TileLayer, CircleMarker } from "react-leaflet";

import styled from "styled-components";
import apiFetch from "../communComponents/Api";
import getCenter from "../communComponents/getCenter";
import FilterMesuresMap from "./FilterMesuresMap";
import { filterData } from "../index";
import TableTi from "./TableTi";
import FiltersMandataireTableMap from "./FilterMandataires";

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding: 15px;
`;

const MapsWidth = styled.div`
width: 60%
  margin-top: 10px;
  margin-right: 3%;
  margin-bottom: 3%;
`;

const MandatairesWidth = styled.div`
width: 35%
  background-color: white;
  margin-top: 10px;
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
    zoom: 8,
    center: "",
    loading: false,
    postcodeCoordinates: [51.2, 2.1],
    showMandataireOfOneMesure: "",
    circleSelected: "",
    searchType: "",
    currentMandataire: "",
    value: "",
    filters: ""
  };

  mapRef = createRef();

  fetchData = (state, instance) => {
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

  // componentWillReceiveProps(nextProps) {
  //   console.log("nextProps", nextProps);
  //   // You don't have to do this check first, but it can help prevent an unneeded render
  //   if (
  //     nextProps.filters.searchType !== this.state.searchType ||
  //     nextProps.mesures !== this.state.datamesure
  //   ) {
  //     this.setState({ filters: nextProps.filters.searchType, filterData: nextProps.mesures });
  //   }
  // }

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
      ? data.mandataire_ids
          .map(mandataireId =>
            this.props.mandataires.find(mandataire => mandataire.id === mandataireId)
          )
          .filter(Boolean)
          .concat(this.props.services)
      : data;

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
    const filteredData = filterData(this.state.filterData, filterMesure);
    const mesureCount = filteredData.length;
    console.log("1", this.state.filterData, filters );

    return (
      <div
        style={{
          display: "flex"
        }}
      >
        <MapsWidth>
          <FilterMesuresMap
            zoomCodePostal={this.zoomCodePostal}
            updateValue={this.updateValue}
            value={this.state.value}
            style={{ zIndex: "1000", width: "100%" }}
          />
          <Map
            center={center}
            zoom={9}
            style={{ width: "100%", height: "70vh", padding: 0 }}
            ref={this.mapRef}
            onMoveend={() => this.handleMoveend(this.mapRef)}
          >
            <Attribution />
            {dataShow &&
              dataShow.map((marker, i) => (
                <MesureMarker
                  key={marker.id + "" + i}
                  marker={marker}
                  circleSelected={this.state.circleSelected}
                  updateIsMandataireClick={this.updateIsMandataireClick}
                  updateFilterMandataire={this.updateFilterMandataire}
                />
              ))}
          </Map>
        </MapsWidth>
        <MandatairesWidth>
          {(mesureCount > 0 && (
            <React.Fragment>
              <Title>
                {mesureCount} Professionnel{(mesureCount > 1 && "s") || null}
              </Title>
              <div style={{ maxHeight: "60vh", overflow: "auto" }}>
                <FiltersMandataireTableMap style={{ zIndex: "9999" }} />
                <TableTi rows={filteredData} />
              </div>
            </React.Fragment>
          )) || (
            <div style={{ textAlign: "center", marginTop: 20 }}>
              Aucun mandataire actuellement dans cette région
            </div>
          )}
        </MandatairesWidth>;
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.mandataire.data,
  datamesure: state.mandataire.datamesure,
  services: state.mandataire.services,
  filters: state.mandataire.filters,
  filterData: state.mandataire.filterData
});

export default connect(mapStateToProps)(MapTi);

{
  /*<TileLayer*/
}
{
  /*attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"*/
}
{
  /*url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"*/
}
{
  /*/>*/
}
