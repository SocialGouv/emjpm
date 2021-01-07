import { useApolloClient, useMutation } from "@apollo/client";
import { useFormik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";

import yup from "~/lib/validationSchemas/yup";
import { Button, Field, InlineError, Input } from "~/ui";

import { CREATE_ENQUETE } from "./mutations";
import { ENQUETES } from "./queries";

export const EnqueteCreate = () => {
  const client = useApolloClient();
  const history = useHistory();
  const [createEnquete] = useMutation(CREATE_ENQUETE, {
    onCompleted: () => history.push("/direction/enquetes"),
    refetchQueries: [{ query: ENQUETES }],
  });
  const formik = useFormik({
    initialValues: {
      endedAt: "",
      year: new Date().getFullYear(),
    },
    onSubmit: async (values, formikHelpers) => {
      const { data } = await client.query({ query: ENQUETES });
      if (
        data &&
        data.enquetes.some((e) => Number(e.annee) === Number(values.year))
      ) {
        history.push("/direction/enquetes");
      }

      await createEnquete({
        variables: { endedAt: `${values.endedAt}`, year: `${values.year}` },
      });
      formikHelpers.setSubmitting(false);
    },
    validationSchema: yup.object().shape({
      endedAt: yup.date().required(),
      year: yup
        .string()
        .matches(/^[0-9]{4}$/, "L'année doit comporter 4 chiffres.")
        .required(),
    }),
  });

  const { values, touched, handleChange, handleSubmit, errors } = formik;
  return (
    <form onSubmit={handleSubmit}>
      <Field>
        <Input
          maxLength={4}
          value={values.year}
          id="year"
          name="year"
          hasError={!!errors.year}
          onChange={handleChange}
          placeholder="Année de l'enquête"
        />
        {touched.year && <InlineError message={errors.year} fieldId="year" />}
      </Field>
      <Field>
        <Input
          value={values.endedAt}
          id="endedAt"
          name="endedAt"
          hasError={!!errors.endedAt}
          onChange={handleChange}
          placeholder="Date de fin"
          type="date"
        />
        {touched.endedAt && (
          <InlineError message={errors.endedAt} fieldId="endedAt" />
        )}
      </Field>
      <Button type="submit">Créer</Button>
    </form>
  );
};

export default EnqueteCreate;
