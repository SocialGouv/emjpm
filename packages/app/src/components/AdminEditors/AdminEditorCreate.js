import { useMutation } from "@apollo/react-hooks";
import { Card } from "@socialgouv/emjpm-ui-core";
import Router from "next/router";
import React from "react";

import { AdminEditorForm } from "./AdminEditorForm";
import { ADD_EDITOR } from "./mutations";
import { cardStyle } from "./style";

export const AdminEditorCreate = () => {
  const [addEditor] = useMutation(ADD_EDITOR);

  const handleSubmit = async (values, { setSubmitting }) => {
    // TODO(paullaunay): generate key on server-side via hasura webhook or postgres func
    const api_token = Math.random()
      .toString(36)
      .substring(2);

    try {
      await addEditor({
        variables: {
          name: values.name,
          api_token
        }
      });
    } catch (error) {
      // TODO(paullaunay): log error in sentry and form
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
