exports.getConfiguration = (env) => ({
  azureAccountKey: env.AZURE_ACCOUNT_KEY,
  azureAccountName: env.AZURE_ACCOUNT_NAME,
  ocmiFilePassword: env.OCMI_FILE_PASSWORD,
  ocmiSyncFileEnabled: env.OCMI_SYNC_FILE_ENABLED === "true" ? true : false,
  sentryEnvironment: env.SENTRY_ENV,
  sentryPublicDSN: env.SENTRY_PUBLIC_DSN,
  smtpFrom: env.SMTP_FROM,
  smtpHost: env.SMTP_HOST || "127.0.0.1",
  smtpPass: env.SMTP_PASS,
  smtpPort: env.SMTP_PORT || "25",
  smtpUser: env.SMTP_USER,
});
