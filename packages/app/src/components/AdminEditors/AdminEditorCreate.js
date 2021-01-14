import { useMutation } from "@apollo/client";

import { useHistory } from "react-router-dom";

import { Card } from "~/ui";
import { captureException } from "~/util/sentry";

import { AdminEditorForm } from "./AdminEditorForm";
import { ADD_EDITOR } from "./mutations";
import { cardStyle } from "./style";

export function AdminEditorCreate() {
  const [addEditor] = useMutation(ADD_EDITOR);
  const history = useHistory();

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    // TODO(paullaunay): generate key on server-side via hasura webhook or postgres func
    const api_token = Math.random().toString(36).substring(2);

    try {
      await addEditor({
        variables: {
          api_token,
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
    history.push("/admin/editors");
  };

  function handleCancel() {
    history.push("/admin/editors");
  }

  return (
    <Card sx={cardStyle} p="0" width="100%">
      <AdminEditorForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </Card>
  );
}
