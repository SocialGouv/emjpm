import * as Sentry from "@sentry/node";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { PACKAGE_VERSION, SENTRY_PUBLIC_DSN }
} = getConfig();

try {
  Sentry.init({
    attachStacktrace: true,
    dsn: SENTRY_PUBLIC_DSN,
    release: PACKAGE_VERSION
  });
} catch (error) {
  console.log(`SENTRY: ${error.message}`);
}

const captureException = (error, context = {}) => {
  Sentry.configureScope(scope => {
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

export default {
  captureException
};
