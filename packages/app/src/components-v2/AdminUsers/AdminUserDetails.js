import { Text } from "@socialgouv/emjpm-ui-core";
import React from "react";

const ServiceDetail = ({ service_admins }) => (
  <>
    <Text color="textSecondary">Service</Text>
    {service_admins.map((val, index) => (
      <Text key={index}>{val.service.etablissement}</Text>
    ))}
  </>
);

const MandataireDetail = ({ user_tis }) => (
  <>
    <Text color="textSecondary">Tribunaux</Text>
    {user_tis.map((val, index) => (
      <Text key={index}>{val.ti.ville}</Text>
    ))}
  </>
);

const MagistratDetail = ({ magistrat }) => (
  <>
    <Text color="textSecondary">Tribunal</Text>
    <Text>{magistrat && magistrat.ti ? magistrat.ti.ville : "Non renseigné"}</Text>
  </>
);

const DirectionDetail = () => <></>;

const getDetail = type => {
  if (type === "service") {
    return ServiceDetail;
  } else if (["individuel", "prepose"].includes(type)) {
    return MandataireDetail;
  } else if (type === "ti") {
    return MagistratDetail;
  } else {
    return DirectionDetail;
  }
};

const AdminUserDetails = props => {
  const { user } = props;
  const { type } = user;
  const DetailsComponent = getDetail(type);

  return <DetailsComponent {...user} />;
};

export { AdminUserDetails };
