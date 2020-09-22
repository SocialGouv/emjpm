import { BoxWrapper } from "@emjpm/ui";
import Link from "next/link";
import React from "react";
import { Link as StyledLink } from "rebass";

import { AdminEditorEdit } from "../../../src/components/AdminEditors/AdminEditorEdit";
import { LayoutAdmin } from "../../../src/components/Layout";
import { withAuthSync } from "../../../src/util/auth";

const Editor = (props) => {
  const { editorId } = props;

  return (
    <LayoutAdmin>
      <BoxWrapper>
        <Link href="/admin/editors">
          <StyledLink my={4} display="block">
            &larr; Retour
          </StyledLink>
        </Link>
        <AdminEditorEdit editorId={editorId} />
      </BoxWrapper>
    </LayoutAdmin>
  );
};

Editor.getInitialProps = async ({ query }) => {
  return { editorId: query.editor_id };
};

export default withAuthSync(Editor);
