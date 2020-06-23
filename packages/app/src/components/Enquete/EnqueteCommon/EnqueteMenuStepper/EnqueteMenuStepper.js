import React, { Fragment } from "react";
import { Box, Flex, Text } from "rebass";

import {
  EnqueteStatusHalfStarIcon,
  EnqueteStatusInvalidIcon,
  EnqueteStatusStarIcon,
  EnqueteStatusValidIcon,
} from "../EnqueteIcons";
import styles from "./style";

export const EnqueteMenuStepper = (props) => {
  const { readOnly, sections, currentStep, onClickLink } = props;

  return (
    <Fragment>
      <Box py={"50px"} px={4} sx={styles.menu}>
        {sections.map((menuSection, index) => {
          const hasSubSections = menuSection.steps && menuSection.steps.length > 1;
          const isActiveSesion = currentStep.step === index;

          return (
            <Box key={`step-${index}`} mb={4}>
              {renderSectionTitle({
                menuSection,
                index,
                isActiveSesion,
                onClickLink,
                readOnly,
              })}

              {hasSubSections && isActiveSesion && (
                <Box
                  sx={{
                    marginTop: 2,
                    marginLeft: "40px",
                    fontSize: "14px",
                    lineHeight: "30px",
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
                      readOnly,
                      onClickLink,
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
function renderSectionTitle({ menuSection, index, isActiveSesion, readOnly, onClickLink }) {
  return (
    <Fragment>
      <Flex
        sx={{
          color: isActiveSesion
            ? "#007AD9"
            : menuSection.status === "empty"
            ? "#979797"
            : "#555555",
          fontWeight: isActiveSesion ? "bold" : "normal",
          cursor: "pointer",
        }}
        alignItems="center"
        onClick={() => onClickLink({ step: index, substep: 0 })}
      >
        <Flex
          sx={{
            ...styles.menuTag,
            border: isActiveSesion ? "2px solid #007AD9" : "1px solid #979797",
          }}
        >
          <Text>{index + 1}</Text>
        </Flex>

        <Text ml={3}>
          {menuSection.label || (menuSection.steps.length > 0 ? menuSection.steps[0].label : "")}
        </Text>

        <Box display="flex" flexGrow={1} />
        {(!isActiveSesion || menuSection.steps.length === 1) &&
          !readOnly &&
          renderIcon(menuSection.status)}
      </Flex>
    </Fragment>
  );
}
function renderSubSection({
  index,
  subsectionIndex,
  isActiveSubSection,
  step,
  readOnly,
  onClickLink,
}) {
  return (
    <Flex
      alignItems="center"
      onClick={() => onClickLink({ step: index, substep: subsectionIndex })}
      key={`${step.label}_${index}`}
      sx={{
        color: isActiveSubSection ? "#007AD9" : step.status === "empty" ? "#979797" : "#555555",
        fontWeight: isActiveSubSection ? "bold" : "normal",
        cursor: "pointer",
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

      {!readOnly && renderIcon(step.status)}
    </Flex>
  );
}

function renderIcon(status) {
  return status === "valid" ? (
    <EnqueteStatusValidIcon />
  ) : status === "invalid" ? (
    <EnqueteStatusInvalidIcon />
  ) : status === "empty" ? (
    <EnqueteStatusStarIcon />
  ) : status === "empty-half" ? (
    <EnqueteStatusHalfStarIcon />
  ) : null;
}
