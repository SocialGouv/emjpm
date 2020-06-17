export default ({ mandataire }) => {
  const lbUser = mandataire.lb_user;
  if (!lbUser || !lbUser.lb_departements) {
    return false;
  }
  return (
    lbUser.lb_departements.filter((elm) => {
      if (!elm.departement_financeur) {
        return false;
      }
      return elm.departement.code === "75";
    }).length > 0
  );
};
