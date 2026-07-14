// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
import * as Sentry from '@sentry/nextjs';

// Only "true"/"1" disable Sentry — a plain env string like "false" is truthy in JS.
const sentryDisabled = ['1', 'true'].includes(
  (process.env.NEXT_PUBLIC_SENTRY_DISABLED ?? '').trim().toLowerCase()
);

if (!sentryDisabled) {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

    // Add optional integrations for additional features
    integrations: [
      Sentry.replayIntegration(),
      // User feedback widget. autoInject: false — we attach it to our own
      // "Report a bug" button instead of rendering Sentry's default launcher.
      Sentry.feedbackIntegration({
        autoInject: false,
        colorScheme: 'system'
      })
    ],

    // Adds request headers and IP for users, for more info visit
    sendDefaultPii: true,

    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,

    // Define how likely Replay events are sampled.
    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: 0.1,

    // Define how likely Replay events are sampled when an error occurs.
    replaysOnErrorSampleRate: 1.0,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
