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

  onTiSelected = (tiId, checked) => {
    console.log(tiId, checked);

    this.setState(state => {
      if (checked && state.tiSelected.indexOf(tiId) === -1) {
        //  state.tiSelected.push(tiId);
        return {
          tiSelected: [...state.tiSelected, tiId]
        };
      }
      if (!checked && state.tiSelected.indexOf(tiId) > -1) {
        const ids = [...state.tiSelected];
        ids.splice(ids.indexOf(tiId), 1);
        return {
          tiSelected: ids
        };
        //  state.tiSelected.splice(state.tiSelected.indexOf(tiId), 1);
      }
    });
  };

  render() {
    console.log(this.state.tiSelected);
    return (
      <div>
        <h2 style={{ margin: 20 }}>
          Choisissez les tribunaux d&apos;instances de votre activité profesionelle dans vos régions
          :
        </h2>
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
          {this.props.tis &&
            Object.keys(this.props.tis).map(region => (
              <RegionModel
                tis={this.props.tis[region]}
                nom={region}
                key={region}
                onTiSelected={this.onTiSelected}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default TiSelector;
