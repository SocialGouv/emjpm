import React, { createRef } from "react";

//Redux
import { connect } from "react-redux";

import apiFetch from "../communComponents/Api";
import getCenter from "../communComponents/getCenter";
import { filterDataForMandataires } from "../index";


class DisplayMap extends React.Component {
  state = {
    filterData: [],
    zoom: 7,
    loading: false,
    circleSelected: ""
  };

    mapRef = createRef();

  fetchData = () => {
    const mapRefGetBound = mapRef.current.leafletElement.getBounds();
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

  componentDidUpdate(prevProps, prevState) {
    // hack to force reload when some redux state change
    if (prevProps.data !== this.props.data) {
      this.fetchData();
    }
  }

  handleMoveend = () => {
    this.fetchData();
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

  render() {
    const { dataFilters, datamesureFilters, isMandataire, filters, coordinates } = this.props;
    const center = getCenter(this.state, coordinates);
    const filterMesure = {
      content: "type",
      filter: filters,
      connector: ""
    };
    const filteredData = filterDataForMandataires(this.state.filterData, filterMesure);
    const dataShow = isMandataire ? dataFilters : datamesureFilters;
    const mesureCount = filteredData.length;

    return this.props.render({
      handleMoveend: this.handleMoveend,
      center: center,
      zoom: this.state.zoom,
      isMandataire: isMandataire,
      dataShow: dataShow,
      circleSelected: this.state.circleSelected,
      mesureCount: mesureCount,
      filteredData: filteredData,
      unselectMarker: this.unselectMarker,
      selectMarker: this.selectMarker,
    });
  }
}

const mapStateToProps = state => ({
  dataFilters: state.mandataire.dataFilters,
  datamesureFilters: state.mandataire.datamesureFilters,
  services: state.mandataire.services,
  filters: state.mandataire.filters,
  data: state.mandataire.data,
  coordinates: state.map.coordinates
});

export default connect(mapStateToProps)(DisplayMap);
