import { connect } from "react-redux";
import styled from "styled-components";

import DisplayDate from "../communComponents/formatFrenchDate";

const ContainerMandataire = styled.div`
  padding: 10px 0;
  font-size: 1.2em;
  margin-top: 0px;
`;

const Title = styled.div`
  color: black;
  font-size: 1.5em;
  margin: 10px 0;
  text-transform: uppercase;
`;

const HeaderMandataire = ({ profiles, handleClick }) => {
  const fullName = `${(profiles && profiles.nom) || ""} ${(profiles && profiles.prenom) || ""}`;
  return (
    <ContainerMandataire className="container">
      <Title>
        {profiles && profiles.type === "service" ? (
          <div>
            {profiles.etablissement}{" "}
            <a href="#" onClick={handleClick} style={{ fontSize: "0.6em" }}>
              {" "}
              Informations du service
            </a>
          </div>
        ) : (
          fullName
        )}
      </Title>
      <div style={{ textAlign: "right", fontSize: "0.8em", color: "#555" }}>
        {profiles &&
          profiles.date_mesure_update && (
            <div>
              Dernière mise à jour :{" "}
              <DisplayDate date={profiles && profiles.date_mesure_update.slice(0, 10)} />
            </div>
          )}
      </div>
    </ContainerMandataire>
  );
};

const HeaderMandataireRedux = connect(state => ({
  profiles:
    state.mandataire.profiles &&
    state.mandataire.profiles[0] &&
    state.mandataire.profiles[0].type === "service"
      ? state.mandataire.service
      : state.mandataire.profiles[0]
}))(HeaderMandataire);

export default HeaderMandataireRedux;
