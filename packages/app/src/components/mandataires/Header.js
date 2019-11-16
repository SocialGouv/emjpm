import React from "react";
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
`;

const HeaderMandataire = ({ nom = "", prenom = "", profiles, handleClick, user, service }) => {
  const fullName = `${nom || ""} ${prenom || ""}`;

  const SiegeSocial = styled.div`
    border-bottom: 1px solid #53657d;
    padding-top: 5px
    padding-bottom: 10px;
    text-transform: none;
    font-size: 0.5em;
    display: flex;
    flex-direction: row;
    margin-bottom: 30px;
    color: #53657d
  `;

  return (
    <ContainerMandataire className="container">
      <Title>
        {user && user.type === "service" ? (
          <div>
            <b style={{ fontSize: "2em" }}>{service.etablissement} </b> <br />
            <SiegeSocial>
              <div style={{ flex: "1 0 auto" }}>
                Nombre total de mesures souhaitées : {service.dispo_max} mesures &nbsp; &nbsp;
                {service.email}
                <a
                  href="#"
                  onClick={handleClick}
                  style={{ flex: "1 0 auto", paddingLeft: "10px", textAlign: "left" }}
                >
                  {" "}
                  Toutes les informations
                </a>
              </div>

              <div style={{ color: "#53657d", fontSize: "1em", textAlign: "right" }}>
                {profiles && profiles.date_mesure_update && (
                  <div>
                    Dernière mise à jour :{" "}
                    <DisplayDate date={profiles && profiles.date_mesure_update.slice(0, 10)} />
                  </div>
                )}
              </div>
            </SiegeSocial>
          </div>
        ) : (
          <div>{fullName}</div>
        )}
      </Title>
    </ContainerMandataire>
  );
};

const HeaderMandataireRedux = connect(state => ({
  profiles: state.mandataire.profiles,
  service: state.mandataire.service,
  user: state.mandataire.user
}))(HeaderMandataire);

export default HeaderMandataireRedux;
