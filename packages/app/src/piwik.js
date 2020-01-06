import cookie from "js-cookie";
import ReactPiwik from "react-piwik";

export const doTrackPageChange = url => {
  ReactPiwik.push(["setDocumentTitle", document && document.title]);
  ReactPiwik.push(["setCustomUrl", url]);
  ReactPiwik.push(["setGenerationTimeMs", 0]);
  ReactPiwik.push(["trackPageView"]);
};

export const trackPageChange = url => {
  // ! HACK(douglasduteil): track page after next full lifecycle
  // ! This is ugly but as we are using the `Head` component from "next/head",
  // ! to update the title, somehow the title is updated after the
  // ! `componentDidMount` of the routing components...
  setTimeout(doTrackPageChange, 0, url);
};

export const trackUser = () => {
  const { username, type } = getJWTPayloadFormLocalStorageIdToken();
  username && ReactPiwik.push(["setUserId", username]);
  type && ReactPiwik.push(["setCustomVariable", 1, "type", type, "visit"]);
};

export const untrackUser = () => {
  ReactPiwik.push(["resetUserId"]);
};

function getJWTPayloadFormLocalStorageIdToken() {
  const token = cookie.get("token");
  const [, payloadPart = ""] = token.split(".");
  // prevent some token decoding exceptions
  // "Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded."
  try {
    return JSON.parse(atob(payloadPart) || "{}");
  } catch (error) {
    /* eslint-disable no-console */
    console.log("Error decoding JWT", error);
    /* eslint-enable no-console */
    return {};
  }
}

const piwikSetup = () => {
  const isBrowser = typeof window !== undefined;
  if (!isBrowser) {
    return;
  }

  ReactPiwik.push(["trackContentImpressionsWithinNode", document.getElementById("__next")]);

  ReactPiwik.push(["setCustomUrl", document.location.href]);
  ReactPiwik.push(["setDocumentTitle", document.title]);

  trackUser();

  ReactPiwik.push(["trackPageView"]);
  ReactPiwik.push(["enableLinkTracking"]);
};

export { piwikSetup, ReactPiwik as default };
