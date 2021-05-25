import { Link as StyledLink } from "rebass";

import { AdminEditorEdit } from "~/containers/AdminEditors/AdminEditorEdit";
import { LayoutAdmin } from "~/containers/Layout";
import { Link } from "~/components/Link";
import { BoxWrapper } from "~/components/Grid";

import { useParams } from "react-router-dom";

function Editor() {
  const { editor_id } = useParams();
  const editorId = parseInt(editor_id);

  return (
    <LayoutAdmin>
      <BoxWrapper>
        <Link
          to="/admin/editors"
          component={(props) => (
            <StyledLink
              onClick={() => props.navigate(props.href)}
              my={4}
              display="block"
            >
              &larr; Retour
            </StyledLink>
          )}
        />
        <AdminEditorEdit editorId={editorId} />
      </BoxWrapper>
    </LayoutAdmin>
  );
}

export default Editor;
