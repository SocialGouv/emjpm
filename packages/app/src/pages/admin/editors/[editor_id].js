import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminEditorEdit } from "~/components/AdminEditors/AdminEditorEdit";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { BoxWrapper } from "~/ui";

import { useParams } from "react-router-dom";

const Editor = () => {
  const { editor_id: editorId } = useParams();

  return (
    <LayoutAdmin>
      <BoxWrapper>
        <Link to="/admin/editors">
          <StyledLink my={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <AdminEditorEdit editorId={editorId} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

export default Editor;
