import ReactPiwik from "react-piwik";

export const piwik = new ReactPiwik({
  url: "stats.data.gouv.fr",
  siteId: 52,
  trackErrors: true
});

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

function getJWTPayloadFormLocalStorageIdToken() {
  const token = localStorage.getItem("id_token") || "";
  const [, payloadPart = ""] = token.split(".");
  return JSON.parse(atob(payloadPart) || "{}");
}

export default ReactPiwik;
