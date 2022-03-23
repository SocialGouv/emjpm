import yup from "./yup";

import { EMAIL_NOT_VALID } from "~/validation-schemas/yup";

const adminInvitationSchema = yup.object().shape({
  email: yup.string().email(EMAIL_NOT_VALID).required(EMAIL_NOT_VALID),
});

export { adminInvitationSchema };
