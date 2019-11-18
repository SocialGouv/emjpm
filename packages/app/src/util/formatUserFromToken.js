export const formatUserFromToken = currentUser => {
  if (currentUser) {
    return {
      __typename: "CurrentUser",
      antenneId: currentUser["https://hasura.io/jwt/claims"]["x-hasura-antenne-id"],
      id: currentUser["https://hasura.io/jwt/claims"]["x-hasura-user-id"],
      realUserId: currentUser.realUserId,
      role: currentUser["https://hasura.io/jwt/claims"]["x-hasura-default-role"],
      serviceId: currentUser["https://hasura.io/jwt/claims"]["x-hasura-service-id"]
    };
  } else {
    return null;
  }
};
