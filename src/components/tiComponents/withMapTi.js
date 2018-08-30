import apiFetch from "../communComponents/Api";
import React, { createRef } from "react";
import { connect } from "react-redux";
import getCenter from "../communComponents/getCenter";
import { filterDataForMandataires } from "../index";

function withMapTi(WrappedComponent, fetch) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        filterData: [],
        zoom: 7,
        center: "",
        loading: false,
        coordinates: [2, 51.2],
        showMandataireOfOneMesure: "",
        circleSelected: "",
        value: ""
      };
    }

    mapRef = createRef();

    fetchData = () => {
      const mapRefGetBound = this.mapRef.current.leafletElement.getBounds();
      if (!this.state.loading) {
        this.setState({ loading: true }, () =>
          apiFetch(`${fetch}`, {
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
          this.setState({ coordinates: [mesures.longitude, mesures.latitude] });
        })
        .catch(e => {
          console.log(e);
        });
    };

    unselectMarker = () => {
      this.setState(
        {
          circleSelected: ""
        },
        () => this.handleMoveend()
      );
    };

    selectMarker = data => {
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
      const { dataFilters, datamesureFilters, isMandataire, filters } = this.props;
      const center = getCenter(this.props.state, this.props.coordinates);
      const filterMesure = {
        content: "type",
        filter: filters,
        connector: ""
      };
      const filteredData = filterDataForMandataires(this.props.filterData, filterMesure);
      const dataShow = isMandataire ? dataFilters : datamesureFilters;
      const mesureCount = filteredData.length;
      return (
        <WrappedComponent
          center={center}
          dataShow={dataShow}
          mesureCount={mesureCount}
          state={this.props.state}
          isMandataire={this.props.isMandataire}
          filterData={this.props.filterData}
          mapRef={this.mapRef}
          zoomCodePostal={this.zoomCodePostal}
          selectMarker={this.selectMarker}
          updateValue={this.updateValue}
          unselectMarker={this.unselectMarker}
          handleMoveend={this.handleMoveend}
          zoom={this.state.zoom}
          coordinates={this.state.coordinates}
          circleSelected={this.state.circleSelected}
          value={this.state.value}
          {...this.props}
        />
      );
    }
  };
}

const mapStateToProps = state => ({
  dataFilters: state.mandataire.dataFilters,
  datamesureFilters: state.mandataire.datamesureFilters,
  services: state.mandataire.services,
  filters: state.mandataire.filters,
  data: state.mandataire.data
});

export default connect(mapStateToProps)(withMapTi);
