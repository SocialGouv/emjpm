import React from "react";
import { useLocation } from "react-router-dom";

export const useMatomo = () => {
  const location = useLocation();

  const previousPathRef = React.useRef(null);

  React.useEffect(() => {
    const { pathname } = location;
    if (previousPathRef.current === pathname) {
      return;
    }

    // In order to ensure that the page title had been updated,
    // we delayed pushing the tracking to the next tick.
    setTimeout(() => {
      const q = location.search;
      if (previousPathRef.current) {
        matopush(["setReferrerUrl", `${previousPathRef.current}`]);
      }
      matopush(["setCustomUrl", pathname]);
      matopush(["setDocumentTitle", document.title]);
      matopush(["deleteCustomVariables", "page"]);
      matopush(["setGenerationTimeMs", 0]);
      if (/^\/recherche/.test(pathname)) {
        matopush(["trackSiteSearch", q]);
      } else {
        matopush(["trackPageView"]);
      }
      matopush(["enableLinkTracking"]);
      previousPathRef.current = pathname;
    }, 0);
  }, [location]);
};

window._paq = window._paq || [];
export function matopush(args) {
  window._paq.push(args);
}
