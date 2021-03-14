import { useApolloClient, useMutation } from "@apollo/client";
import { useFormik } from "formik";

import { useHistory } from "react-router-dom";

import yup from "~/validation-schemas/yup";
import { Button, Field, InlineError, InputDate, InputYear } from "~/components";
import useQueryReady from "~/hooks/useQueryReady";

import { CREATE_ENQUETE } from "./mutations";
import { ENQUETES } from "./queries";

export function EnqueteCreate() {
  const client = useApolloClient();
  const history = useHistory();
  const [createEnquete, { error, loading }] = useMutation(CREATE_ENQUETE, {
    refetchQueries: [{ query: ENQUETES }],
    context: { headers: { "x-hasura-role": "direction_nationale" } },
  });
  useQueryReady(loading, error);
  const formik = useFormik({
    initialValues: {
      endedAt: "",
      year: new Date().getFullYear(),
    },
    onSubmit: async (values, formikHelpers) => {
      const { data } = await client.query({ query: ENQUETES });
      if (
        !(
          data &&
          data.enquetes.some((e) => Number(e.annee) === Number(values.year))
        )
      ) {
        await createEnquete({
          variables: { endedAt: `${values.endedAt}`, year: `${values.year}` },
        });
      }

      formikHelpers.setSubmitting(false);
      history.push("/direction/enquetes");
    },
    validationSchema: yup.object().shape({
      endedAt: yup.date().required(),
      year: yup
        .string()
        .matches(/^[0-9]{4}$/, "L'année doit comporter 4 chiffres.")
        .required(),
    }),
  });

  const { values, touched, handleSubmit, errors } = formik;
  return (
    <form onSubmit={handleSubmit}>
      <Field>
        <InputYear
          value={values.year}
          id="year"
          name="year"
          onChange={(value) => formik.setFieldValue("year", value)}
          placeholderText="Année de l'enquête"
        />
        {touched.year && errors.year && (
          <InlineError message={errors.year} fieldId="year" />
        )}
      </Field>
      <Field>
        <InputDate
          value={values.endedAt}
          id="endedAt"
          name="endedAt"
          onChange={(value) => formik.setFieldValue("endedAt", value)}
          placeholderText="Date de fin"
        />
        {touched.endedAt && (
          <InlineError message={errors.endedAt} fieldId="endedAt" />
        )}
      </Field>
      <Button type="submit">Créer</Button>
    </form>
  );
}

export default EnqueteCreate;
