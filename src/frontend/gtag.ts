export const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

declare global {
  interface Window {
    /** documentation on foo */
    gtag: (arg: any, arg2: any, arg3: any) => void;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    page_path: url,
  });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category?: string;
  label?: string;
  value?: string;
}): void => {
  window.gtag('event', action, {
    // eslint-disable-next-line @typescript-eslint/camelcase
    event_category: category,
    // eslint-disable-next-line @typescript-eslint/camelcase
    event_label: label,
    value: value,
  });
};
