import React from "react";
import { Flex } from "rebass";
import { AngleLeft } from "@styled-icons/fa-solid/AngleLeft";
import { AngleDoubleLeft } from "@styled-icons/fa-solid/AngleDoubleLeft";
import { AngleRight } from "@styled-icons/fa-solid/AngleRight";
import { AngleDoubleRight } from "@styled-icons/fa-solid/AngleDoubleRight";

const months = [
  "Javier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function getYear(date) {
  return new Date(date).getFullYear();
}

function getMonth(date) {
  return new Date(date).getMonth();
}

export default function DatePickerHeader({
  decreaseMonth,
  prevMonthButtonDisabled,
  increaseMonth,
  nextMonthButtonDisabled,
  decreaseYear,
  increaseYear,
  nextYearButtonDisabled,
  prevYearButtonDisabled,
  date,
}) {
  return (
    <Flex justifyContent="space-between" alignItems="center" margin="1">
      <Flex justifyContent="space-between">
        <button
          onClick={decreaseYear}
          disabled={prevYearButtonDisabled}
          aria-label="l'année précédente"
          title="l'année précédente"
        >
          <AngleDoubleLeft
            width="20"
            height="20"
            aria-hidden="true"
            focusable="false"
            role="img"
          />
        </button>
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          aria-label="le mois précédent"
          title="le mois précédent"
        >
          <AngleLeft
            width="20"
            height="20"
            aria-hidden="true"
            focusable="false"
            role="img"
          />
        </button>
      </Flex>
      <h2
        id="id-dialog-label"
        class="monthYear"
        aria-live="polite"
        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
      >
        {`${months[getMonth(date)]} ${getYear(date)}`}
      </h2>

      <Flex justifyContent="space-between">
        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          aria-label="le mois suivant"
          title="le mois suivant"
        >
          <AngleRight
            width="20"
            height="20"
            aria-hidden="true"
            focusable="false"
            role="img"
          />
        </button>
        <button
          onClick={increaseYear}
          disabled={nextYearButtonDisabled}
          aria-label="l'année suivante"
          title="l'année suivante"
        >
          <AngleDoubleRight
            width="20"
            height="20"
            aria-hidden="true"
            focusable="false"
            role="img"
          />
        </button>
      </Flex>
    </Flex>
  );
}
