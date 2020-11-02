function isPayedByParis({ mandataire }) {
  const lbUser = mandataire.lb_user;
  if (!lbUser || !lbUser.lb_departements) {
    return false;
  }

  const { lb_user_etablissements, lb_departements } = lbUser;
  if (lb_user_etablissements && lb_user_etablissements.length > 0) {
    return lb_user_etablissements.some((e) => {
      return (
        e.etablissement &&
        e.etablissement_rattachement === true &&
        e.etablissement.departement &&
        e.etablissement.departement.code === "75"
      );
    });
  } else if (lb_departements && lb_departements.length > 0) {
    return lb_departements.some(
      (e) => e.departement_financeur && e.departement.code === "75"
    );
  }
  return false;
}

export default isPayedByParis;
