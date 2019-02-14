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
  return (
    <ContainerMandataire className="container">
      <Title>
        {type === "service" ? (
          <div>
            {etablissement} <br />
            {fullName}
          </div>
        ) : (
          fullName
        )}
      </Title>
      {currentDispos > 0 ? (
        <div>
          Je déclare actuellement aux juges pouvoir prendre {currentDispos} mesures supplémentaires.
          <br />
          (le chiffre correspond au nb mesures souhaitées - mesures en cours - mesures réservées)
          <br />
          <div style={{ fontSize: "0.8em", fontStyle: "italic" }}>
            rendez-vous dans "Mes informations" pour modifier la capacité souhaitée
          </div>
        </div>
      ) : currentDispos ? (
        <div>
          Je déclare actuellement aux juges que le nombre de mesures (en cours + réservées) dépasse
          le nombre souhaité de {currentDispos} mesures.
        </div>
      ) : (
        ""
      )}
      <div style={{ textAlign: "right", fontSize: "0.8em", color: "#555" }}>
        {date_mesure_update && (
          <div>
            Dernière mise à jour : <DisplayDate date={date_mesure_update.slice(0, 10)} />
          </div>
        )}
      </div>
    </ContainerMandataire>
  );
};

const HeaderMandataireRedux = connect(state => state.mandataire.profile)(HeaderMandataire);

export default HeaderMandataireRedux;
