export const getHeadquarter = user_antennes => {
  return user_antennes.filter(user_antenne => user_antenne.service_antenne.headquarters === true);
};
