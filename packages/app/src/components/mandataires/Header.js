import { connect } from "react-redux";
import styled from "styled-components";

import DisplayDate from "../communComponents/formatFrenchDate";
import { CheckCircle, XCircle } from "react-feather";
import { serviceSiegeSocial } from "./serviceSiegeSocial";
import * as React from "react";

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

const Alert = ({ className, Icon, message }) =>
  (message && (
    <div
      className={`alert ${className || ""}`}
      role="alert"
      style={{ marginTop: 20, marginLeft: 20, fontSize: "1.2em" }}
    >
      <Icon
        style={{
          verticalAlign: "middle",
          marginRight: 10
        }}
      />{" "}
      {message}
    </div>
  )) ||
  null;

const ErrorBox = ({ message }) => (
  <Alert className="alert-danger" Icon={XCircle} message={message} />
);

const SucessBox = ({ message }) => (
  <Alert className="alert-success" Icon={CheckCircle} message={message} />
);

class HeaderMandataire extends React.Component {
  render() {
    const {
      nom = "",
      prenom = "",
      date_mesure_update,
      type,
      etablissement,
      dispo_max,
      mesures_en_cours,
      mesures_en_attente
    } = this.props;
    const currentDispos = dispo_max - mesures_en_cours - mesures_en_attente || null;
    const fullName = `${nom || ""} ${prenom || ""}`;

    return (
      <ContainerMandataire className="container">
        <Title>
          {type === "service" ? (
            <div>
              {etablissement} <br />
            </div>
          ) : (
            fullName
          )}
        </Title>
        {type !== "service" && currentDispos > 0 ? (
          <div>
            <SucessBox
              message={`Les magistrats voient que ${currentDispos} peuvent vous être attribuées.`}
            />
          </div>
        ) : type !== "service" && currentDispos ? (
          <div>
            <ErrorBox
              message={`Les magistrats voient que le nombre de mesures dépasse
          le nombre souhaité de ${currentDispos} mesures.`}
            />
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
        <a href="#" onClick={this.props.handleClick}> Informations du service</a>
      </ContainerMandataire>
    );
  }
}

const HeaderMandataireRedux = connect(state => state.mandataire.profile)(HeaderMandataire);

export default HeaderMandataireRedux;
