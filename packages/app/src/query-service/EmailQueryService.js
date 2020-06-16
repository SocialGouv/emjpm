import gql from "graphql-tag";

const CHECK_EMAIL_UNICITY = gql`
  {
    users {
      email
    }
  }
`;

export const isEmailExists = async (client, email) => {
  const checkEmail = await client.query({
    context: {
      headers: {
        "X-Hasura-Email": email,
      },
    },
    fetchPolicy: "network-only",
    query: CHECK_EMAIL_UNICITY,
  });
  return checkEmail.data.users.length > 0;
};
