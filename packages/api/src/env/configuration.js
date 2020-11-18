exports.getConfiguration = (env) => ({
  sentryEnvironment: env.SENTRY_ENV,
  sentryPublicDSN: env.SENTRY_PUBLIC_DSN,
  smtpFrom: env.SMTP_FROM || "support.emjpm@fabrique.social.gouv.fr",
  smtpHost: env.SMTP_HOST || "localhost",
  smtpPass: env.SMTP_PASS,
  // use maildev local smpt port
  // see docker-compose.yaml
  smtpPort: env.SMTP_PORT || "1025",
  smtpUser: env.SMTP_USER,
});
