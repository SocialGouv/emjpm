import * as Sentry from "@sentry/node";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { SENTRY_PUBLIC_DSN }
} = getConfig();

try {
  Sentry.init({
    attachStacktrace: true,
    dsn: SENTRY_PUBLIC_DSN
  });
} catch (error) {
  console.log(`SENTRY: ${error.message}`);
}

const captureException = (error, context = {}) => {
  Sentry.configureScope(scope => {
    if (error.message) {
      scope.setFingerprint([error.message]);
    }

    scope.setTag("context", JSON.stringify(context));
    scope.setTag("ssr", typeof window === "undefined");
  });

  Sentry.captureException(error);
};

export default {
  captureException
};
