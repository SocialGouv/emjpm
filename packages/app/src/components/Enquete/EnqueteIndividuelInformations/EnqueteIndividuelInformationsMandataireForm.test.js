import userEvent from "@testing-library/user-event";
import React from "react";

import { INTERVALLE_ETP_OPTIONS } from "../../../constants/mandataire";
import { render } from "../../../util/test-utils";
import { EnqueteIndividuelInformationsMandataireForm } from "./EnqueteIndividuelInformationsMandataireForm";

test("it should naviguate to previous step", async () => {
  var goToPrevPageMock = jest.fn();
  const { getByText } = render(
    <EnqueteIndividuelInformationsMandataireForm goToPrevPage={goToPrevPageMock} />
  );
  const prevButton = getByText("Précédent");
  userEvent.click(prevButton);
  expect(goToPrevPageMock).toHaveBeenCalledTimes(1);
});

test("it should display initial values", () => {
  const data = {
    anciennete: 5,
    benevole: false,
    estimation_etp: INTERVALLE_ETP_OPTIONS[1].value,
    forme_juridique: "SASU",
    local_professionnel: true,
    secretaire_specialise_etp: 5,
  };

  const { getByLabelText } = render(
    <EnqueteIndividuelInformationsMandataireForm data={data} handleSubmit={() => jest.fn()} />
  );

  const formeJuridique = getByLabelText(/Forme juridique de votre entreprise/i);
  expect(formeJuridique.value).toEqual("SASU");

  const secretaireSpecialiseEtp = getByLabelText(
    /Estimation de l'activité en ETP du secrétariat spécialisé/i
  );
  expect(secretaireSpecialiseEtp.value).toEqual(5);
});

test('it should display "forme juridique" field when "benevole" field is not selected', () => {
  const data = {
    benevole: false,
    forme_juridique: "Autoentrepreneur",
  };

  const { getByLabelText } = render(<EnqueteIndividuelInformationsMandataireForm data={data} />);
  expect(getByLabelText(/Forme juridique de votre entreprise/i)).toHaveValue("Autoentrepreneur");
});

test('it should hide "forme juridique" field when "benevole" field is selected', () => {
  const { queryByLabelText } = render(
    <EnqueteIndividuelInformationsMandataireForm data={{ benevole: true }} />
  );
  expect(queryByLabelText(/Forme juridique de votre entreprise/i)).toBeNull();
});
