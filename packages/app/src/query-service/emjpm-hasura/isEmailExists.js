import gql from "graphql-tag";

const CHECK_EMAIL_UNICITY = gql`
  query checkEmailExists($email: String!) {
    check_email_exists(email: $email) {
      exist
    }
  }
`;

const isEmailExists = async (client, email) => {
  const checkEmail = await client.query({
    fetchPolicy: "network-only",
    query: CHECK_EMAIL_UNICITY,
    variables: {
      email,
    },
  });
  return checkEmail.data.check_email_exists.exist;
};

export default isEmailExists;
