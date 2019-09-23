export const formatUserFromToken = currentUser => {
  if (currentUser) {
    return {
      role: currentUser["https://hasura.io/jwt/claims"]["x-hasura-default-role"],
      serviceId: currentUser["https://hasura.io/jwt/claims"]["x-hasura-service-id"],
      id: currentUser["https://hasura.io/jwt/claims"]["x-hasura-user-id"],
      antenneId: currentUser["https://hasura.io/jwt/claims"]["x-hasura-antenne-id"],
      __typename: "CurrentUser"
    };
  } else {
    return null;
  }
};
