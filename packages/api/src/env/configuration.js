const isInseeAPITribunal = (env) => {
  const value = env.INSEE_API_TRIBUNAL;
  if (!value) {
    return false;
  }
  return value === "true";
};

exports.getConfiguration = (env) => ({
  inseeAPITribunal: isInseeAPITribunal(env),
  sentryEnvironment: env.SENTRY_ENV,
  sentryPublicDSN: env.SENTRY_PUBLIC_DSN,
  smtpFrom: env.SMTP_FROM,
  smtpHost: env.SMTP_HOST || "127.0.0.1",
  smtpPass: env.SMTP_PASS,
  smtpPort: env.SMTP_PORT || "25",
  smtpUser: env.SMTP_USER,
});
