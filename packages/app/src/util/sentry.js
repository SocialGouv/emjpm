import { useEffect, useRef } from "react";
import * as Sentry from "@sentry/browser";

import config from "~/config";

const { PACKAGE_VERSION, SENTRY_PUBLIC_DSN, NODE_ENV } = config;

export const useSentry = () => {
  const onceRunRef = useRef(false);
  useEffect(() => {
    if (!onceRunRef.current) {
      initSentry();
    }
    onceRunRef.current = true;
  });
};

export const initSentry = () => {
  try {
    Sentry.init({
      attachStacktrace: true,
      dsn: SENTRY_PUBLIC_DSN,
      enabled: NODE_ENV === "production",
      release: PACKAGE_VERSION,
    });
  } catch (error) {
    console.log(`SENTRY: ${error.message}`);
  }
};

export const captureException = (error, context = {}) => {
  Sentry.configureScope((scope) => {
    if (error.message) {
      scope.setFingerprint([error.message]);
    }

    try {
      scope.setTag("context", JSON.stringify(context));
    } catch (e) {
      // JSON.stringify will crash if context is circular
    }
    scope.setTag("ssr", typeof window === "undefined");
  });

  Sentry.captureException(error);
};

export const setUser = (id, role) => {
  Sentry.configureScope((scope) => {
    scope.setUser({ id });
    scope.setTag("role", role);
  });
};
