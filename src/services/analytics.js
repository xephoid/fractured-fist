import posthog from 'posthog-js';

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY;
const POSTHOG_HOST = import.meta.env.VITE_POSTHOG_HOST || 'https://us.i.posthog.com';

export function initAnalytics() {
    if (!POSTHOG_KEY) return;
    posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        autocapture: false, // We track specific actions ourselves
        capture_pageview: false,
    });
}

export function track(event, properties = {}) {
    if (!POSTHOG_KEY) return;
    posthog.capture(event, properties);
}

export function identify(distinctId, properties = {}) {
    if (!POSTHOG_KEY) return;
    posthog.identify(distinctId, properties);
}
