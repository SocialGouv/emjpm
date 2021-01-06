import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminEditorEdit } from "~/components/AdminEditors/AdminEditorEdit";
import { LayoutAdmin } from "~/components/Layout";
import { Link } from "~/components/Link";
import { BoxWrapper } from "~/ui";

import useQuery from "~/util/useQuery";

const Editor = () => {
  const { editor_id: editorId } = useQuery();

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
