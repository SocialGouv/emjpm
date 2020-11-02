import * as Sentry from "@sentry/node";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { PACKAGE_VERSION, SENTRY_PUBLIC_DSN, NODE_ENV },
} = getConfig();

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
