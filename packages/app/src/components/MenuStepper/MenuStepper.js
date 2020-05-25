import { Cross } from "@styled-icons/entypo/Cross";
import { SquaredCross } from "@styled-icons/entypo/SquaredCross";
import React, { useState } from "react";
import { Box, Flex, Text } from "rebass";

import { LinkButton } from "../../components/Commons";
import styles from "./style";

function goToNextPage(sections, currentStep, setCurrentStep) {
  const { step, substep } = currentStep;
  const currentSection = sections[step];

  if (currentSection.steps.length <= 1 || substep + 1 === currentSection.steps.length) {
    setCurrentStep({ step: step + 1, substep: 0 });
  } else {
    setCurrentStep({ step, substep: substep + 1 });
  }
}

function goToPrevPage(sections, currentStep, setCurrentStep) {
  const { step, substep } = currentStep;
  if (substep > 0) {
    setCurrentStep({ step, substep: substep - 1 });
  } else if (currentStep.step - 1 >= 0) {
    const substep = sections[currentStep.step - 1].steps.length;
    setCurrentStep({ step: currentStep.step - 1, substep: substep - 1 });
  }
}

export const MenuStepper = props => {
  const { sections, enqueteId, ...otherProps } = props;

  const [currentStep, setCurrentStep] = useState({ step: 0, substep: 0 });
  const section = sections[currentStep.step];
  const ComponentForm = section.steps[currentStep.substep || 0].component;

  return (
    <Flex>
      <Box py={"50px"} px={4} sx={styles.menu}>
        {sections.map((menuSection, index) => {
          const hasSubSections = menuSection.steps && menuSection.steps.length > 1;
          const activeSection = currentStep.step === index;
          const hasError = menuSection.steps.some(s => s.isValid === false);

          return (
            <Box key={`step-${index}`} mb={4}>
              <Flex
                sx={{
                  color: activeSection ? "#007AD9" : "#979797",
                  fontWeight: activeSection ? "bold" : "normal",
                  cursor: "pointer"
                }}
                alignItems="center"
                onClick={() => setCurrentStep({ step: index, substep: 0 })}
              >
                <Flex
                  sx={{
                    ...styles.menuTag,
                    border: activeSection ? "2px solid #007AD9" : "1px solid #979797"
                  }}
                >
                  <Text>{index + 1}</Text>
                </Flex>

                <Text ml={3}>
                  {menuSection.label ||
                    (menuSection.steps.length > 0 ? menuSection.steps[0].label : "")}
                </Text>
              </Flex>

              {hasError && (
                <Flex
                  sx={{
                    marginTop: 1,
                    borderRadius: "5px",
                    fontWeight: "bold",
                    paddingX: 2,
                    paddingY: 1,
                    alignItems: "center",
                    backgroundColor: "#1D2649",
                    color: "white"
                  }}
                >
                  <Box width={"30px"}>
                    <Cross />
                  </Box>
                  <Text ml={2}>Réponses manquantes</Text>
                </Flex>
              )}

              {hasSubSections && (
                <Box
                  sx={{
                    marginTop: 2,
                    marginLeft: "40px",
                    fontSize: "14px",
                    lineHeight: "30px"
                  }}
                >
                  {menuSection.steps.map((step, subsectionIndex) => {
                    const active =
                      activeSection &&
                      (currentStep.substep ? currentStep.substep : 0) === subsectionIndex;

                    return (
                      <Flex
                        alignItems="center"
                        onClick={() => setCurrentStep({ step: index, substep: subsectionIndex })}
                        color={active ? "#007AD9" : "#979797"}
                        fontWeight={active ? "bold" : "normal"}
                        key={`${step.label}_${index}`}
                      >
                        <Box width={"15px"}>
                          {active && (
                            <Text fontSize={"15px"} mr={2}>
                              ▸
                            </Text>
                          )}
                        </Box>

                        <Text>{step.label}</Text>

                        {step.isValid === false && (
                          <Box
                            sx={{
                              marginLeft: 3,
                              color: "#1D2649",
                              width: "30px"
                            }}
                          >
                            <SquaredCross />
                          </Box>
                        )}
                      </Flex>
                    );
                  })}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
      <Box py={"50px"} pl={"35px"} flex={1}>
        <Flex flexDirection="row" justifyContent="flex-end">
          <Box mr={1}>
            <LinkButton
              href={`/mandataires/enquetes/[enquete_id]/import`}
              asLink={`/mandataires/enquetes/${enqueteId}/import`}
            >
              Importez votre enquête
            </LinkButton>
          </Box>
        </Flex>
        {ComponentForm && (
          <ComponentForm
            {...otherProps}
            enqueteId={enqueteId}
            goToPrevPage={() => goToPrevPage(sections, currentStep, setCurrentStep)}
            goToNextPage={() => goToNextPage(sections, currentStep, setCurrentStep)}
          />
        )}
      </Box>
    </Flex>
  );
};

export default MenuStepper;
