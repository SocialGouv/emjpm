function parseHasuraSessionVariables(req) {
  const {
    "x-hasura-role": hasuraRole,
    "x-hasura-user-id": hasuraUserId,
    "x-hasura-service-id": hasuraServiceId
  } = req.body.session_variables;

  return {
    role: hasuraRole,
    user_id: hasuraUserId !== "null" ? parseInt(hasuraUserId) : undefined,
    service_id:
      hasuraServiceId !== "null" ? parseInt(hasuraServiceId) : undefined
  };
}

module.exports = {
  parseHasuraSessionVariables
};
