import { Box } from "rebass";

import { HeadingTitle } from "~/components/HeadingTitle";
import yup from "~/lib/validationSchemas/yup";
import { formatFormInput, parseFormInput, parseFormInt } from "~/util";

import { ENQ_REP_INFO_SERVICE } from "../constants/ENQ_REQ_INFO_SERVICE.const";
import { EnqueteFormInputField, EnqueteFormSelectField } from "../EnqueteForm";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";
import { useEnqueteForm } from "../useEnqueteForm.hook";

function dataToForm(data) {
  return {
    affiliation_federation: formatFormInput(data.affiliation_federation),
    departement: formatFormInput(data.departement),
    nb_structures_concernees: formatFormInput(data.nb_structures_concernees),
    nom: formatFormInput(data.nom),
    region: formatFormInput(data.region),
    type_organisme_gestionnaire: formatFormInput(
      data.type_organisme_gestionnaire
    ),
  };
}

function formToData(data) {
  return {
    affiliation_federation: parseFormInput(data.affiliation_federation),
    departement: parseFormInput(data.departement),
    nb_structures_concernees: parseFormInt(data.nb_structures_concernees),
    nom: parseFormInput(data.nom),
    region: parseFormInput(data.region),
    type_organisme_gestionnaire: parseFormInput(
      data.type_organisme_gestionnaire
    ),
  };
}

export function EnqueteServiceInformationsForm(props) {
  const {
    data = {},
    loading = false,
    step,
    onSubmit,
    enqueteContext,
    dispatchEnqueteContextEvent,
  } = props;

  const validationSchema = yup.object().shape({
    departement: yup.string().required(),
    nom: yup.string().required(),
    region: yup.string().required(),
  });

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
      <Box mt={4}>
        <EnqueteFormInputField
          id="departement"
          label="Département"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />
        <EnqueteFormInputField
          id="region"
          label="Région"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />
        <EnqueteFormInputField
          id="nom"
          label="Nom du mandataire"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <EnqueteFormSelectField
          id="type_organisme_gestionnaire"
          label="Type d'organisme gestionnaire"
          options={ENQ_REP_INFO_SERVICE.TYPE_ORGANISME_GESTIONNAIRE.byKey}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <EnqueteFormInputField
          id="nb_structures_concernees"
          label="Nombre de structures concernées"
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
          type="number"
        />

        <EnqueteFormSelectField
          id="affiliation_federation"
          label="Affiliation à une Fédération"
          options={ENQ_REP_INFO_SERVICE.AFFILIATION_FEDERATION.byKey}
          enqueteContext={enqueteContext}
          enqueteForm={enqueteForm}
        />

        <EnqueteStepperButtons submit={submit} disabled={loading} />
      </Box>
    </form>
  );
}

export default EnqueteServiceInformationsForm;
