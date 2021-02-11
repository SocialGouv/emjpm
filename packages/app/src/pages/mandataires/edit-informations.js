import { LayoutMandataire } from "~/containers/Layout";
import { MandataireEditInformations } from "~/containers/MandataireEditInformations";
import useUser from "~/hooks/useUser";
import { PATH } from "~/constants/basePath";
import { BoxWrapper } from "~/components/Grid";

function EditInformations() {
  const { id, type } = useUser();

  const redirectLink = `${PATH[type]}/informations`;

  return (
    <LayoutMandataire>
      <BoxWrapper px="1">
        <MandataireEditInformations
          userId={id}
          userType={type}
          cancelLink={redirectLink}
          successLink={redirectLink}
          mt="3"
        />
      </BoxWrapper>
    </LayoutMandataire>
  );
}

export default EditInformations;
