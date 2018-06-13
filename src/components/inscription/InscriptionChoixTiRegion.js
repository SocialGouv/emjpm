import fetch from "isomorphic-fetch";
import Form from "react-jsonschema-form";
import styled from "styled-components";
import apiFetch from "../communComponents/Api";
import RowModal from "../communComponents/RowModal";
import SearchButton from "../communComponents/SearchButton";
import RegionModel from "./RegionModel";

const regions = [
  {
    id_region: 1,
    nom_region: "Auvergne-Rhône-Alpes"
  },
  {
    id_region: 2,
    nom_region: "Bourgogne-Franche-Comté"
  },
  {
    id_region: 3,
    nom_region: "Bretagne"
  }
];

const InscriptionChoixTiRegion = () => {
  return (
    <div>
      <h2 style={{ margin: 20 }}>Choisissez la / les région(s) de votre activité :</h2>
      <form>
        <div>
          <ul
            style={{
              listStyleType: "none",
              margin: 20,
              width: "100%",
              marginTop: "20px",
              marginBottom: "20px",
              fontSize: 14
            }}
          >
            {regions && regions.map(region => <RegionModel region={region} />)}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default InscriptionChoixTiRegion;
