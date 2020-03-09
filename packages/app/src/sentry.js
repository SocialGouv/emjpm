import * as Sentry from "@sentry/browser";
import getConfig from "next/config";

const {
  publicRuntimeConfig: { SENTRY_PUBLIC_DSN }
} = getConfig();

// if SENTRY_PUBLIC_DSN does not exist, it will just not send any events.
// see https://docs.sentry.io/error-reporting/configuration/?platform=javascript#dsn
Sentry.init({
  attachStacktrace: true,
  dsn: SENTRY_PUBLIC_DSN
});

export default Sentry;
