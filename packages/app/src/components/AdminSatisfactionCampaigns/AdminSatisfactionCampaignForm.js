import { Button, Field, Heading4, InlineError, Input } from "@emjpm/ui";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { satisfactionCampaignSchema } from "../../lib/validationSchemas";

export const AdminSatisfactionCampaignForm = (props) => {
  const { handleCancel, handleSubmit, satisfaction_campaign } = props;
  const { name, started_at, ended_at } = satisfaction_campaign || {};

  const formik = useFormik({
    onSubmit: handleSubmit,
    validationSchema: satisfactionCampaignSchema,
    initialValues: {
      name: name || "",
      startedAt: started_at || "",
      endedAt: ended_at || "",
    },
  });

  return (
    <Flex flexWrap="wrap">
      <Box width={[1, 2 / 5]} bg="cardSecondary" p="5">
        <Box height="230px">
          <Heading4>{`Information de la campagne de satisfaction`}</Heading4>
        </Box>
      </Box>
      <Box p="5" width={[1, 3 / 5]}>
        <Box mb="2">
          <form onSubmit={formik.handleSubmit}>
            <Field>
              <Input
                value={formik.values.name}
                id="name"
                name="name"
                hasError={formik.errors.name && formik.touched.name}
                onChange={formik.handleChange}
                placeholder="Nom de la campagne"
              />
              {formik.touched.name && <InlineError message={formik.errors.name} fieldId="name" />}
            </Field>
            <Field>
              <Input
                type="date"
                value={formik.values.startedAt}
                id="startedAt"
                name="startedAt"
                hasError={formik.errors.startedAt && formik.touched.startedAt}
                onChange={formik.handleChange}
                placeholder="Date de début"
              />
              {formik.touched.startedAt && (
                <InlineError message={formik.errors.startedAt} fieldId="startedAt" />
              )}
            </Field>
            <Field>
              <Input
                type="date"
                value={formik.values.endedAt}
                id="endedAt"
                name="endedAt"
                hasError={formik.errors.endedAt && formik.touched.endedAt}
                onChange={formik.handleChange}
                placeholder="Date de fin"
              />
              {formik.touched.endedAt && (
                <InlineError message={formik.errors.endedAt} fieldId="endedAt" />
              )}
            </Field>
            <Flex justifyContent="flex-end">
              {handleCancel && (
                <Box>
                  <Button type="button" mr="2" variant="outline" onClick={handleCancel}>
                    Annuler
                  </Button>
                </Box>
              )}
              <Box>
                <Button
                  type="submit"
                  disabled={formik.isSubmitting}
                  isLoading={formik.isSubmitting}
                >
                  Enregistrer
                </Button>
              </Box>
            </Flex>
          </form>
        </Box>
      </Box>
    </Flex>
  );
};
