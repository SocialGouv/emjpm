import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { ServiceEditInformations } from "~/containers/ServiceEditInformations";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";
import { Helmet } from "react-helmet";

export default function EditInformations() {
  const {
    service: { id: serviceId },
  } = useUser();
  return (
    <>
      <Helmet>
        <title>Editer les informations de votre service | e-MJPM</title>
      </Helmet>
      <LayoutServices>
        <BoxWrapper mt={3}>
          <HeadingTitle mx="1">
            Editer les informations de votre service
          </HeadingTitle>
          <ServiceEditInformations
            mt="3"
            serviceId={serviceId}
            cancelLink="/services/informations"
            successLink="/services/informations"
          />
        </BoxWrapper>
      </LayoutServices>
    </>
  );
}
