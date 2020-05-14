import { Heading1, Heading3 } from "@emjpm/ui";
import { Label } from "@rebass/forms";
import { useFormik } from "formik";
import React from "react";
import { Box, Flex, Text } from "rebass";

import { SmallInput } from "../../Commons/SmallInput";
import { EnqueteStepperButtons } from "../EnqueteStepperButtons";

const strongStyle = {
  display: "inline-block",
  fontWeight: "bold",
  color: "#007AD9"
};

export const EnqueteActiviteForm = props => {
  const {
    goToPrevPage,
    title,
    nbMesureEtablissementDebutAnnee,
    nbMesureEtablissementFinAnnee,
    nbMesureDomicileDebutAnnee,
    nbMesureDomicileFinAnnee
  } = props;

  const { handleSubmit, handleChange, values, errors } = useFormik({
    onSubmit: async (values, { setSubmitting }) => {
      await props.handleSubmit(values);
      setSubmitting(false);
    },
    initialValues: {
      nbMesureEtablissementDebutAnnee: nbMesureEtablissementDebutAnnee || "",
      nbMesureEtablissementFinAnnee: nbMesureEtablissementFinAnnee || "",
      nbMesureDomicileDebutAnnee: nbMesureDomicileDebutAnnee || "",
      nbMesureDomicileFinAnnee: nbMesureDomicileFinAnnee || ""
    }
  });

  const totalDebutAnnee =
    (values.nbMesureEtablissementDebutAnnee || 0) + (values.nbMesureDomicileDebutAnnee || 0);

  const totalFinAnnee =
    (values.nbMesureEtablissementFinAnnee || 0) + (values.nbMesureDomicileFinAnnee || 0);

  return (
    <form onSubmit={handleSubmit}>
      <Heading1 textAlign="center" mb={"80px"}>
        {"Votre activité"}
      </Heading1>

      {title && <Heading3>{title}</Heading3>}

      <Text my={4} fontWeight="bold" color="#595959">
        EN ÉTABLISSEMENT
      </Text>

      <Box py={4}>
        <Flex alignItems="center">
          <Label width="auto">Il y avait</Label>
          <SmallInput
            mx={1}
            min={0}
            id="nbMesureEtablissementDebutAnnee"
            name="nbMesureEtablissementDebutAnnee"
            value={values.nbMesureEtablissementDebutAnnee}
            // hasError={!!errors.nbMesureEtablissementDebutAnnee}
            onChange={handleChange}
            type="number"
          />
          <Label width="auto">mesures au 1er janvier et</Label>
          <SmallInput
            mx={1}
            min={0}
            id="nbMesureEtablissementFinAnnee"
            name="nbMesureEtablissementFinAnnee"
            value={values.nbMesureEtablissementFinAnnee}
            hasError={!!errors.nbMesureEtablissementFinAnnee}
            onChange={handleChange}
            type="number"
          />
          <Box sx={{ color: "#595959", fontSize: "13px", fontWeight: "bold" }}>
            {"mesures au 31 décembre, soit une différence de  "}
            <Text sx={strongStyle}>
              {(values.nbMesureEtablissementDebutAnnee || 0) -
                (values.nbMesureEtablissementFinAnnee || 0)}
            </Text>
            {" ."}
          </Box>
        </Flex>

        {/* 
        <Flex mt={5} alignItems="center">
          <Label width="auto">Il y avait</Label>
          <Input
            mx={1}
            width={"50px"}
            min={0}
            placeholder=""
            id="nbMesureEtablissementDebutAnnee"
            name="nbMesureEtablissementDebutAnnee"
            value={values.nbMesureEtablissementDebutAnnee}
            hasError={!!errors.nbMesureEtablissementDebutAnnee}
            onChange={handleChange}
            type="number"
          />
          <Label width="auto">mesures au 1er janvier et</Label>
          <Input
            mx={1}
            width={"50px"}
            min={0}
            placeholder=""
            id="nbMesureEtablissementFinAnnee"
            name="nbMesureEtablissementFinAnnee"
            value={values.nbMesureEtablissementFinAnnee}
            hasError={!!errors.nbMesureEtablissementFinAnnee}
            onChange={handleChange}
            type="number"
          />
          <Label width="auto">{`mesures au 31 décembre, soit une différence de ${(values.nbMesureEtablissementDebutAnnee ||
            0) - (values.nbMesureEtablissementFinAnnee || 0)}.`}</Label>
        </Flex> */}
      </Box>

      <Text my={4} fontWeight="bold" color="#595959">
        À DOMICILE
      </Text>

      <Box>
        <Flex alignItems="center">
          <Label width="auto">Il y avait</Label>
          <SmallInput
            mx={1}
            min={0}
            id="nbMesureDomicileDebutAnnee"
            name="nbMesureDomicileDebutAnnee"
            value={values.nbMesureDomicileDebutAnnee}
            hasError={!!errors.nbMesureDomicileDebutAnnee}
            onChange={handleChange}
            type="number"
          />
          <Label width="auto">mesures au 1er janvier et</Label>
          <SmallInput
            mx={1}
            min={0}
            placeholder=""
            id="nbMesureDomicileFinAnnee"
            name="nbMesureDomicileFinAnnee"
            value={values.nbMesureDomicileFinAnnee}
            hasError={!!errors.nbMesureDomicileFinAnnee}
            onChange={handleChange}
            type="number"
          />
          <Box sx={{ color: "#595959", fontSize: "13px", fontWeight: "bold" }}>
            {"mesures au 31 décembre, soit une différence de  "}
            <Text sx={strongStyle}>
              {(values.nbMesureDomicileDebutAnnee || 0) - (values.nbMesureDomicileFinAnnee || 0)}
            </Text>
            {" ."}
          </Box>
        </Flex>

        {/* <Flex mt={5} alignItems="center">
          <Label width="auto">Il y avait</Label>
          <Input
            mx={1}
            width={"50px"}
            min={0}
            placeholder=""
            id="nbMesureDomicileFinAnnee"
            name="nbMesureDomicileFinAnnee"
            value={values.nbMesureDomicileFinAnnee}
            hasError={!!errors.nbMesureDomicileFinAnnee}
            onChange={handleChange}
            type="number"
          />
          <Label width="auto">mesures au 1er janvier et</Label>
          <Input
            mx={1}
            width={"50px"}
            min={0}
            placeholder=""
            id="nbMesureDomicileFinAnnee"
            name="nbMesureDomicileFinAnnee"
            value={values.nbMesureEtablissementFinAnnee}
            hasError={!!errors.nbMesureEtablissementFinAnnee}
            onChange={handleChange}
            type="number"
          />
          <Label width="auto">{`mesures au 31 décembre, soit une différence de ${(values.nbMesureEtablissementDebutAnnee ||
            0) - (values.nbMesureEtablissementFinAnnee || 0)}.`}</Label>
        </Flex> */}

        <Box sx={{ color: "#595959", fontWeight: "bold" }} mt={"50px"}>
          Soit un total de <Text sx={strongStyle}>{totalDebutAnnee}</Text> mesures au 01/01/2019 et
          de <Text sx={strongStyle}>{totalFinAnnee}</Text> mesures au 31/12/2019.
        </Box>

        <EnqueteStepperButtons goToPrevPage={goToPrevPage} />
      </Box>
    </form>
  );
};

export default EnqueteActiviteForm;
