import { Map, Marker, Popup, TileLayer } from "react-leaflet";

export const MapsView = ({ mesures, zoom, center, width, height }) => (
  <Map center={center} zoom={zoom} style={{ width, height }}>
    <TileLayer
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    />
    {mesures &&
      mesures.map(manda => (
        <Marker
          key={manda.id}
          position={[manda.latitude, manda.longitude]}
          style={{ backgroundColor: "black" }}
        >
          <Popup>
            <span>
              {manda.nom} <br />
              {manda.prenom} <br />
              {manda.type} <br />
              {/*{manda.date_ouverture} <br />*/}
            </span>
          </Popup>
        </Marker>
      ))}
  </Map>
);

class Mapstry extends React.Component {
  state = {
    zoom: 10
  };

  render() {
    const center = this.props.postcodeMandataire
      ? [this.props.postcodeMandataire[0], this.props.postcodeMandataire[1]]
      : [50.459441, 2.693963];
    return (
      <MapsView
        zoom={this.state.zoom}
        width={this.props.width}
        height={this.props.height}
        center={center}
        mesures={this.props.mesures}
      />
    );
  }
}

export default Mapstry;
