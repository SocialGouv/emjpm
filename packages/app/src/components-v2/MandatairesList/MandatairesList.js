import React from "react";
import { Box } from "rebass";

import { MandatairesListStyle } from "./style";
import { Mandatairelist } from "@socialgouv/emjpm-ui-components";

console.log(Mandatairelist);

const datas = [
  {
    currentAvailability: 50,
    cvLink: "http://google.fr",
    dispo_max: 150,
    email: "sarah@connor.com",
    id: 123,
    isAvailable: true,
    isWoman: true,
    nom: "Sarah",
    prenom: "Connor",
    telephone_portable: "0683961487",
    type: "individuel",
    ville: "Paris"
  },
  {
    currentAvailability: -50,
    cvLink: "http://google.fr",
    dispo_max: 150,
    email: "johnhenry@skynet.com",
    id: 123,
    isAvailable: true,
    isWoman: false,
    nom: "John",
    prenom: "henry",
    telephone_portable: "0683961487",
    type: "service",
    ville: "Paris"
  },
  {
    currentAvailability: 50,
    cvLink: "http://google.fr",
    dispo_max: 150,
    email: "sarah@connor.com",
    id: 123,
    isAvailable: true,
    isWoman: true,
    nom: "Sarah",
    prenom: "Connor",
    telephone_portable: "0683961487",
    type: "individuel",
    ville: "Paris"
  },
  {
    currentAvailability: -50,
    cvLink: "http://google.fr",
    dispo_max: 150,
    email: "johnhenry@skynet.com",
    id: 123,
    isAvailable: true,
    isWoman: false,
    nom: "John",
    prenom: "henry",
    telephone_portable: "0683961487",
    type: "service",
    ville: "Paris"
  },
  {
    currentAvailability: 50,
    cvLink: "http://google.fr",
    dispo_max: 150,
    email: "sarah@connor.com",
    id: 123,
    isAvailable: true,
    isWoman: true,
    nom: "Sarah",
    prenom: "Connor",
    telephone_portable: "0683961487",
    type: "individuel",
    ville: "Paris"
  },
  {
    currentAvailability: -50,
    cvLink: "http://google.fr",
    dispo_max: 150,
    email: "johnhenry@skynet.com",
    id: 123,
    isAvailable: true,
    isWoman: false,
    nom: "John",
    prenom: "henry",
    telephone_portable: "0683961487",
    type: "service",
    ville: "Paris"
  }
];

const MandatairesList = props => {
  return (
    <Box sx={MandatairesListStyle} {...props}>
      <Mandatairelist mandataires={datas} />
    </Box>
  );
};

export { MandatairesList };
