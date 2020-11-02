const serviceDetail = ({ service_members }) => {
  const values = service_members.map((val) => val.service.etablissement);
  return { type: "Service", values };
};

const mandataireDetail = ({ mandataire_tis }) => {
  const values = mandataire_tis.map((val) => val.ti.ville);
  return { type: "Tribunaux", values };
};

const magistratDetail = ({ magistrat }) => {
  const values = [
    magistrat && magistrat.ti ? magistrat.ti.ville : "Non renseigné",
  ];

  return { type: "Tribunal", values };
};

const directionDetail = () => {
  return { type: "direction", values: [] };
};

const getAdminUserDetails = (props) => {
  const { user } = props;
  const { type } = user;

  if (type === "service") {
    return serviceDetail(user);
  } else if (["individuel", "prepose"].includes(type)) {
    return mandataireDetail(user);
  } else if (type === "ti") {
    return magistratDetail(user);
  } else {
    return directionDetail(user);
  }
};

export { getAdminUserDetails };
