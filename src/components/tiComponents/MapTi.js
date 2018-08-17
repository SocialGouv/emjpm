import React, { createRef } from "react";
import styled from "styled-components";
import { Map, TileLayer, CircleMarker } from "react-leaflet";

//Redux
import { connect } from "react-redux";

import apiFetch from "../communComponents/Api";
import getCenter from "../communComponents/getCenter";
import FilterMesuresMap from "./FilterMesuresMap";
import { filterDataForMandataires } from "../index";
import TableTi from "./TableTi";
import FiltersMandataireTableMap from "./FilterMandataires";

const Title = styled.div`
  text-align: left;
  font-size: 2em;
  padding: 15px;
`;

const MapsWidth = styled.div`
width: 50%
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
    zoom: 6,
    center: "",
    loading: false,
    postcodeCoordinates: [2, 51.2],
    showMandataireOfOneMesure: "",
    circleSelected: "",
    searchType: "",
    currentMandataire: "",
    value: ""
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
            console.log("data", data);
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
    console.log("isMandataire", this.props.isMandataire);
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
    console.log("propsFilter", filters);
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
      <div
        style={{
          display: "flex"
        }}
      >
        <MapsWidth>
          <div style={{ display: "flex" }}>
            <FilterMesuresMap
              zoomCodePostal={this.zoomCodePostal}
              updateValue={this.updateValue}
              value={this.state.value}
              style={{ zIndex: "1000", width: "50%", flex: "1" }}
            />
            <FiltersMandataireTableMap style={{ zIndex: "9999", flex: "1" }} />
          </div>
          <Map
            center={center}
            zoom={this.state.zoom}
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
                  isMandataire={isMandataire}
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
                <TableTi rows={filteredData} />
              </div>
            </React.Fragment>
          )) || (
            <React.Fragment>
              <Title>
                {mesureCount} Professionnel{(mesureCount > 1 && "s") || null}
              </Title>
              <div style={{ maxHeight: "60vh", overflow: "auto" }}>
                <TableTi rows={filteredData} />
              </div>
            </React.Fragment>
            // <div style={{ textAlign: "center", marginTop: 20 }}>
            //   Aucun mandataire actuellement dans cette région
            // </div>
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
  filters: state.mandataire.filters
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

//
// const tabStyle = {
//     backgroundColor: "#ebeff2",
//     paddingBottom: 5,
//     bottom: 0,
//     textAlign: "middle",
//     verticalAlign: "middle",
//     lineHeight: "40px",
//     width: "50%",
//     display: "inline-flex"
// };
//
// const TabsShowMandataire = styled.div`
//   padding-right: 0px;
//   padding-left: 0px;
//   background-color: #ebeff2;
//   height: 60px;
// `;
//
// const TitleMandataire = styled.div`
//   text-align: left;
//   font-size: 1.5em;
//   font-weight: bold;
// `;
