import { useMutation, useQuery } from "@apollo/react-hooks";
import Router from "next/router";
import React from "react";
import { Card } from "rebass";

import { captureException } from "../../util/sentry";
import { AdminEditorForm } from "./AdminEditorForm";
import { EDIT_EDITOR } from "./mutations";
import { EDITOR } from "./queries";
import { cardStyle } from "./style";

const AdminEditorEdit = (props) => {
  const { editorId } = props;
  const { data, loading, error } = useQuery(EDITOR, {
    variables: { id: editorId },
  });
  const [editEditor] = useMutation(EDIT_EDITOR);

  if (loading) {
    return <div>Chargement</div>;
  }

  if (error) {
    return <div>Erreur</div>;
  }
  const editor = data.editors_by_pk;

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    try {
      await editEditor({
        variables: {
          id: editor.id,
          name: values.name,
          redirect_uris: values.redirect_uris,
        },
      });
    } catch (error) {
      captureException(error);
      setStatus({
        error: "Une erreur est survenue, veuillez réessayer plus tard.",
      });
    }

    setSubmitting(false);
    Router.push("/admin/editors");
  };

  const handleCancel = () => {
    Router.push("/admin/editors");
  };

  return (
    <Card sx={cardStyle} p="0" width="100%">
      <AdminEditorForm
        editor={editor}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Card>
  );
};

export { AdminEditorEdit };
