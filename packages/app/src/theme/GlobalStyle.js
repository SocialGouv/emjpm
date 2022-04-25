import { css, Global } from "@emotion/react";
import emotionNormalize from "emotion-normalize";
import mdxClasses from "~/utils/mdx/styles";

const styles = css`
  /*** Custom css reset ***/
  *,
  *::after {
  *::before,
    box-sizing: border-box;
  }
  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  button {
    background-color: transparent;
    color: inherit;
    border-width: 0;
    padding: 0;
    cursor: pointer;
  }
  figure {
    margin: 0;
  }
  input::-moz-focus-inner {
    border: 0;
    padding: 0;
    margin: 0;
  }
  ul,
  ol,
  dd {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }
  p {
    margin: 0;
  }
  cite {
    font-style: normal;
  }
  fieldset {
    border-width: 0;
    padding: 0;
    margin: 0;
  }
  html {
    overflow-y:scroll;
  }
  body,
  html,
  div#root {
    font-size: 14px;
    font-family: "Open Sans", sans-serif;
    background: #f2f5f9;
    -webkit-font-smoothing: antialiased;
    height: 100%;
  }
  div#root{
    display: flex;
    flex-direction: column;
  }
  .react-tooltip {
    z-index: 9999 !important;
  }

  ${emotionNormalize}

  abbr[title] {
    position: relative;
    text-decoration: none;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px white inset !important;
  }
  input {
    filter: none;
  }
  button.react-datepicker__close-icon{
    display: none !important;
  }

  ${mdxClasses}

  div.ScrollbarsCustom-Track.ScrollbarsCustom-TrackY{
    background-color: #B5B5B5 !important;
  }
  div.ScrollbarsCustom-Thumb.ScrollbarsCustom-ThumbY{
    background: #404044 !important;
  }

`;

export default function GlobalStyle() {
  return <Global styles={styles} />;
}
