import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import useScript, { SCRIPT_STATUS } from "~/hooks/useScript";

import initTarteaucitron from "~/util/initTarteaucitron";

export const useMatomo = () => {
  const location = useLocation();

  const previousPathRef = useRef(null);

  const status = useScript("/tarteaucitron/tarteaucitron.js");
  useEffect(() => {
    if (status === SCRIPT_STATUS.READY) {
      initTarteaucitron();
    }
  }, [status]);

  useEffect(() => {
    const { pathname } = location;
    if (previousPathRef.current === pathname) {
      return;
    }
    previousPathRef.current = pathname;
    // console.log({ pathname, title: document.title });

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
    }, 0);
  }, [location]);
};

window._paq = window._paq || [];
export function matopush(args) {
  window._paq.push(args);
}
