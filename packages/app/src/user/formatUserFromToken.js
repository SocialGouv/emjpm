export function formatUserFromToken(currentUser) {
  if (currentUser) {
    const hasuraClaims = currentUser["https://hasura.io/jwt/claims"];
    const agrements = hasuraClaims["x-hasura-agrements"];

    return {
      __typename: "CurrentUser",
      agrements: agrements
        ? JSON.parse(agrements.replace("{", "[").replace("}", "]"))
        : [],
      id: hasuraClaims["x-hasura-user-id"],
      role: hasuraClaims["x-hasura-default-role"],
      serviceId: hasuraClaims["x-hasura-service-id"],
    };
  } else {
    return null;
  }
}
