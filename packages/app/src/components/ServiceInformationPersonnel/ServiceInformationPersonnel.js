import { useMutation, useQuery } from "@apollo/react-hooks";
import React, { useContext, useState } from "react";
import { Box } from "rebass";

import Sentry from "../../util/sentry";
import { UserContext } from "../UserContext";
import { UPDATE_SERVICE_PERSONNEL } from "./mutations";
import { SERVICE_PERSONNEL } from "./queries";
import { ServiceInformationPersonnelForm } from "./ServiceInformationPersonnelForm";
import { ServiceInformationPersonnelView } from "./ServiceInformationPersonnelView";

const ServiceInformationPersonnel = () => {
  const { service_members } = useContext(UserContext);
  const [service_member] = service_members;
  const service = service_member.service;

  const [edit, setEdit] = useState(false);

  const { data, error, loading } = useQuery(SERVICE_PERSONNEL, {
    variable: { service_id: service.id },
  });

  const [updateServicePersonnel] = useMutation(UPDATE_SERVICE_PERSONNEL);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await updateServicePersonnel({
        variables: {
          service_id: service.id,
          nombre_postes_delegues_etp: values.nombrePostesDeleguesEtp,
          nombre_delegues: values.nombreDelegues,
          nombre_poste_autre_personnel_etp: values.nombrePosteAutrePersonnelEtp,
          nombre_delegues_cnc: values.nombreDeleguesCnc,
          nombre_delegues_cnc_pjm: values.nombreDeleguesCncPjm,
          nombre_delegues_cnc_maj: values.nombreDeleguesCncMaj,
          nombre_delegues_cnc_dpf: values.nombreDeleguesCncDpf,
          nombre_delegues_en_formation: values.nombreDeleguesEnFormation,
          nombre_delegues_non_formes: values.nombreDeleguesNonFormes,
        },
      });
      setEdit(false);
    } catch (error) {
      Sentry.captureException(error);
      setStatus({ error: "Une erreur est survenue, veuillez réessayer plus tard." });
    }

    setSubmitting(false);
  };

  if (error) {
    return null;
  }

  if (loading) {
    return null;
  }

  const [personnel] = data.service_personnels;

  return (
    <Box p={5}>
      {edit ? (
        <ServiceInformationPersonnelForm
          personnel={personnel}
          handleSubmit={handleSubmit}
          handleCancel={() => setEdit(false)}
        />
      ) : (
        <ServiceInformationPersonnelView personnel={personnel} handleEdit={handleEdit} />
      )}
    </Box>
  );
};

export { ServiceInformationPersonnel };
