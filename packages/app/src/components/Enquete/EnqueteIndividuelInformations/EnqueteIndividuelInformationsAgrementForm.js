import { Heading1, Heading3 } from "@emjpm/ui";
import React from "react";
import { Box } from "rebass";

import yup from "../../../lib/validationSchemas/yup";
import { formatFormBoolean, formatFormInput, parseFormInt } from "../../../util";
import { ENQ_REP_AGREMENTS_FORMATIONS } from "../constants";
import {
  EnqueteFormInputField,
  EnqueteFormSelectField,
  EnqueteFormYesNoField,
} from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

// schema identique à enqueteAgrementsFormationsStatus (côté hasura actions)
export const validationSchema = yup.object().shape({
  debut_activite_avant_2009: yup.boolean().required(),
  annee_agrement: yup.number().integer().min(2009).required(),
  nb_departements: yup.mixed().oneOf(ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.keys).required(),
  nb_mesures_dep_finance: yup.number().integer().required(),
  nb_mesures_dep_autres: yup.number().integer().required(),
});

function dataToForm(data) {
  return {
    debut_activite_avant_2009: formatFormBoolean(data.debut_activite_avant_2009),
    annee_agrement: formatFormInput(data.annee_agrement),
    nb_departements: formatFormInput(data.nb_departements),
    nb_mesures_dep_finance: formatFormInput(data.nb_mesures_dep_finance),
    nb_mesures_dep_autres: formatFormInput(data.nb_mesures_dep_autres),
  };
}

function formToData(values) {
  return {
    debut_activite_avant_2009: values.debut_activite_avant_2009,
    annee_agrement: parseFormInt(values.annee_agrement),
    nb_departements: values.nb_departements,
    nb_mesures_dep_finance: parseFormInt(values.nb_mesures_dep_finance),
    nb_mesures_dep_autres: parseFormInt(values.nb_mesures_dep_autres),
  };
}
export const EnqueteIndividuelInformationsAgrementForm = (props) => {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const enqueteForm = useEnqueteForm({
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
    data,
    step,
    validationSchema,
    dataToForm,
    formToData,
    loading,
  });

  const { submitForm, submit } = enqueteForm;

  return (
    <form onSubmit={submitForm}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Vos informations"}
      </Heading1>
      <Heading3>{"Agrément"}</Heading3>

      <Box mt={4}>
        <EnqueteFormYesNoField
          id={`debut_activite_avant_2009`}
          label="Exerciez vous l'activité de mandataire avant le 01/01/2009 ?"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />
        <EnqueteFormInputField
          id="annee_agrement"
          label="Indiquez l'année de votre agrément selon les nouvelles modalités prévues par la loi du 5 mars 2007"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          type="number"
          min={2009}
        />
        <EnqueteFormSelectField
          id="nb_departements"
          label="Nombre de départements dans lesquels vous disposez d'un agrément"
          options={ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.byKey}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />
        <EnqueteFormInputField
          id="nb_mesures_dep_finance"
          label="Nombre de mesures au 31/12 exercées dans le département dans lequel vous avez obtenu votre premier agrément et qui vous finance"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          type="number"
          min={0}
        />
        <EnqueteFormInputField
          id="nb_mesures_dep_autres"
          label="Le cas échéant, nombre de mesures exerçées dans les autres départements"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          type="number"
          min={0}
        />
        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </Box>
    </form>
  );
};

export default EnqueteIndividuelInformationsAgrementForm;
