const isInseeAPITribunal = (env) => {
  const value = env.INSEE_API_TRIBUNAL;
  if (!value) {
    return false;
  }
  return value === "true";
};

exports.getConfiguration = (env) => ({
  sentryPublicDSN: env.SENTRY_PUBLIC_DSN,
  sentryEnvironment: env.SENTRY_ENV,
  smtpHost: env.SMTP_HOST || "127.0.0.1",
  smtpPort: env.SMTP_PORT || "25",
  smtpUser: env.SMTP_USER,
  smtpPass: env.SMTP_PASS,
  smtpFrom: env.SMTP_FROM,
  inseeAPITribunal: isInseeAPITribunal(env),
});
