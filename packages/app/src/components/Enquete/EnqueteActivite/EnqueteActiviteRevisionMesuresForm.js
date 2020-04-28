import { Heading1, Heading3 } from "@emjpm/ui";
import { Input, Label } from "@rebass/forms";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex } from "rebass";

import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

export const EnqueteActiviteRevisionMesuresForm = props => {
  const {
    goToPrevPage,
    revisionsMainLevee,
    revisionsMasp,
    revisionsReconduction,
    revisionsChangement,
    revisionsAutre
  } = props;
  const { handleSubmit, handleChange, values, errors } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    initialValues: {
      revisionsMainLevee: revisionsMainLevee || "",
      revisionsMasp: revisionsMasp || "",
      revisionsReconduction: revisionsReconduction || "",
      revisionsChangement: revisionsChangement || "",
      revisionsAutre: revisionsAutre || ""
    }
  });

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Heading1 textAlign="center" mb={"80px"}>
          {"Votre activité"}
        </Heading1>

        <Heading3>Révisions de mesures</Heading3>

        <Flex mt={4}>
          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>{`Mainlevées (hors MASP) :`}</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="revisionsMainLevee"
              value={values.revisionsMainLevee}
              hasError={!!errors.revisionsMainLevee}
              onChange={handleChange}
              type="number"
            />
          </Flex>

          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>Changement :</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="revisionsChangement"
              value={values.revisionsChangement}
              hasError={!!errors.revisionsChangement}
              onChange={handleChange}
              type="number"
            />
          </Flex>
        </Flex>
        <Flex mt={4}>
          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>MASP :</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="revisionsMasp"
              value={values.revisionsMasp}
              hasError={!!errors.revisionsMasp}
              onChange={handleChange}
              type="number"
            />
          </Flex>

          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>Autres :</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="revisionsAutre"
              value={values.revisionsAutre}
              hasError={!!errors.revisionsAutre}
              onChange={handleChange}
              type="number"
            />
          </Flex>
        </Flex>
        <Flex mt={4}>
          <Flex alignItems="center" flex={1 / 2}>
            <Label width={"120px"}>Reconduction :</Label>
            <Input
              mx={1}
              width={"60px"}
              min={0}
              placeholder=""
              name="revisionsReconduction"
              value={values.revisionsReconduction}
              hasError={!!errors.revisionsReconduction}
              onChange={handleChange}
              type="number"
            />
          </Flex>

          <Flex flex={1 / 2} />
        </Flex>

        <EnqueteStepperButtons goToPrevPage={goToPrevPage} />
      </form>
    </Box>
  );
};

export default EnqueteActiviteRevisionMesuresForm;
