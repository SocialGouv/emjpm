import React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { styled } from "@stitches/react";
import { Box } from "rebass";

const StyledRadio = styled(RadioGroupPrimitive.Item, {
  all: "unset",
  backgroundColor: "white",
  width: 18,
  height: 18,
  borderRadius: "100%",

  border: "1px solid #007AD9",
  "&:hover": { backgroundColor: "hsl(252 96.9% 97.4%)" },
  "&:focus": { boxShadow: `0 0 0 1px #007AD9` },
  cursor: "pointer",
  "&[disabled]": {
    border: "1px solid #9F9FA8",
    cursor: "alias",
    background: "white",
  },
});

const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    width: 10,
    height: 10,
    borderRadius: "50%",
    backgroundColor: "#007AD9",
  },
});

const RadioGroup = RadioGroupPrimitive.Root;
const RadioGroupRadio = StyledRadio;
const RadioGroupIndicator = StyledIndicator;

const Flex = styled("div", { display: "flex" });

const Label = styled("label", {
  paddingLeft: 10,
  fontWeight: 600,
});

export default function AccessibleRadioGroup(props) {
  const {
    options,
    onValueChange,
    value,
    renderBesideRadio,
    RadioGroupAriaLabel,
  } = props;

  return (
    <>
      <RadioGroup
        value={value}
        aria-label={RadioGroupAriaLabel ? RadioGroupAriaLabel : ""}
        onValueChange={(el) => {
          const selected = options.find((op) => op.value === el);
          if (!selected.disabled) {
            onValueChange(el);
          }
        }}
      >
        {options.map((option) => {
          return (
            <Flex css={{ margin: "10px 0", alignItems: "center" }}>
              <RadioGroupRadio
                id={option.label}
                checked={option.checked || option.value === value}
                disabled={option.disabled}
                name={option.name ? option.name : ""}
                value={option.value}
              >
                <RadioGroupIndicator />
              </RadioGroupRadio>
              <Flex
                style={{
                  flexBasis: "240px",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "240px",
                }}
              >
                <Label
                  htmlFor={option.label}
                  style={{
                    color: option.disabled ? "#9F9FA8" : "inherit",
                    cursor: option.disabled ? "alias" : "pointer",
                  }}
                >
                  {option.label}
                </Label>
                <Box>{renderBesideRadio && renderBesideRadio(option)}</Box>
              </Flex>
            </Flex>
          );
        })}
      </RadioGroup>
    </>
  );
}
