import ReactPiwik from "./react-piwik";

let piwik;

if (typeof window !== "undefined") {
  piwik = new ReactPiwik({
    url: "stats.data.gouv.fr",
    siteId: 52
  });
}

export default ReactPiwik;
