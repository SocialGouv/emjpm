import { useContext } from "react";

import { HeadingTitle } from "~/containers/HeadingTitle";
import { LayoutServices } from "~/containers/Layout";
import { ServiceEditInformations } from "~/containers/ServiceEditInformations";
import useUser from "~/hooks/useUser";
import { BoxWrapper } from "~/components/Grid";

export default function EditInformations() {
  const {
    service: { id: serviceId },
  } = useUser();
  return (
    <LayoutServices>
      <BoxWrapper mt={6}>
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
  );
}
