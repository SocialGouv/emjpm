import { connect } from "react-redux";
import styled from "styled-components";

import DisplayDate from "../communComponents/formatFrenchDate";
import { Mail } from "react-feather";

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

const HeaderMandataire = ({
  nom = "",
  prenom = "",
  date_mesure_update,
  type,
  etablissement,
  dispo_max,
  mesures_en_cours,
  mesures_en_attente
}) => {
  const currentDispos = dispo_max - mesures_en_cours - mesures_en_attente || null;
  const fullName = `${nom || ""} ${prenom || ""}`;
  const SiegeSocial = styled.div`
    background-color: white;
    text-transform: none;
    font-size: 0.6em;
    padding: 10px;
    display: flex;
    flex-direction: row;
  `;

  const iconStyle = { width: 22, height: 22, marginRight: 10 };

  return (
    <ContainerMandataire className="container">
      <Title>
        {profiles && profiles.type === "service" ? (
          <div>
            {profiles.etablissement} <br />
            <SiegeSocial>
              <div style={{ flex: "1 0 auto" }}>
                Nombres totales de mesures souhaités: {profiles.dispo_max} mesures &nbsp; &nbsp;
                <Mail style={iconStyle} />
                {profiles.email}
              </div>

              <a
                href="#"
                onClick={handleClick}
                style={{ flex: "1 0 90px", textAlign: "right", paddingRight: 10 }}
              >
                {" "}
                Toutes les informations
              </a>
            </SiegeSocial>
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
