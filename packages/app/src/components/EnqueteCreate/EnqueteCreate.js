import { useApolloClient, useMutation } from "@apollo/react-hooks";
import { Button, Field, InlineError, Input } from "@emjpm/ui";
import { useFormik } from "formik";
import Router from "next/router";
import React from "react";

import yup from "../../lib/validationSchemas/yup";
import { CREATE_ENQUETE } from "./mutations";
import { ENQUETES } from "./queries";

export const EnqueteCreate = () => {
  const client = useApolloClient();
  const [createEnquete] = useMutation(CREATE_ENQUETE, {
    onCompleted: () => Router.push("/direction/enquetes"),
    refetchQueries: [{ query: ENQUETES }]
  });
  const formik = useFormik({
    initialValues: {
      year: new Date().getFullYear() - 1,
      endDate: ""
    },
    onSubmit: async (values, formikHelpers) => {
      const { data } = await client.query({ query: ENQUETES });
      if (data && data.enquetes.some(e => Number(e.annee) === Number(values.year))) {
        Router.push("/direction/enquetes");
      }

      await createEnquete({ variables: { year: `${values.year}` } });
      formikHelpers.setSubmitting(false);
    },
    validationSchema: yup.object().shape({
      year: yup
        .string()
        .matches(/^[0-9]{4}$/, "L'année doit comporter 4 chiffres.")
        .required(),
      endDate: yup.date().required()
    })
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
          placeholder="Année"
        />
        {touched.year && <InlineError message={errors.year} fieldId="year" />}
      </Field>
      <Field>
        <Input
          value={values.endDate}
          id="endDate"
          name="endDate"
          hasError={!!errors.endDate}
          onChange={handleChange}
          placeholder="Date de fin"
          type="date"
        />
        {touched.endDate && <InlineError message={errors.endDate} fieldId="endDate" />}
      </Field>
      <Button type="submit">Créer</Button>
    </form>
  );
};

export default EnqueteCreate;
