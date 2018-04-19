import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import PanelFilterMandataires from "../src/components/PanelFilterMandataires";
import TableMandataire from "../src/components/TableMandataire";
import { FicheMandataire } from "../pages/tis";
import OpenStreeMap from "../src/components/Map";

const mandataires = [
  {
    etablissement: "Test etablissement",
    type: "Préposé",
    adresse: "15 rue du Général De Gaulle",
    code_postal: "92100",
    ville: "Neuilly sur Seine",
    referent: "M. Référent",
    telephone: "01 20 40 34 23",
    email: "contact@mandataire.com",
    ti: "Versailles",
    disponibilite: 5,
    dispo_max: 20
  },
  {
    etablissement: "Test etablissement 2",
    type: "Individuel",
    adresse: "3 rue du Monge",
    code_postal: "75101",
    ville: "Paris",
    referent: "Mme. Soleil",
    telephone: "06 76 45 23 23",
    email: "contact@mandataire2.com",
    ti: "Bobigny",
    disponibilite: 12,
    dispo_max: 43
  },
  {
    etablissement: "Test etablissement 3",
    type: "Préposé",
    adresse: "6 bis rue du marché",
    code_postal: "91100",
    ville: "Ivry sur seine",
    referent: "M. Untel",
    telephone: "01 56 23 77 33",
    email: "contact@mandataire3.com",
    ti: "Charenton",
    disponibilite: 15,
    dispo_max: 18
  },
  {
    etablissement: "Test etablissement 4",
    type: "Préposé",
    adresse: "2 rue des Vinaigriers",
    code_postal: "75010",
    ville: "Paris",
    referent: "Mme. coucou",
    telephone: "01 56 23 77 33",
    email: "contact@mandataire4.com",
    ti: "Paris",
    disponibilite: 18,
    dispo_max: 18
  }
];

storiesOf("Tis", module)
  .add("PanelFilters", () => (
    <PanelFilterMandataires updateFilters={() => {}} findPostcode={() => {}} />
  ))
  .add("FicheMandataire", () => <FicheMandataire mandataire={mandataires[0]} />)
  .add("TableMandataire", () => <TableMandataire rows={mandataires} openModal={() => {}} />)
  .add("OpenStreeMap", () => <OpenStreeMap mesure={[]} postcodeMandataire="75010" />);
