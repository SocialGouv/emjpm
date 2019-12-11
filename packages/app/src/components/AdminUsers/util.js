const serviceDetail = ({ service_admins }) => {
  const values = service_admins.map(val => val.service.etablissement);
  return { type: "Service", values };
};

const mandataireDetail = ({ user_tis }) => {
  const values = user_tis.map(val => val.ti.ville);
  return { type: "Tribunaux", values };
};

const magistratDetail = ({ magistrat }) => {
  const values = [magistrat && magistrat.ti ? magistrat.ti.ville : "Non renseigné"];

  return { type: "Tribunal", values };
};

const directionDetail = () => {
  return { type: "direction", values: [] };
};

export const getAdminUserDetails = user => {
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
