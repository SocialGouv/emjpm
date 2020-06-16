import yup from "./yup";

const satisfactionCampaignSchema = yup.object().shape({
  endedAt: yup
    .date()
    .when(
      "startedAt",
      (startDate, schema) =>
        startDate &&
        schema.min(startDate, "La date de fin doit être postérieure à la date de début")
    )
    .required(),
  name: yup.string().required(),
  startedAt: yup.date().required(),
});

export { satisfactionCampaignSchema };
