import { useFormik } from "formik";

import { Box, Flex } from "rebass";

import { serviceMemberInvitationSchema } from "~/validation-schemas";
import {
  Button,
  Field,
  Heading,
  InlineError,
  Input,
  Text,
  SrOnly,
} from "~/components";

function ServiceMemberInvitationForm(props) {
  const { handleSubmit } = props;

  const formik = useFormik({
    initialValues: { email: "" },
    onSubmit: handleSubmit,
    validationSchema: serviceMemberInvitationSchema,
  });

  return (
    <Flex mb={4}>
      <Box width={[1 / 2]} bg="cardSecondary" borderRadius="5px 0 0 5px" p="5">
        <Heading size={4}>{"Invitez un nouveau membre au service"}</Heading>
        <Text lineHeight="1.5" color="textSecondary">
          {"Un email contenant les instructions d'inscription sera envoyé."}
        </Text>
        <SrOnly id="instructions">
          {"Tous les champs marqués d'un astérisque * sont obligatoires"}
        </SrOnly>
      </Box>
      <Box as="form" onSubmit={formik.handleSubmit} p={5} width={[1 / 2]}>
        <Field>
          <Input
            value={formik.values.email}
            id="email"
            name="email"
            hasError={formik.touched.email && formik.errors.email}
            onChange={formik.handleChange}
            placeholder="Email"
            autoComplete="email"
            ariaLabel="Votre email"
            aria-describedby={
              formik.errors.email && formik.touched.email
                ? "msg-email"
                : "format_email"
            }
          />
          <SrOnly id="format_email">format attendu : nom@justice.fr </SrOnly>
          <div id="msg-email">
            {formik.touched.email && (
              <InlineError message={formik.errors.email} fieldId="email" />
            )}
          </div>
        </Field>
        <Flex alignItems="center" justifyContent="flex-end">
          <Box>
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              isLoading={formik.isSubmitting}
              title="Inviter le membre au service"
              aria-label="Inviter le membre au service"
            >
              Inviter
            </Button>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

export { ServiceMemberInvitationForm };
