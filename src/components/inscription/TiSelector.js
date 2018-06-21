import fetch from "isomorphic-fetch";
import Form from "react-jsonschema-form";
import styled from "styled-components";
import apiFetch from "../communComponents/Api";
import RowModal from "../communComponents/RowModal";
import SearchButton from "../communComponents/SearchButton";
import RegionModel from "./RegionModel";

class TiSelector extends React.Component {
  state = {
    tiSelected: []
  };

  render() {
    return (
      <div>
        <h2 style={{ margin: 20 }}>Choisissez la / les région(s) de votre activité :</h2>
        <div
          style={{
            listStyleType: "none",
            margin: 20,
            width: "100%",
            marginTop: "20px",
            marginBottom: "20px",
            fontSize: 14
          }}
        >
          {this.props.regions &&
            this.props.regions.map(region => (
              <RegionModel
                tis={this.props.tis.filter(tis => region.id === tis.id_region)}
                nom={region.nom}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default TiSelector;
