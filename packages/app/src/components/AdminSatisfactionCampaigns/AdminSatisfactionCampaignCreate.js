import { useMutation } from "@apollo/react-hooks";
import { Card } from "@emjpm/ui";
import Router from "next/router";
import React from "react";

import { captureException } from "../../util/sentry";
import { AdminSatisfactionCampaignForm } from "./AdminSatisfactionCampaignForm";
import { ADD_SATISFACTION_CAMPAIGN } from "./mutations";
import { cardStyle } from "./style";

export const AdminSatisfactionCampaignCreate = () => {
  const [addSatisfactionCampaign] = useMutation(ADD_SATISFACTION_CAMPAIGN);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await addSatisfactionCampaign({
        variables: {
          ended_at: values.endedAt,
          name: values.name,
          started_at: values.startedAt,
        },
      });
    } catch (error) {
      captureException(error);
      setStatus({
        error: "Une erreur est survenue, veuillez réessayer plus tard",
      });
    }

    setSubmitting(false);
    Router.push("/admin/satisfaction-campaigns");
  };

  const handleCancel = () => {
    Router.push("/admin/satisfaction-campaigns");
  };

  return (
    <Card sx={cardStyle} p="0" width="100%">
      <AdminSatisfactionCampaignForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Card>
  );
};
