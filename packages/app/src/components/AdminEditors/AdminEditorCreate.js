import { useMutation } from "@apollo/react-hooks";
import { Card } from "@emjpm/ui";
import Router from "next/router";
import React from "react";

import { captureException } from "../../util/sentry";
import { AdminEditorForm } from "./AdminEditorForm";
import { ADD_EDITOR } from "./mutations";
import { cardStyle } from "./style";

export const AdminEditorCreate = () => {
  const [addEditor] = useMutation(ADD_EDITOR);

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    // TODO(paullaunay): generate key on server-side via hasura webhook or postgres func
    const api_token = Math.random().toString(36).substring(2);

    try {
      await addEditor({
        variables: {
          name: values.name,
          api_token,
        },
      });
    } catch (error) {
      captureException(error);
      setStatus({ error: "Une erreur est survenue, veuillez réessayer plus tard." });
    }

    setSubmitting(false);
    Router.push("/admin/editors");
  };

  const handleCancel = () => {
    Router.push("/admin/editors");
  };

  return (
    <Card sx={cardStyle} p="0" width="100%">
      <AdminEditorForm handleSubmit={handleSubmit} handleCancel={handleCancel} />
    </Card>
  );
};
