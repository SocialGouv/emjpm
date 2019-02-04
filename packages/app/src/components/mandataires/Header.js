import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import DisplayDate from "../communComponents/formatFrenchDate";

const ContainerMandataire = styled.div`
  padding: 10px 0;
  font-size: 1.2em;
  margin-top: 0px;
  height: 100px;
`;

const Title = styled.div`
  color: black;
  font-size: 1.5em;
  margin: 10px;
  text-transform: uppercase;
`;

const HeaderMandataire = ({ nom, prenom, date_mesure_update, type, etablissement }) => (
  <ContainerMandataire className="container">
    <Title>
      {type === "service" ? (
        <div>
          {" "}
          {etablissement} <br />
          {nom} {prenom}{" "}
        </div>
      ) : (
        `${nom} ${prenom}`
      )}
    </Title>
    <div style={{ textAlign: "right", fontSize: "0.8em", color: "#555" }}>
      {date_mesure_update && (
        <div>
          Dernière mise à jour : <DisplayDate date={date_mesure_update.slice(0, 10)} />
        </div>
      )}
    </div>
  </ContainerMandataire>
);

const HeaderMandataireRedux = connect(state => state.mandataire.profile)(HeaderMandataire);

export default HeaderMandataireRedux;
