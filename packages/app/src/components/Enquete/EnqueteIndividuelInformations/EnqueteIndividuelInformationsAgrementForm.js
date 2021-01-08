import { Box } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import yup from "~/lib/validationSchemas/yup";
import { Heading3 } from "~/ui";
import { formatFormBoolean, formatFormInput, parseFormInt } from "~/util";

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
  annee_agrement: yup.number().integer().min(2009).required(),
  debut_activite_avant_2009: yup.boolean().required(),
  nb_departements: yup
    .mixed()
    .oneOf(ENQ_REP_AGREMENTS_FORMATIONS.NB_DEPARTEMENTS.keys)
    .required(),
  nb_mesures_dep_autres: yup.number().integer().required(),
  nb_mesures_dep_finance: yup.number().integer().required(),
});

function dataToForm(data) {
  return {
    annee_agrement: formatFormInput(data.annee_agrement),
    debut_activite_avant_2009: formatFormBoolean(
      data.debut_activite_avant_2009
    ),
    nb_departements: formatFormInput(data.nb_departements),
    nb_mesures_dep_autres: formatFormInput(data.nb_mesures_dep_autres),
    nb_mesures_dep_finance: formatFormInput(data.nb_mesures_dep_finance),
  };
}

function formToData(values) {
  return {
    annee_agrement: parseFormInt(values.annee_agrement),
    debut_activite_avant_2009: values.debut_activite_avant_2009,
    nb_departements: values.nb_departements,
    nb_mesures_dep_autres: parseFormInt(values.nb_mesures_dep_autres),
    nb_mesures_dep_finance: parseFormInt(values.nb_mesures_dep_finance),
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
    data,
    dataToForm,
    dispatchEnqueteContextEvent,
    enqueteContext,
    formToData,
    loading,
    onSubmit,
    step,
    validationSchema,
  });

  const { submitForm, submit } = enqueteForm;

  return (
    <form onSubmit={submitForm}>
      <HeadingTitle textAlign="center" mb={"50px"}>
        {"Vos informations"}
      </HeadingTitle>
      <Heading3>{"Agrément"}</Heading3>

      <Box mt={4}>
        <EnqueteFormYesNoField
          id={"debut_activite_avant_2009"}
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
