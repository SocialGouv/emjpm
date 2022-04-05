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

const gerPreviousMonth = (date) => {
  const m = getMonth(date);
  const y = getYear(date);
  if (Number(m) === 0) {
    return `${months[11]} ${y - 1}`;
  } else {
    return `${months[m - 1]} ${y}`;
  }
};

const getNextMonth = (date) => {
  const m = getMonth(date);
  const y = getYear(date);
  if (Number(m) === 11) {
    return `${months[0]} ${y + 1}`;
  } else {
    return `${months[m + 1]} ${y}`;
  }
};

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
          type="button"
          onClick={decreaseYear}
          disabled={prevYearButtonDisabled}
          aria-label={`année précédente, ${getYear(date) - 1}`}
          title={`année précédente, ${getYear(date) - 1}`}
        >
          <AngleDoubleLeft
            width="20"
            height="20"
            aria-hidden="true"
            focusable="false"
            role="img"
            color="#ccc"
          />
        </button>
        <button
          type="button"
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          aria-label={`mois précédent, ${gerPreviousMonth(date)}`}
          title={`mois précédent, ${gerPreviousMonth(date)}`}
        >
          <AngleLeft
            width="20"
            height="20"
            aria-hidden="true"
            focusable="false"
            role="img"
            color="#ccc"
          />
        </button>
      </Flex>
      <h2
        id="id-dialog-label"
        className="monthYear"
        aria-live="polite"
        style={{ fontSize: "1.2rem", fontWeight: "bold" }}
      >
        {`${months[getMonth(date)]} ${getYear(date)}`}
      </h2>

      <Flex justifyContent="space-between">
        <button
          type="button"
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          title={`mois suivant, ${getNextMonth(date)}`}
          aria-label={`mois suivant, ${getNextMonth(date)}`}
        >
          <AngleRight
            width="20"
            height="20"
            aria-hidden="true"
            focusable="false"
            role="img"
            color="#ccc"
          />
        </button>
        <button
          type="button"
          onClick={increaseYear}
          disabled={nextYearButtonDisabled}
          title={`année suivante, ${getYear(date) + 1}`}
          aria-label={`année suivante, ${getYear(date) + 1}`}
        >
          <AngleDoubleRight
            width="20"
            height="20"
            aria-hidden="true"
            focusable="false"
            role="img"
            color="#ccc"
          />
        </button>
      </Flex>
    </Flex>
  );
}
