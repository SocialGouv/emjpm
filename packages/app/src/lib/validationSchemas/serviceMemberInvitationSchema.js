import yup from "./yup";

const serviceMemberInvitationSchema = yup.object().shape({
  email: yup.string().required()
});

export { serviceMemberInvitationSchema };
