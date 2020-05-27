import { SquaredCross } from "@styled-icons/entypo/SquaredCross";
import React, { Fragment } from "react";
import { Box, Flex, Text } from "rebass";

import styles from "./style";

export const MenuStepper = props => {
  const { sections, currentStep, goToStep } = props;

  return (
    <Fragment>
      <Box py={"50px"} px={4} sx={styles.menu}>
        {sections.map((menuSection, index) => {
          const hasSubSections = menuSection.steps && menuSection.steps.length > 1;
          const isActiveSesion = currentStep.step === index;

          const hasSessionError = hasAnyStepError(menuSection);
          return (
            <Box key={`step-${index}`} mb={4}>
              {renderSectionTitle({
                menuSection,
                index,
                isActiveSesion,
                goToStep,
                hasSessionError
              })}

              {hasSubSections && isActiveSesion && (
                <Box
                  sx={{
                    marginTop: 2,
                    marginLeft: "40px",
                    fontSize: "14px",
                    lineHeight: "30px"
                  }}
                >
                  {menuSection.steps.map((step, subsectionIndex) => {
                    const isActiveSubSection =
                      isActiveSesion &&
                      (currentStep.substep ? currentStep.substep : 0) === subsectionIndex;
                    return renderSubSection({
                      index,
                      subsectionIndex,
                      isActiveSubSection,
                      step,
                      goToStep
                    });
                  })}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Fragment>
  );
};
function hasAnyStepError(menuSection) {
  return menuSection.steps.some(s => s.isValid === false);
}

function renderSectionTitle({ menuSection, index, isActiveSesion, goToStep, hasSessionError }) {
  return (
    <Fragment>
      <Flex
        sx={{
          color: isActiveSesion ? "#007AD9" : "#979797",
          fontWeight: isActiveSesion ? "bold" : "normal",
          cursor: "pointer"
        }}
        alignItems="center"
        onClick={() => goToStep({ step: index, substep: 0 })}
      >
        <Flex
          sx={{
            ...styles.menuTag,
            border: isActiveSesion ? "2px solid #007AD9" : "1px solid #979797"
          }}
        >
          <Text>{index + 1}</Text>
        </Flex>

        <Text ml={3}>
          {menuSection.label || (menuSection.steps.length > 0 ? menuSection.steps[0].label : "")}
        </Text>

        <Box display="flex" flexGrow={1} />
        {hasSessionError && !isActiveSesion && renderErrorBox()}
      </Flex>
    </Fragment>
  );
}
function renderSubSection({ index, subsectionIndex, isActiveSubSection, step, goToStep }) {
  return (
    <Flex
      alignItems="center"
      onClick={() => goToStep({ step: index, substep: subsectionIndex })}
      key={`${step.label}_${index}`}
      sx={{
        color: isActiveSubSection ? "#007AD9" : "#979797",
        fontWeight: isActiveSubSection ? "bold" : "normal",
        cursor: "pointer"
      }}
    >
      <Box width={"15px"}>
        {isActiveSubSection && (
          <Text fontSize={"15px"} mr={2}>
            ▸
          </Text>
        )}
      </Box>

      <Text>{step.label}</Text>

      <Box display="flex" flexGrow={1} />

      {step.isValid === false && renderErrorBox()}
    </Flex>
  );
}

function renderErrorBox() {
  return (
    <Box
      sx={{
        color: "#1D2649",
        width: "24px"
      }}
    >
      <SquaredCross />
    </Box>
  );
}

export default MenuStepper;
