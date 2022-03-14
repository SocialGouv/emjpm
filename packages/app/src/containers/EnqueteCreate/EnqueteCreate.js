import { useApolloClient, useMutation } from "@apollo/client";
import { useFormik } from "formik";

import { useHistory } from "react-router-dom";

import yup, { FORM_DATE_NOT_VALID } from "~/validation-schemas/yup";
import {
  Button,
  Field,
  InlineError,
  InputDate,
  InputYear,
  SrOnly,
} from "~/components";
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
      endedAt: yup.date(FORM_DATE_NOT_VALID).required(FORM_DATE_NOT_VALID),
      year: yup
        .string()
        .matches(
          /^[0-9]{4}$/,
          "L'année doit comporter 4 chiffres. Par exemple: 01/01/2021."
        )
        .required(),
    }),
  });

  const { values, touched, handleSubmit, errors } = formik;
  return (
    <form noValidate onSubmit={handleSubmit}>
      <SrOnly id="instructions">
        {"Tous les champs marqués d'un astérisque * sont obligatoires"}
      </SrOnly>
      <Field>
        <InputYear
          value={values.year}
          id="year"
          name="year"
          onChange={(value) => formik.setFieldValue("year", value)}
          placeholderText="Année de l'enquête"
          title="Format: aaaa. Exemple: 2021"
          aria-describedby={
            errors.year && touched.year ? "msg-year" : "year_format_attendu"
          }
        />
        <SrOnly id="year_format_attendu">format attendu : jj/mm/aaaa</SrOnly>
        <div id="msg-year">
          {touched.year && errors.year && (
            <InlineError message={errors.year} fieldId="year" />
          )}
        </div>
      </Field>
      <Field>
        <InputDate
          value={values.endedAt}
          id="endedAt"
          name="endedAt"
          onChange={(value) => formik.setFieldValue("endedAt", value)}
          placeholderText="Date de fin"
          aria-describedby={
            errors.endedAt && touched.endedAt
              ? "msg-endedAt"
              : "endedAt_format_attendu"
          }
        />
        <SrOnly id="endedAt_format_attendu">format attendu : jj/mm/aaaa</SrOnly>
        <div id="msg-endedAt">
          {touched.endedAt && (
            <InlineError message={errors.endedAt} fieldId="endedAt" />
          )}
        </div>
      </Field>
      <Button type="submit">Créer</Button>
    </form>
  );
}

export default EnqueteCreate;
